"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

// ─── Quick Action Buttons ─────────────────────────────────────────────────────

interface QuickAction {
  label: string;
  message: string;
}

const INITIAL_ACTIONS: QuickAction[] = [
  { label: "How does it work?", message: "How do Volz Method piano lessons work?" },
  { label: "What does it cost?", message: "How much do piano lessons cost?" },
  { label: "The Volz Method", message: "What makes the Volz Method different from regular piano lessons?" },
  { label: "Schedule a free call", message: "I'd like to schedule a free consultation call." },
];

const FOLLOW_UP_ACTIONS: QuickAction[] = [
  { label: "Tell me about pricing", message: "What does pricing look like?" },
  { label: "How are teachers trained?", message: "How are your teachers trained?" },
  { label: "What ages do you teach?", message: "What age should my child be to start?" },
  { label: "Schedule a free call", message: "I'd like to schedule a free consultation." },
];

// ─── Page-Specific Proactive Messages ────────────────────────────────────────

function getProactiveMessage(pathname: string): string {
  if (pathname === "/pricing") {
    return "Looking at how lessons work? I can walk you through everything \u2014 pricing, scheduling, or what a first lesson looks like!";
  }
  if (pathname === "/testimonials") {
    return "Love hearing from other families? I can help you get started or answer any questions!";
  }
  if (pathname === "/digital-piano") {
    return "Looking for a digital piano? I can help you figure out what you need to get started!";
  }
  if (pathname.startsWith("/blog/")) {
    return "Great read! Have questions about starting piano lessons for your child? I\u2019m here to help.";
  }
  if (pathname === "/volz-method-best-piano-teaching-medthod" || pathname === "/core-values") {
    return "Curious about the Volz Method? I can explain how it works or help you schedule a free call!";
  }
  return "Hi! I\u2019m here to help you find the perfect piano lessons for your child. What would you like to know?";
}

// ─── Markdown Link Renderer ───────────────────────────────────────────────────

function renderMarkdownLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href] = match;
    const isExternal = href.startsWith("http");
    parts.push(
      <a
        key={match.index}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="underline text-accent hover:text-accent-hover font-semibold transition-colors duration-150"
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-white/40 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ─── Quick Action Buttons Component ───────────────────────────────────────────

function QuickActions({
  actions,
  onSelect,
  disabled,
}: {
  actions: QuickAction[];
  onSelect: (message: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onSelect(action.message)}
          disabled={disabled}
          className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all duration-200 hover:bg-accent/20 hover:border-accent/50 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
}

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [proactiveShown, setProactiveShown] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Abort any in-flight chat fetch when the widget unmounts so we don't keep
  // streaming into a dead component (e.g. on route change).
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Show welcome message and focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      if (messages.length === 0) {
        setMessages([{ role: "assistant", content: getProactiveMessage(pathname) }]);
      }
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Proactive bubble: show after 2s delay on each page change
  useEffect(() => {
    setProactiveShown(false);
    setProactiveDismissed(false);

    const timer = setTimeout(() => {
      if (!isOpen) {
        setProactiveShown(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Dismiss proactive bubble when panel opens
  useEffect(() => {
    if (isOpen) {
      setProactiveShown(false);
    }
  }, [isOpen]);

  // ── Send Message ─────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;

      setHasInteracted(true);
      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMessage: Message = { role: "user", content: trimmed };
      const assistantPlaceholder: Message = {
        role: "assistant",
        content: "",
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setInputValue("");
      setIsStreaming(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map(({ role, content }) => ({
              role,
              content,
            })),
            currentPath: pathname,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`HTTP ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: accumulated,
              isStreaming: true,
            };
            return updated;
          });
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: accumulated,
            isStreaming: false,
          };
          return updated;
        });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "Sorry, I ran into an issue. Please try again or [schedule a free call](https://calendly.com/volz-method-sales/piano_lessons_phone_consultation).",
            isStreaming: false,
          };
          return updated;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, pathname]
  );

  // ── Proactive Bubble Click ────────────────────────────────────────────────────

  const handleProactiveClick = useCallback(() => {
    setProactiveDismissed(true);
    setProactiveShown(false);
    setIsOpen(true);
    setMessages([{ role: "assistant", content: getProactiveMessage(pathname) }]);
  }, [pathname]);

  // ── Keyboard Handler ──────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Which quick actions to show
  const quickActions = hasInteracted ? FOLLOW_UP_ACTIONS : INITIAL_ACTIONS;
  const showQuickActions = !isStreaming && messages.length > 0 && (messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1]?.isStreaming);

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Proactive Bubble */}
      {proactiveShown && !proactiveDismissed && !isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 max-w-[280px] cursor-pointer select-none"
          onClick={handleProactiveClick}
          role="button"
          aria-label="Open chat assistant"
          style={{ animation: "fadeScaleIn 0.3s ease-out" }}
        >
          <div className="rounded-2xl rounded-br-sm bg-zinc-900 border border-white/10 px-4 py-3 shadow-xl text-sm text-white/90 leading-snug">
            {getProactiveMessage(pathname)}
          </div>
          <div
            className="ml-auto mr-5 h-0 w-0"
            style={{
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: "7px solid rgb(24 24 27)",
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setProactiveDismissed(true);
              setProactiveShown(false);
            }}
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-zinc-700 text-white/60 hover:text-white flex items-center justify-center text-xs shadow cursor-pointer"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        style={{ boxShadow: "0 4px 24px rgba(99,67,212,0.35)" }}
      >
        {isOpen ? (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col w-80 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden"
          style={{
            height: "520px",
            animation: "fadeScaleIn 0.2s ease-out",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-bold text-white">Volz Piano Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors duration-150 cursor-pointer"
              aria-label="Close chat"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-sm"
                      : "bg-zinc-800 text-white/90 rounded-bl-sm"
                  }`}
                >
                  {msg.isStreaming && msg.content === "" ? (
                    <TypingIndicator />
                  ) : (
                    <span>{renderMarkdownLinks(msg.content)}</span>
                  )}
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Buttons */}
          {showQuickActions && (
            <div className="border-t border-white/5 flex-shrink-0">
              <QuickActions
                actions={quickActions}
                onSelect={sendMessage}
                disabled={isStreaming}
              />
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-white/10 px-3 py-3 bg-zinc-950 flex-shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                disabled={isStreaming}
                className="flex-1 resize-none rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all duration-150 max-h-24 overflow-y-auto disabled:opacity-50"
                style={{ lineHeight: "1.5" }}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={isStreaming || !inputValue.trim()}
                aria-label="Send message"
                className="flex-shrink-0 h-9 w-9 rounded-xl bg-accent flex items-center justify-center transition-all duration-150 hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
              >
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="mt-1.5 text-center text-xs text-white/20">
              Powered by AI · Not a substitute for a real call
            </p>
          </div>
        </div>
      )}
    </>
  );
}

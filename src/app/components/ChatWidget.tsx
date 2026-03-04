"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

// ─── Page-Specific Proactive Messages ────────────────────────────────────────

function getProactiveMessage(pathname: string): string {
  if (pathname === "/volz-method/how-it-works") {
    return "Looking at how lessons work? I can help you understand pricing or get you scheduled for a free consultation!";
  }
  if (pathname === "/testimonials") {
    return "Seeing what other families think? I can answer any questions you have or help you get started!";
  }
  if (pathname === "/digital-piano-deal") {
    return "Looking for a digital piano? I can answer questions about getting started or help you find the right fit!";
  }
  if (pathname.startsWith("/blog/")) {
    return "Great article! Have questions about starting piano lessons for your child?";
  }
  if (pathname === "/volz-method" || pathname === "/volz-method/core-values") {
    return "Want to know more about the Volz Method? I can explain anything or help you schedule a free call!";
  }
  return "Hi! I\u2019m here to help with any questions about Volz Method Piano Lessons. Want to know about pricing, how lessons work, or how to get started?";
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
        className="underline text-orange-brand hover:text-orange-brand-hover font-semibold transition-colors duration-150"
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

// ─── Main Widget ──────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [proactiveShown, setProactiveShown] = useState(false);
  const [proactiveDismissed, setProactiveDismissed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
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
              "Sorry, I ran into an issue. Please try again or [schedule a free call](https://calendly.com/d/cppx-785-njf/meeting-with-mike).",
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
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-orange-brand shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-orange-brand-hover hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        style={{ boxShadow: "0 4px 24px rgba(242,122,26,0.35)" }}
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
            height: "480px",
            animation: "fadeScaleIn 0.2s ease-out",
            transformOrigin: "bottom right",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-zinc-950 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-orange-brand animate-pulse" />
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
            {messages.length === 0 && (
              <div className="text-center py-8 px-4">
                <p className="text-white/40 text-sm">
                  Ask me anything about piano lessons, pricing, or getting started!
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-orange-brand text-white rounded-br-sm"
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
                className="flex-1 resize-none rounded-xl border border-white/10 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-orange-brand/50 focus:ring-1 focus:ring-orange-brand/30 transition-all duration-150 max-h-24 overflow-y-auto disabled:opacity-50"
                style={{ lineHeight: "1.5" }}
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={isStreaming || !inputValue.trim()}
                aria-label="Send message"
                className="flex-shrink-0 h-9 w-9 rounded-xl bg-orange-brand flex items-center justify-center transition-all duration-150 hover:bg-orange-brand-hover disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
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

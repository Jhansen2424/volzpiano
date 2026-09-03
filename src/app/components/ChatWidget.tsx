"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { isAllowedAssistantHref } from "@/lib/assistant-links";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// ─── Funnel Instrumentation ───────────────────────────────────────────────────
// Pushes chat events onto the same dataLayer the Google Ads tag already uses, so
// they're available to GTM/GA4 the moment a container is added — and harmlessly
// queue if one isn't. This is how we'll measure whether the assistant actually
// moves people toward booking (opened → engaged → clicked "book a call").
function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

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
  { label: "Utah Fits All scholarship", message: "Can I use the Utah Fits All Scholarship for lessons?" },
  { label: "Is there a contract?", message: "Is there a contract or long-term commitment?" },
  { label: "What's the first lesson like?", message: "What happens in the first piano lesson?" },
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
  if (pathname === "/schedule-call" || pathname === "/contact-us") {
    return "Ready to book your free call? I can answer any last questions first \u2014 just ask!";
  }
  if (pathname === "/blog") {
    return "Looking for tips? I can point you to the right article \u2014 or help you get your child started with lessons.";
  }
  if (
    pathname === "/volz-method-best-piano-teaching-medthod" ||
    pathname === "/core-values"
  ) {
    return "Curious about the Volz Method? I can explain how it works or help you schedule a free call!";
  }
  if (pathname === "/teaching-positions" || pathname === "/jobs") {
    return "Interested in teaching with us? I can tell you how our teachers are trained and supported!";
  }
  if (pathname === "/") {
    return "Hi! I\u2019m here to help you find the perfect piano lessons for your child. What would you like to know?";
  }
  // Everything else (individual blog articles live at root-level slugs, plus any
  // other page) gets a warm, contextual nudge back toward getting started.
  return "Enjoying the read? I\u2019m happy to answer any questions about piano lessons for your child \u2014 or help you book a free call.";
}

// ─── Inline Markdown Renderer ─────────────────────────────────────────────────
// Renders the small subset of markdown the assistant actually emits: **bold**
// spans and [text](url) links (which can appear interleaved in one message).
// Newlines are preserved by the message bubble's `whitespace-pre-wrap`, so we
// don't need to handle them here. Anything else falls through as plain text.

function renderInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match a link OR a bold span. Bold is non-greedy and must contain no other
  // asterisk so "**a** and **b**" splits into two spans, not one.
  const tokenRegex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href, boldText] = match;
    if (linkText !== undefined && href !== undefined) {
      // Safety net: never render a link the assistant isn't allowed to emit. If
      // the model hallucinated an internal slug (a 404 waiting to happen), drop
      // the href and show the text plainly rather than a broken clickable link.
      if (!isAllowedAssistantHref(href)) {
        parts.push(linkText);
      } else {
        const isExternal = /^https?:/i.test(href);
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
      }
    } else if (boldText !== undefined) {
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {boldText}
        </strong>
      );
    }
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
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const SESSION_KEY = "volz-chat";

  // Restore an in-progress conversation after a page reload (per-tab, so it
  // doesn't resurface days later). Runs AFTER mount so server and first client
  // render match (no hydration mismatch). Wrapped in try/catch because storage
  // can be unavailable or throw (private mode, blocked cookies).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { messages?: Message[]; hasInteracted?: boolean };
      if (Array.isArray(saved.messages) && saved.messages.length > 0) {
        setMessages(saved.messages.map((m) => ({ role: m.role, content: m.content })));
        setHasInteracted(Boolean(saved.hasInteracted));
      }
    } catch {
      /* storage unavailable — start fresh */
    }
  }, []);

  // Persist the conversation (strip the transient streaming flag; cap length).
  // Skip while a reply is streaming so we don't re-serialize + write the whole
  // conversation on every token — we save once when streaming settles.
  useEffect(() => {
    if (isStreaming) return;
    try {
      if (messages.length === 0) {
        sessionStorage.removeItem(SESSION_KEY);
        return;
      }
      const toSave = messages
        .filter((m) => m.content !== "")
        .slice(-30)
        .map((m) => ({ role: m.role, content: m.content }));
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages: toSave, hasInteracted }));
    } catch {
      /* ignore persistence failures */
    }
  }, [messages, hasInteracted, isStreaming]);

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

  // Proactive bubble: show after a short delay on each page change
  useEffect(() => {
    setProactiveShown(false);
    setProactiveDismissed(false);

    const timer = setTimeout(() => {
      if (!isOpen) {
        setProactiveShown(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Dismiss proactive bubble when panel opens, and log the open for the funnel.
  useEffect(() => {
    if (isOpen) {
      setProactiveShown(false);
      track("chat_opened", { path: pathname });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── Send Message ─────────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;

      track("chat_message_sent", { path: pathname });
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
            // Send only the most recent turns. Keeps us safely under the
            // server's 30-message cap even for long or restored conversations
            // (the server only forwards the last ~20 to the model anyway), so a
            // long chat never dies with a 413.
            messages: [...messages, userMessage]
              .slice(-24)
              .map(({ role, content }) => ({ role, content })),
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
    // Only seed the welcome message if there's no conversation yet — never
    // overwrite one restored from a previous visit (matches the open-effect).
    setMessages((prev) =>
      prev.length > 0
        ? prev
        : [{ role: "assistant", content: getProactiveMessage(pathname) }]
    );
  }, [pathname]);

  // Close the panel and return focus to the launcher (a11y: focus should never
  // be lost to the document body when a dialog closes).
  const closePanel = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => toggleButtonRef.current?.focus(), 0);
  }, []);

  // ── Keyboard Handler ──────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Escape closes the panel (standard dialog behavior).
  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closePanel();
    }
  };

  // Which quick actions to show
  const quickActions = hasInteracted ? FOLLOW_UP_ACTIONS : INITIAL_ACTIONS;
  const showQuickActions = !isStreaming && messages.length > 0 && (messages[messages.length - 1]?.role === "assistant" && !messages[messages.length - 1]?.isStreaming);

  // The landing pages (/lp*) are controlled, single-goal A/B PPC funnels that
  // suppress the site chrome (navbar/footer) for a distraction-free experience.
  // Keep the assistant off them so it doesn't add a variable to the A/B test or
  // pull attention from the one call-to-action. (This runs after every hook, so
  // the rules of hooks are respected.)
  if (pathname === "/lp" || pathname?.startsWith("/lp/")) {
    return null;
  }

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
        ref={toggleButtonRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
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
          id="volz-chat-panel"
          role="dialog"
          aria-label="Volz Piano chat assistant"
          onKeyDown={handlePanelKeyDown}
          className="fixed bottom-24 right-6 z-50 flex flex-col w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden"
          style={{
            height: "520px",
            maxHeight: "calc(100vh - 7rem)",
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
              onClick={closePanel}
              className="text-white/40 hover:text-white transition-colors duration-150 cursor-pointer"
              aria-label="Close chat"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Always-visible primary CTA — booking the free call is one tap away
              no matter where the conversation goes. Links to the on-site
              /schedule-call page (keeps the Google Ads conversion tracking that
              lives there in play) and logs the click for the funnel. */}
          <a
            href="/schedule-call"
            onClick={() => track("chat_cta_click", { location: "panel_banner", path: pathname })}
            className="flex items-center justify-center gap-1.5 bg-accent px-4 py-2 text-xs font-bold text-white transition-colors duration-150 hover:bg-accent-hover flex-shrink-0"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Book your free 15-min call
          </a>

          {/* Messages — a live region so screen readers announce new replies */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-atomic="false"
            aria-label="Conversation"
          >
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
                  <span className="sr-only">{msg.role === "user" ? "You said: " : "Assistant said: "}</span>
                  {msg.isStreaming && msg.content === "" ? (
                    <TypingIndicator />
                  ) : (
                    <span className="whitespace-pre-wrap">{renderInlineMarkdown(msg.content)}</span>
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

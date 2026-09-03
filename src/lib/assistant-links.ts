// Single source of truth for the pages and articles the AI chat assistant is
// allowed to link to.
//
// Used in two places so they can never drift apart:
//   1. /api/chat builds the system-prompt link index from this (so the model
//      recommends the RIGHT page and knows the exact slugs).
//   2. ChatWidget validates every internal link the model emits against
//      VALID_ASSISTANT_PATHS (so a hallucinated slug can never render as a
//      broken, clickable 404).
//
// This is intentionally a small, hand-picked list (the authored, parent-focused
// articles plus a few evergreen pages) — NOT the full 200+ post archive. That
// keeps the prompt lean, the client bundle tiny (no blog JSON shipped to the
// browser), and the recommendations high quality. `title` is the link text we
// want the model to use; `path` is the real, verified route.

export type AssistantLink = { path: string; title: string; summary: string };

// Key evergreen site pages.
export const SITE_LINKS: AssistantLink[] = [
  { path: "/schedule-call", title: "Schedule a Call", summary: "Book the free 15-minute phone consultation (the main call to action)." },
  { path: "/pricing", title: "Pricing / How It Works", summary: "How lessons and pricing work." },
  { path: "/volz-method-best-piano-teaching-medthod", title: "The Volz Method", summary: "The four pillars and how the method works." },
  { path: "/digital-piano", title: "Recommended Digital Pianos", summary: "What instrument to start on." },
  { path: "/testimonials", title: "Testimonials", summary: "Reviews from Volz families." },
  { path: "/core-values", title: "Core Values", summary: "What Volz Method stands for." },
  { path: "/blog", title: "Blog", summary: "Browse all articles." },
];

// Curated, parent-focused articles (all at root-level slugs).
export const ARTICLE_LINKS: AssistantLink[] = [
  { path: "/how-much-do-piano-lessons-cost-in-utah-a-2026-parents-guide", title: "How Much Do Lessons Cost in Utah?", summary: "A transparent 2026 pricing guide." },
  { path: "/how-to-afford-piano-lessons-in-utah-scholarships-and-budgeting", title: "How to Afford Lessons (incl. Utah Fits All)", summary: "Budgeting and the Utah Fits All scholarship." },
  { path: "/best-age-to-start-piano-lessons", title: "Best Age to Start Piano", summary: "Ages ~5–9 are a sweet spot; readiness matters more than age." },
  { path: "/what-happens-in-the-first-piano-lesson-parent-guide", title: "What Happens in the First Lesson", summary: "Exactly what to expect on day one." },
  { path: "/how-long-does-it-take-to-learn-piano-realistic-timeline-for-kids", title: "How Long It Takes to Learn Piano", summary: "A realistic milestone timeline for kids." },
  { path: "/how-much-should-my-child-practice-piano-guide-by-age", title: "How Much Should My Child Practice?", summary: "A realistic practice guide by age." },
  { path: "/how-to-motivate-your-child-to-practice-piano", title: "How to Motivate Your Child to Practice", summary: "Practical ways to make practice stick." },
  { path: "/two-things-that-solve-most-piano-practice-motivation-problems", title: "Solving Practice-Motivation Problems", summary: "Two things that fix most practice struggles." },
  { path: "/does-learning-piano-make-kids-smarter-what-research-says", title: "Does Piano Make Kids Smarter?", summary: "What the research actually shows." },
  { path: "/what-is-the-volz-method-a-different-way-to-teach-piano", title: "What Is the Volz Method?", summary: "How our approach differs from typical lessons." },
  { path: "/inside-the-four-pillars-of-the-volz-method", title: "Inside the Four Pillars", summary: "Reading, Composing, Hearing, and Arranging explained." },
  { path: "/why-student-motivation-beats-perfect-pedagogy", title: "Why Motivation Beats Perfect Pedagogy", summary: "Why a motivated student outperforms a perfect curriculum." },
  { path: "/the-teachers-personality-is-the-most-important-variable", title: "Why the Teacher's Personality Matters Most", summary: "The biggest variable in a child's piano success." },
  { path: "/why-having-the-same-piano-teacher-for-years-matters", title: "Why the Same Teacher for Years Matters", summary: "How consistency builds progress and trust." },
  { path: "/how-we-choose-volz-method-teachers", title: "How We Choose Our Teachers", summary: "What we look for when hiring teachers." },
  { path: "/how-we-keep-volz-method-teachers-for-years", title: "How We Keep Our Teachers for Years", summary: "Why Volz teachers stay — and why that helps your child." },
  { path: "/the-hidden-benefits-of-piano-lessons-in-your-own-home", title: "Hidden Benefits of Lessons at Home", summary: "How in-home lessons help shy kids and busy families." },
  { path: "/in-home-piano-lessons-vs-online-why-in-person-wins-for-kids", title: "In-Home vs. Online Lessons", summary: "Why in-person teaching wins for kids." },
  { path: "/piano-lessons-vs-apps", title: "Piano Lessons vs. Apps", summary: "Why a real teacher beats a learning app." },
  { path: "/how-to-find-the-best-in-home-piano-teacher-near-you-in-utah", title: "Finding the Best In-Home Teacher in Utah", summary: "How to pick a great private piano teacher." },
  { path: "/digital-piano-vs-keyboard-vs-acoustic-what-to-buy-beginner", title: "Digital Piano vs. Keyboard vs. Acoustic", summary: "What to buy for a beginner." },
  { path: "/piano-vs-guitar-for-kids-best-first-instrument", title: "Piano vs. Guitar for Kids", summary: "Which first instrument to choose." },
  { path: "/fun-easy-piano-songs-kids-actually-want-to-learn", title: "Fun, Easy Songs Kids Want to Learn", summary: "Songs that keep kids excited to practice." },
  { path: "/fitting-piano-lessons-into-a-busy-school-year", title: "Fitting Lessons Into a Busy School Year", summary: "How families make time during the school year." },
  { path: "/homeschool-piano-lessons-utah-idaho-parent-guide", title: "Homeschool Piano Lessons: A Parent's Guide", summary: "Flexible daytime lessons for homeschool families." },
];

export const ASSISTANT_LINKS: AssistantLink[] = [...SITE_LINKS, ...ARTICLE_LINKS];

// Fast lookup for client-side link validation. "/" (home) is always valid.
export const VALID_ASSISTANT_PATHS: ReadonlySet<string> = new Set<string>([
  "/",
  ...ASSISTANT_LINKS.map((l) => l.path),
]);

/**
 * True when an href is safe for the assistant to link to: external links
 * (http/https, mailto, tel) are always allowed; internal links must resolve to a
 * known route in VALID_ASSISTANT_PATHS. Query strings and hashes are ignored.
 */
export function isAllowedAssistantHref(href: string): boolean {
  if (/^(https?:|mailto:|tel:)/i.test(href)) return true;
  if (href.startsWith("/")) {
    const path = href.split(/[?#]/)[0].replace(/\/+$/, "") || "/";
    return VALID_ASSISTANT_PATHS.has(path) || VALID_ASSISTANT_PATHS.has(path + "/");
  }
  return false;
}

/** Formats the pages + articles into the section injected into the system prompt. */
export function buildAssistantLinksSection(): string {
  const fmt = (l: AssistantLink) => `- ${l.title}: ${l.path} — ${l.summary}`;
  return `== PAGES & ARTICLES YOU MAY LINK TO ==
CRITICAL: Only ever link to the EXACT root paths listed below. NEVER invent, guess, shorten, or modify a slug, and NEVER use a "/blog/<slug>" prefix — articles live at root-level slugs. If nothing below fits the question, link to /blog or include no link at all. A link outside this list is a bug.

KEY PAGES:
${SITE_LINKS.map(fmt).join("\n")}

ARTICLES (pick the ONE that best fits the visitor's question; use the given title as the link text):
${ARTICLE_LINKS.map(fmt).join("\n")}`;
}

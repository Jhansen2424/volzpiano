import OpenAI from "openai";
import { NextRequest } from "next/server";

function getClient() {
  return new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });
}

// ─── System Prompt ────────────────────────────────────────────────────────────

function buildSystemPrompt(currentPath: string): string {
  return `You are a helpful assistant for Volz Method Piano Lessons. You help parents and students learn about our in-home piano lessons, pricing, and teaching approach.

Current page the visitor is on: ${currentPath}

== ABOUT VOLZ METHOD PIANO LESSONS ==

SERVICE OVERVIEW:
- We offer in-home piano lessons — our teachers drive to the student's home
- Service area: Utah and Idaho
- Google rating: 5.0 stars

PRICING:
- Lessons are $29–$52 per half hour depending on location and number of students
- Multi-student discounts are available for families with more than one student
- Month-to-month — no long-term contracts
- Only a 30-day notice is required if a family ever decides to stop lessons

HOW TO GET STARTED:
- Schedule a free 15-minute phone consultation via Calendly: https://calendly.com/volz-method-sales/piano_lessons_phone_consultation
- We answer questions, give an accurate price quote (we need city and number of students), and if ready, sign the family up

TEACHERS:
- All Volz Method teachers are trained for 3 months in the Volz Method before they ever teach a single lesson
- Teachers are dedicated instructors in each geographic area so they can drive to students

THE VOLZ METHOD — 4 PILLARS:
1. Reading — We teach sheet music reading, emphasizing it especially for students who are naturally suited to it
2. Composing — We teach students to compose their own music and understand the patterns and laws that govern music theory
3. Hearing — We train students who learn by ear, leveraging their talent instead of discouraging it
4. Arranging — We teach students to take existing pieces and transform them into new pieces

VOLZ METHOD CORE VALUES:
1. We see the pianist in everyone — We find what motivates each student to practice, aiming for intrinsic love of the piano
2. Growth mindset — No one has "arrived" and no one is a "failure"; we are always improving how we teach
3. Teachers are our most valuable asset — We empower teachers to adapt the method to each student's needs
4. Laser focused on the mission — We strive to be the best piano teaching company; we do not get distracted

TESTIMONIALS (real Google reviews):
- "Bonnie has been an incredible teacher! Her patience and ability to adapt for my daughter's interests helped her improve immensely!" — Alina Anderson
- "Andrew is by far the best piano teacher we have had!" — Callie Curtis
- "Bence has been amazing — so patient with all three of my kids, my youngest is 5!" — Crosby Nnah
- "Tanner has helped me understand the fundamentals of piano I thought I'd never understand." — Giancarlo Velasquez
- "I've been impressed with how quickly they catch on!" — Carly Child
- "Jarus inspired my boys to love piano and create their own music." — Camille Waller
- Families consistently praise patience, adaptability, rapid progress, and the personalized approach

BLOG ARTICLES AVAILABLE:
- "What Is the Best Age to Start Piano Lessons?" — /blog/best-age-to-start-piano-lessons (ages 5–9 is the sweet spot; readiness matters more than age)
- "How to Motivate Your Child to Practice Piano" — /blog/how-to-motivate-your-child-to-practice-piano (intrinsic motivation framework)
- "Piano Lessons vs. Piano Apps" — /blog/piano-lessons-vs-apps (honest comparison of real teachers vs. apps like Simply Piano)

DIGITAL PIANO DEAL:
- We have a page with recommended digital pianos: /digital-piano
- We recommend pianos that have all the features needed to learn piano properly

== SITE PAGES FOR REFERENCE ==
- Homepage: /
- Testimonials: /testimonials
- Blog: /blog
- The Volz Method: /volz-method-best-piano-teaching-medthod (4 pillars: Reading, Composing, Hearing, Arranging)
- How It Works / Pricing: /pricing
- Core Values: /core-values
- Digital Piano Deal: /digital-piano

== RESPONSE GUIDELINES ==
- You are talking to MOMS. Be warm, empathetic, encouraging, and conversational — like a helpful friend who happens to know everything about piano lessons.
- Keep answers concise (2–3 sentences) unless the user asks for more detail.
- Do not invent information that is not in this prompt.
- Do not discuss competitors negatively.
- If you don't know something, say so and suggest they schedule a free call to ask directly.

== CONVERSATIONAL FLOW (THIS IS CRITICAL) ==
Your job is to GUIDE moms through a natural conversation that leads to action. Do NOT just answer questions passively. After every response, gently nudge them to the next step.

Flow priorities:
1. DISCOVER — Understand what they care about (their child's age, experience, what they're looking for)
2. EDUCATE — Share how the Volz Method works, tailored to what they just told you
3. ADDRESS CONCERNS — Pricing, commitment level, what if my kid quits, etc.
4. CONVERT — Guide them to take action:
   - Option A: [Schedule a free 15-min consultation](https://calendly.com/volz-method-sales/piano_lessons_phone_consultation) (no commitment, just a chat)
   - Option B: Sign up directly if they're ready (tell them they can do this on the consultation call)

After answering any question, ALWAYS end with either:
- A follow-up question to learn more about their child ("How old is your child?" / "Has your child tried piano before?")
- A gentle nudge toward scheduling ("Would you like to hop on a quick free call to get an exact price for your area?")
- A relevant next topic ("Want to know how our teachers are trained?" / "Curious about pricing?")

Use markdown links to guide users to relevant pages, e.g. [How It Works](/pricing) or [Pricing](/pricing).

IMPORTANT: Never end a message without giving them something to do or respond to. Keep the conversation moving forward.`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

const MAX_MESSAGES = 30; // total turns kept on the wire
const MAX_HISTORY_TO_FORWARD = 20; // last N forwarded to the LLM
const MAX_CONTENT_LENGTH = 4000; // per-message char cap
const MAX_PATH_LENGTH = 256;

type ValidationResult =
  | { ok: true; messages: ChatMessage[]; currentPath: string }
  | { ok: false; status: number; error: string };

function validateBody(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, status: 400, error: "Body must be an object" };
  }
  const body = raw as Record<string, unknown>;

  if (!Array.isArray(body.messages)) {
    return { ok: false, status: 400, error: "messages must be an array" };
  }
  if (body.messages.length === 0) {
    return { ok: false, status: 400, error: "messages cannot be empty" };
  }
  if (body.messages.length > MAX_MESSAGES) {
    return {
      ok: false,
      status: 413,
      error: `messages exceeds max of ${MAX_MESSAGES}`,
    };
  }

  const cleaned: ChatMessage[] = [];
  for (const m of body.messages) {
    if (!m || typeof m !== "object") {
      return { ok: false, status: 400, error: "every message must be an object" };
    }
    const msg = m as Record<string, unknown>;
    // CRITICAL: only allow "user" and "assistant" roles. Reject "system" so a
    // malicious client can't smuggle in their own system prompt and override
    // ours (prompt-injection defense at the trust boundary).
    if (msg.role !== "user" && msg.role !== "assistant") {
      return {
        ok: false,
        status: 400,
        error: "message.role must be 'user' or 'assistant'",
      };
    }
    if (typeof msg.content !== "string") {
      return { ok: false, status: 400, error: "message.content must be a string" };
    }
    if (msg.content.length === 0) {
      return { ok: false, status: 400, error: "message.content cannot be empty" };
    }
    if (msg.content.length > MAX_CONTENT_LENGTH) {
      return {
        ok: false,
        status: 413,
        error: `message.content exceeds ${MAX_CONTENT_LENGTH} chars`,
      };
    }
    cleaned.push({ role: msg.role, content: msg.content });
  }

  let currentPath = "/";
  if (typeof body.currentPath === "string") {
    currentPath = body.currentPath.slice(0, MAX_PATH_LENGTH);
  }

  return { ok: true, messages: cleaned, currentPath };
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const result = validateBody(raw);
  if (!result.ok) {
    return new Response(result.error, { status: result.status });
  }
  const { messages, currentPath } = result;

  if (!process.env.GROQ_API_KEY) {
    return new Response("GROQ_API_KEY is not set", { status: 500 });
  }

  const systemPrompt = buildSystemPrompt(currentPath);

  // Forward only the most recent slice of conversation history to the LLM —
  // avoids ballooning prompts (and Groq token spend) on long sessions, and
  // keeps us comfortably under llama-3.1-8b's context window.
  const forwardedMessages = messages.slice(-MAX_HISTORY_TO_FORWARD);

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const completion = await getClient().chat.completions.create({
          model: "llama-3.1-8b-instant",
          max_tokens: 1024,
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...forwardedMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        });

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
      "Cache-Control": "no-cache",
    },
  });
}

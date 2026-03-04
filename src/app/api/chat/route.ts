import OpenAI from "openai";
import { NextRequest } from "next/server";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

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
- Lessons are $29–$45 per half hour depending on location and number of students
- Multi-student discounts are available for families with more than one student
- Month-to-month — no long-term contracts
- Only a 30-day notice is required if a family ever decides to stop lessons

HOW TO GET STARTED:
- Schedule a free 15-minute phone consultation via Calendly: https://calendly.com/d/cppx-785-njf/meeting-with-mike
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
- We have a page with recommended digital pianos: /digital-piano-deal (coming soon — check back for the full list)
- We recommend pianos that have all the features needed to learn piano properly

== SITE PAGES FOR REFERENCE ==
- Homepage: /
- Testimonials: /testimonials
- Blog: /blog
- The Volz Method: /volz-method (4 pillars: Reading, Composing, Hearing, Arranging)
- How It Works / Pricing: /volz-method/how-it-works
- Core Values: /volz-method/core-values
- Digital Piano Deal: /digital-piano-deal

== RESPONSE GUIDELINES ==
- Be warm, friendly, encouraging, and conversational — like talking with a helpful staff member
- Keep answers concise (2–3 sentences) unless the user asks for more detail
- When relevant, suggest booking a free 15-minute consultation: https://calendly.com/d/cppx-785-njf/meeting-with-mike
- Use markdown links to guide users to relevant pages, e.g. [How It Works](/volz-method/how-it-works) or [Pricing](/volz-method/how-it-works)
- Do not invent information that is not in this prompt
- Do not discuss competitors negatively
- If you don't know something, say so and suggest they schedule a free call to ask directly`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  currentPath: string;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const { messages, currentPath } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("messages array is required", { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return new Response("GROQ_API_KEY is not set", { status: 500 });
  }

  const systemPrompt = buildSystemPrompt(currentPath ?? "/");

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const completion = await client.chat.completions.create({
          model: "llama-3.1-8b-instant",
          max_tokens: 1024,
          stream: true,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
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

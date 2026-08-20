/**
 * Shared facts + content for every PPC landing page under /lp.
 *
 * Everything a landing page needs to say lives here so all variants stay
 * factually consistent (price, phone, reviews, offer mechanics). To spin up a
 * new A/B variant, build a new page under /lp/<slug> that composes the shared
 * _components with a different hero + section order — never fork these facts.
 */

/** The one and only conversion action. After a booking, Calendly is configured
 *  to redirect to /thank-you, where the Google Ads conversion tag fires. Keep
 *  this identical across variants so every landing page reports into the same
 *  conversion. */
export const CALENDLY_URL =
  "https://calendly.com/volz-method-sales/piano_lessons_phone_consultation";

export const PHONE_DISPLAY = "385-482-0122";
export const PHONE_HREF = "tel:+13854820122";

export const PRICE = "$29–$52";
export const PRICE_UNIT = "per half hour";

export const RATING = "5.0";
export const REVIEW_COUNT = "134";
export const SERVICE_AREA = "Utah & Idaho";

/** Compact trust chips shown in the trust bar under the hero. */
export const TRUST_CHIPS: { icon: "star" | "home" | "shield" | "clock"; label: string }[] = [
  { icon: "star", label: `${RATING}★ from ${REVIEW_COUNT} Google reviews` },
  { icon: "home", label: "The teacher drives to your house" },
  { icon: "shield", label: "Month-to-month — no contracts" },
  { icon: "clock", label: "We accept the Utah Fits All Scholarship" },
];

/** The 3-step path from click to first lesson. */
export const HOW_IT_WORKS: { step: string; title: string; body: string }[] = [
  {
    step: "1",
    title: "Book a free 15-min call",
    body: "Pick a time that works. No cost, no obligation — just a quick chat about your family and your area.",
  },
  {
    step: "2",
    title: "Get your exact price",
    body: "We answer your questions and give you an exact price. If you're ready, we set you up with a teacher right on the call.",
  },
  {
    step: "3",
    title: "We come to your house",
    body: "Your teacher drives to your home each week — same teacher, month-to-month, tailored to how your child learns.",
  },
];

/** Real reviews pulled from the site. Keep attributions accurate. */
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "We have loved Volz Method Piano Lessons! Our kids are challenged and have improved very quickly. By far the best piano lessons we have had!",
    name: "Callie Curtis",
    role: "Parent",
  },
  {
    quote:
      "My ten year old daughter — it turns out she has a gift for composing — and now she sits down and plays the most beautiful things!",
    name: "Emily",
    role: "Mom",
  },
  {
    quote:
      "My teacher helps me find what I'm good at and to think outside of the box.",
    name: "Lucy",
    role: "Age 11",
  },
];

/** Objection-handling FAQ, ordered by how often a PPC visitor asks it. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much do lessons cost?",
    a: `Lessons are ${PRICE} ${PRICE_UNIT}, depending on your city and how many students are in your home. Multi-student discounts are available, and you'll get your exact price on the free call.`,
  },
  {
    q: "Do you really come to my house?",
    a: `Yes. Our teachers drive to your home across ${SERVICE_AREA}. You never have to load the kids in the car, fight traffic, or sit in a waiting room.`,
  },
  {
    q: "Is there a contract?",
    a: "No long-term contract. Lessons are month-to-month, so you can adjust, pause, or stop whenever you need to.",
  },
  {
    q: "My child has never played piano. Is that okay?",
    a: "Perfect — most of our students start as complete beginners. We teach to how your child naturally learns, so they get real wins early and actually enjoy it.",
  },
  {
    q: "What happens on the free call?",
    a: "It takes about 15 minutes. We answer your questions, give you an exact price for your area, and — if you're ready — set you up with a teacher. No pressure either way.",
  },
  {
    q: "Do you accept the Utah Fits All Scholarship?",
    a: "Yes. If you're using Utah Fits All or another education-funding source, just mention it on your call and we'll help you sort out what you need.",
  },
];

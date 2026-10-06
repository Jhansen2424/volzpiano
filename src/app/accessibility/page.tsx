import type { Metadata } from "next";
import StubPage from "@/app/components/StubPage";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Volz Method Piano Lessons is committed to an accessible website for everyone. Learn about the accessibility features of volzpiano.com and how to reach us.",
  alternates: { canonical: "/accessibility" },
};

const LAST_REVIEWED = "October 2026";

export default function AccessibilityPage() {
  return (
    <StubPage
      badge="Accessibility"
      title="An Accessible Website"
      highlight="for Every Family"
      description="We want every parent and student to be able to learn about lessons and book a call with us, whatever device or assistive technology they use."
      body={
        <div className="prose prose-zinc max-w-none prose-headings:font-extrabold prose-headings:text-zinc-900 prose-a:text-brand-ink prose-a:underline prose-a:underline-offset-2">
          <h2>Our commitment</h2>
          <p>
            Volz Method Piano Lessons is committed to making volzpiano.com usable by
            everyone, including people with disabilities. We aim to conform to the{" "}
            <a href="https://www.w3.org/TR/WCAG21/">
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>
            , and we review the site against these guidelines as it changes.
          </p>

          <h2>What we&rsquo;ve done</h2>
          <ul>
            <li>
              <strong>Keyboard access.</strong> Every page can be used with a keyboard
              alone. A &ldquo;Skip to main content&rdquo; link appears when you first
              press Tab, and keyboard focus is always clearly visible.
            </li>
            <li>
              <strong>Screen reader support.</strong> Pages use proper headings and
              landmarks, images have text descriptions, and buttons, menus, and
              dialogs are labeled.
            </li>
            <li>
              <strong>Readable color contrast.</strong> Text and interactive elements
              meet WCAG AA contrast requirements.
            </li>
            <li>
              <strong>Control over motion.</strong> Use the &ldquo;Pause
              animations&rdquo; button at the bottom of any page to stop moving
              content. If your device is set to reduce motion, animations are turned
              off automatically.
            </li>
            <li>
              <strong>Flexible layout.</strong> The site works on phones, tablets, and
              computers, and supports browser zoom and larger text.
            </li>
          </ul>

          <h2>Third-party content</h2>
          <p>
            A few parts of the site come from other companies: our appointment
            scheduler (Calendly), videos hosted on YouTube, and the student portal.
            We&rsquo;ve chosen providers that publish their own accessibility
            commitments, but we don&rsquo;t control how their tools are built. If you
            have any trouble booking a consultation online, email us and we&rsquo;ll
            schedule it with you directly.
          </p>

          <h2>Feedback and help</h2>
          <p>
            If you run into a barrier on this website, or need information in a
            different format, please let us know. Tell us the page and what happened,
            and we&rsquo;ll work with you to provide the information or service you
            need.
          </p>
          <p>
            Email: <a href="mailto:support@volzpiano.com">support@volzpiano.com</a>
          </p>

          <p className="text-sm text-zinc-600">This statement was last reviewed in {LAST_REVIEWED}.</p>
        </div>
      }
    />
  );
}

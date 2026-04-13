import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock("next/navigation", () => ({
  usePathname: () => "/volz-method-best-piano-teaching-medthod",
}));

beforeAll(() => {
  global.IntersectionObserver = class {
    observe(target: Element) {
      // Immediately fire as visible so quiz section mounts in tests
      // (it gates on visible state which uses IO)
      this._cb([{ isIntersecting: true, target } as IntersectionObserverEntry]);
    }
    unobserve() {}
    disconnect() {}
    root = null;
    rootMargin = "";
    thresholds = [];
    takeRecords() {
      return [];
    }
    private _cb: (entries: IntersectionObserverEntry[]) => void;
    constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
      this._cb = cb;
    }
  } as unknown as typeof IntersectionObserver;
});

import VolzMethodPage from "../app/volz-method-best-piano-teaching-medthod/page";

describe("Volz Method page — Piano Quiz", () => {
  it("renders the quiz heading", () => {
    render(<VolzMethodPage />);
    expect(screen.getByText(/The Volz Piano Quiz/i)).toBeInTheDocument();
  });

  it("starts on Question 1 of N", () => {
    render(<VolzMethodPage />);
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
  });

  function getOptionButtons(): HTMLElement[] {
    return screen
      .getAllByRole("button")
      .filter((b) => /[A-D]\./.test((b.textContent || "").trim().slice(0, 4)));
  }

  it("shows answer feedback after picking an option", () => {
    render(<VolzMethodPage />);
    const buttons = getOptionButtons();
    expect(buttons.length).toBeGreaterThanOrEqual(4);
    fireEvent.click(buttons[2]); // C. 88 — the correct answer for Q1
    expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    expect(screen.getByText(/88 keys/i)).toBeInTheDocument();
  });

  it("does NOT render the old method-step blocks (Reading/Composing/Hearing/Arranging)", () => {
    render(<VolzMethodPage />);
    // The old MethodBlock used "Method No. 01" labels — they should be gone
    expect(screen.queryByText(/Method No\. 01/i)).not.toBeInTheDocument();
  });

  it("links to /schedule-call from the final score screen after completing all questions", () => {
    render(<VolzMethodPage />);
    // Walk through every question and click the first answer + Next
    for (let i = 0; i < 6; i++) {
      const optionButtons = getOptionButtons();
      fireEvent.click(optionButtons[0]);
      const nextOrFinal = screen.getByRole("button", {
        name: /next question|see my score/i,
      });
      fireEvent.click(nextOrFinal);
    }
    // Now on the score screen — should have Schedule a Call link
    const cta = screen.getByRole("link", { name: /schedule a call/i });
    expect(cta).toHaveAttribute("href", "/schedule-call");
  });
});

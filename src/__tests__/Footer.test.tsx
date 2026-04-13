import { render, screen } from "@testing-library/react";
import Footer from "../app/components/Footer";

// Mock next/link
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

// Mock IntersectionObserver
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    root = null;
    rootMargin = "";
    thresholds = [];
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
});

describe("Footer", () => {
  it("renders the enrollment CTA heading", () => {
    render(<Footer />);
    expect(screen.getByText("Enroll Today!")).toBeInTheDocument();
  });

  it("renders the Schedule a Call link pointing to /schedule-call", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /schedule a call/i });
    expect(link).toHaveAttribute("href", "/schedule-call");
  });

  it("renders the Teach with us link pointing to Google Form", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /teach with us/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("google.com/forms"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("renders Privacy Policy link pointing to /privacy-policy", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /privacy policy/i });
    expect(link).toHaveAttribute("href", "/privacy-policy-2");
  });

  it("renders the copyright notice with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});

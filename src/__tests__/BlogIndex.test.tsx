import { render, screen, fireEvent } from "@testing-library/react";

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

  // Mock scrollIntoView (not available in jsdom)
  Element.prototype.scrollIntoView = jest.fn();
});

// Dynamic import to avoid issues with the large posts array
import BlogIndexPage from "../app/blog/page";

describe("BlogIndexPage", () => {
  it("renders the hero heading", () => {
    render(<BlogIndexPage />);
    // "Blog" appears in many places; check the hero h1 specifically
    const h1 = document.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toContain("Blog");
  });

  it("renders the search input", () => {
    render(<BlogIndexPage />);
    expect(screen.getByPlaceholderText("Search articles...")).toBeInTheDocument();
  });

  it("renders filter tag buttons including All", () => {
    render(<BlogIndexPage />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("renders at most 12 post cards (pagination)", () => {
    render(<BlogIndexPage />);
    const readLinks = screen.getAllByText("Read article");
    expect(readLinks.length).toBeLessThanOrEqual(12);
  });

  it("renders pagination controls when more than 12 posts", () => {
    render(<BlogIndexPage />);
    expect(screen.getByText("Next →")).toBeInTheDocument();
    expect(screen.getByText("← Prev")).toBeInTheDocument();
  });

  it("filters posts when search term is entered", () => {
    render(<BlogIndexPage />);
    const searchInput = screen.getByPlaceholderText("Search articles...");
    fireEvent.change(searchInput, { target: { value: "xyznonexistent" } });
    expect(screen.getByText("No articles found.")).toBeInTheDocument();
  });

  it("navigates to page 2 when Next is clicked", () => {
    render(<BlogIndexPage />);
    const nextButton = screen.getByText("Next →");
    fireEvent.click(nextButton);
    // Page 2 button should be active (brand styling)
    const page2Button = screen.getByRole("button", { name: "2" });
    expect(page2Button.className).toContain("bg-brand");
  });

  it("post cards link to root-level /[slug] (not /blog/[slug])", () => {
    render(<BlogIndexPage />);
    const readLinks = screen.getAllByText("Read article");
    readLinks.forEach((link) => {
      const anchor = link.closest("a");
      const href = anchor?.getAttribute("href") || "";
      expect(href).toMatch(/^\//);
      expect(href).not.toMatch(/^\/blog\//);
    });
  });
});

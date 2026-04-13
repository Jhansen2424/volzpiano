import { render, screen } from "@testing-library/react";

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

const mockPathname = jest.fn(() => "/");
jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

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

import Footer from "../app/components/Footer";

describe("Footer CTA banner — conditional rendering", () => {
  beforeEach(() => {
    mockPathname.mockReset();
  });

  it("renders the 'Schedule a Call to Enroll Today!' CTA on most pages", () => {
    mockPathname.mockReturnValue("/");
    render(<Footer />);
    expect(screen.getByText(/Enroll Today!/i)).toBeInTheDocument();
  });

  it("renders the CTA on /volz-method-best-piano-teaching-medthod", () => {
    mockPathname.mockReturnValue("/volz-method-best-piano-teaching-medthod");
    render(<Footer />);
    expect(screen.getByText(/Enroll Today!/i)).toBeInTheDocument();
  });

  it("HIDES the CTA on /schedule-call (it would be redundant)", () => {
    mockPathname.mockReturnValue("/schedule-call");
    render(<Footer />);
    expect(screen.queryByText(/Enroll Today!/i)).not.toBeInTheDocument();
  });

  it("still renders the bottom bar (Privacy Policy + copyright) on /schedule-call", () => {
    mockPathname.mockReturnValue("/schedule-call");
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /privacy policy/i })
    ).toBeInTheDocument();
  });
});

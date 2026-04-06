import { render, screen } from "@testing-library/react";

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

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

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

// Mock canvas for components that use it
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn(() => ({ width: 0 })),
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    rotate: jest.fn(),
    scale: jest.fn(),
    closePath: jest.fn(),
    quadraticCurveTo: jest.fn(),
    bezierCurveTo: jest.fn(),
    createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    setTransform: jest.fn(),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

describe("Schedule Call Page", () => {
  it("renders heading and Calendly iframe", async () => {
    const { default: ScheduleCallPage } = await import(
      "../app/schedule-call/page"
    );
    render(<ScheduleCallPage />);
    expect(screen.getByText("Enroll")).toBeInTheDocument();
    const iframe = document.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe?.getAttribute("src")).toContain("calendly.com");
  });
});

describe("Teaching Positions Page", () => {
  it("renders heading and job listings", async () => {
    const { default: TeachingPositionsPage } = await import(
      "../app/teaching-positions/page"
    );
    render(<TeachingPositionsPage />);
    expect(screen.getByText("Positions")).toBeInTheDocument();
    expect(screen.getByText("Open Positions")).toBeInTheDocument();
    expect(
      screen.getByText("Piano Instructor — Salt Lake County")
    ).toBeInTheDocument();
  });

  it("renders Apply Now links to Google Form", async () => {
    const { default: TeachingPositionsPage } = await import(
      "../app/teaching-positions/page"
    );
    render(<TeachingPositionsPage />);
    const applyLinks = screen.getAllByText("Apply Now");
    applyLinks.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute(
        "href",
        expect.stringContaining("google.com/forms")
      );
    });
  });
});

describe("Student Portal Page", () => {
  it("renders heading and CTA links", async () => {
    const { default: StudentPortalPage } = await import(
      "../app/student-portal/page"
    );
    render(<StudentPortalPage />);
    expect(screen.getByText("Portal")).toBeInTheDocument();
    expect(screen.getByText("Welcome Back!")).toBeInTheDocument();
    const scheduleLink = screen.getByRole("link", {
      name: /schedule a call/i,
    });
    expect(scheduleLink).toHaveAttribute("href", "/schedule-call");
  });
});

describe("Privacy Policy Page", () => {
  it("renders heading and key sections", async () => {
    const { default: PrivacyPolicyPage } = await import(
      "../app/privacy-policy/page"
    );
    render(<PrivacyPolicyPage />);
    expect(screen.getByText("Policy")).toBeInTheDocument();
    expect(
      screen.getByText("Interpretation and Definitions")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Security of Your Personal Data")
    ).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders contact email link", async () => {
    const { default: PrivacyPolicyPage } = await import(
      "../app/privacy-policy/page"
    );
    render(<PrivacyPolicyPage />);
    const emailLink = screen.getByRole("link", {
      name: /support@volzpiano/i,
    });
    expect(emailLink).toHaveAttribute(
      "href",
      "mailto:support@volzpiano.webaholics.co"
    );
  });
});

describe("Testimonials Page", () => {
  it("renders the page heading", async () => {
    const { default: TestimonialsPage } = await import(
      "../app/testimonials/page"
    );
    render(<TestimonialsPage />);
    const h1 = document.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toBeTruthy();
  });

  it("renders the review section", async () => {
    const { default: TestimonialsPage } = await import(
      "../app/testimonials/page"
    );
    render(<TestimonialsPage />);
    // Should have a section element for the reviews
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThan(0);
  });
});

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

jest.mock("next/image", () => {
  return function MockImage(props: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />;
  };
});

jest.mock("next/navigation", () => ({
  usePathname: () => "/digital-piano",
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
    quadraticCurveTo: jest.fn(),
    closePath: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    createLinearGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
  })) as unknown as typeof HTMLCanvasElement.prototype.getContext;
});

import DigitalPianoPage from "../app/digital-piano/page";

describe("Digital Piano page", () => {
  it("renders both option headings (Cheapest and Upgraded)", () => {
    render(<DigitalPianoPage />);
    // Multiple elements may include "Cheapest"/"Upgraded" — assert at least one
    expect(screen.getAllByText(/Cheapest/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Upgraded/i).length).toBeGreaterThan(0);
  });

  it("renders five product cards (3 cheapest + 2 upgraded)", () => {
    render(<DigitalPianoPage />);
    const amazonLinks = screen.getAllByRole("link", { name: /view on amazon/i });
    expect(amazonLinks.length).toBe(5);
  });

  it("every product card links to an amzn.to URL with sponsored rel", () => {
    render(<DigitalPianoPage />);
    const amazonLinks = screen.getAllByRole("link", { name: /view on amazon/i });
    for (const link of amazonLinks) {
      expect(link.getAttribute("href")).toMatch(/^https:\/\/amzn\.to\//);
      expect(link.getAttribute("rel") || "").toContain("sponsored");
      expect(link.getAttribute("target")).toBe("_blank");
    }
  });

  it("renders the X Stand and Digital Piano (with Built-in Legs) products by name", () => {
    render(<DigitalPianoPage />);
    expect(screen.getByText("X Stand")).toBeInTheDocument();
    expect(
      screen.getByText(/Digital Piano \(with Built-in Legs\)/i)
    ).toBeInTheDocument();
  });

  it("includes an Amazon Associates disclosure", () => {
    render(<DigitalPianoPage />);
    expect(screen.getByText(/Amazon Associate/i)).toBeInTheDocument();
  });

  it("renders product images via next/image with non-empty src and alt", () => {
    render(<DigitalPianoPage />);
    const imgs = document.querySelectorAll("img");
    // Cards each have an image; expect at least 5
    const productImgs = Array.from(imgs).filter((img) =>
      (img.getAttribute("src") || "").includes("/digital-piano/")
    );
    expect(productImgs.length).toBeGreaterThanOrEqual(5);
    for (const img of productImgs) {
      expect(img.getAttribute("alt")).toBeTruthy();
    }
  });
});

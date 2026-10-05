import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../app/components/Navbar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

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

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Piano")).toBeInTheDocument();
  });

  it("renders all top-level navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Testimonials").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blog").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Digital Piano Deal").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Student Portal").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Volz Method dropdown button", () => {
    render(<Navbar />);
    const buttons = screen.getAllByText("Volz Method");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("toggles the dropdown menu on click", () => {
    render(<Navbar />);
    // Find the desktop dropdown button (has aria-expanded)
    const button = screen.getByRole("button", { name: /volz method/i });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("The Method")).toBeInTheDocument();
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("Core Values")).toBeInTheDocument();
  });

  it("renders Schedule a Call CTA with correct href", () => {
    render(<Navbar />);
    const ctaLinks = screen.getAllByText("Schedule a Call");
    ctaLinks.forEach((link) => {
      expect(link.closest("a")).toHaveAttribute("href", "/schedule-call");
    });
  });

  it("exposes the Volz Method dropdown as a disclosure (aria-expanded + aria-controls)", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /volz method/i });
    // A list of links is a disclosure, not an ARIA menu, so no aria-haspopup.
    expect(button).not.toHaveAttribute("aria-haspopup");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "nav-volz-method");
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the dropdown on Escape and returns focus to its button", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /volz method/i });
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(button);
  });

  it("renders the mobile menu toggle button with its state", () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole("button", { name: "Open menu" });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveAttribute("aria-controls", "mobile-menu");
  });

  it("opens mobile menu when toggle is clicked", () => {
    render(<Navbar />);
    const toggleButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(toggleButton).toHaveAccessibleName("Close menu");
    // Mobile menu should now show the links
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBeGreaterThanOrEqual(2); // desktop + mobile
  });
});

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
    expect(screen.getAllByText("Teaching Positions").length).toBeGreaterThanOrEqual(1);
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

  it("has aria-haspopup on dropdown button", () => {
    render(<Navbar />);
    const button = screen.getByRole("button", { name: /volz method/i });
    expect(button).toHaveAttribute("aria-haspopup", "true");
  });

  it("renders the mobile menu toggle button", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle menu");
    expect(toggleButton).toBeInTheDocument();
  });

  it("opens mobile menu when toggle is clicked", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle menu");
    fireEvent.click(toggleButton);
    // Mobile menu should now show the links
    const homeLinks = screen.getAllByText("Home");
    expect(homeLinks.length).toBeGreaterThanOrEqual(2); // desktop + mobile
  });
});

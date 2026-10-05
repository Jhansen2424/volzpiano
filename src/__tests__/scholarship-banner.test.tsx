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

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import Navbar from "../app/components/Navbar";

describe("Scholarship Banner", () => {
  it("renders 'We Accept the Utah Fits All Scholarship' above the menu", () => {
    render(<Navbar />);
    expect(
      screen.getByText(/we accept the utah fits all scholarship/i)
    ).toBeInTheDocument();
  });

  it("renders the banner inside the fixed site header (so it stays sticky with the menu)", () => {
    render(<Navbar />);
    const banner = screen.getByText(/we accept the utah fits all scholarship/i);
    // Walk up the tree until we hit the <header> or run out. (The banner isn't
    // navigation, so it lives in the header landmark alongside the <nav>.)
    let node: HTMLElement | null = banner;
    let foundNav = false;
    while (node) {
      if (node.tagName === "HEADER") {
        foundNav = true;
        break;
      }
      node = node.parentElement;
    }
    expect(foundNav).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("<Header />", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("anchor title flow", () => {
    const anchor = screen.getByRole("link", { name: /icon/i });

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "/");
  });

  it("anchor cart flow", () => {
    const anchor = screen.getByRole("link", { name: "0" });

    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveAttribute("href", "/cart");
  });
});

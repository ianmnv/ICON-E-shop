import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("<Footer />", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("render footer social media links", () => {
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(8);
  });
});

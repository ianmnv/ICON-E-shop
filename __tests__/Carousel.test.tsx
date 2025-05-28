import { render, screen } from "@testing-library/react";
import Carousel from "../components/Carousel";
import userEvent from "@testing-library/user-event";

describe("<Carousel />", () => {
  beforeEach(() => {
    render(<Carousel />);
  });

  it("renders alt images and texts", () => {
    const banners = [
      /feel iconic/i,
      /feel stylish/i,
      /feel classy/i,
      /feel fresh/i,
    ];

    banners.forEach((string) =>
      expect(screen.getByText(string)).toBeInTheDocument()
    );

    expect(screen.getAllByAltText("modelo de ropa")).toHaveLength(
      banners.length
    );
  });

  it("buttons flow", async () => {
    const user = userEvent.setup();
    const allBtns = screen.getAllByRole("button");

    expect(screen.getByText(/feel iconic/i)).toBeInTheDocument();

    await user.click(allBtns[0]);
    expect(screen.getByText(/feel stylish/i)).toBeInTheDocument();

    await user.click(allBtns[1]);
    expect(screen.getByText(/feel iconic/i)).toBeInTheDocument();

    await user.click(allBtns[-1]);
    expect(screen.getByText(/feel fresh/i)).toBeInTheDocument();
  });
});

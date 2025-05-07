import { render, screen } from "@testing-library/react";
import Home from "./page";

it("test home page", () => {
  render(<Home />);

  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import Home from "./page";

it("test home page", () => {
  render(<Home />);

  expect(screen.getAllByRole("heading", { name: /destacados/i })).toHaveLength(
    2
  );
  expect(screen.getByText(/para hombre/i)).toBeInTheDocument();
  expect(screen.getByText(/para mujer/i)).toBeInTheDocument();
});

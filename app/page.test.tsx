import { screen, render } from "@testing-library/react";
import Home from "./page";

vi.mock("@/components/ProductItem", () => ({
  default: () => <div data-testid="mocked-products-grid">Product item</div>,
}));

it("test home page", () => {
  render(<Home />);

  expect(screen.getAllByRole("heading", { name: /destacados/i })).toHaveLength(
    2
  );
  expect(screen.getByText(/para hombre/i)).toBeInTheDocument();
  expect(screen.getByText(/para mujer/i)).toBeInTheDocument();
});

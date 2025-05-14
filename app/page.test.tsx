import { screen, render } from "@testing-library/react";
import Home from "./page";

vi.mock("@/components/ProductsGrid", () => ({
  default: () => <div data-testid="mocked-products-grid">Products Grid</div>,
}));

it("test home page", () => {
  render(<Home />);

  expect(screen.getAllByRole("heading", { name: /destacados/i })).toHaveLength(
    2
  );
  expect(screen.getByText(/para hombre/i)).toBeInTheDocument();
  expect(screen.getByText(/para mujer/i)).toBeInTheDocument();
});

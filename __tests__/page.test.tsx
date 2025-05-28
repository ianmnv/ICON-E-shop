import { screen, render } from "@testing-library/react";
import Home from "../app/page";

vi.mock("@/components/ProductItem", () => ({
  default: () => <div data-testid="mocked-products-grid">Product item</div>,
}));

it("test home page", () => {
  render(<Home />);

  expect(screen.getAllByRole("heading", { name: /features/i })).toHaveLength(2);
  expect(screen.getByText(/for men/i)).toBeInTheDocument();
  expect(screen.getByText(/for women/i)).toBeInTheDocument();
});

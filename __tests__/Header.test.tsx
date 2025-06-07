import { screen } from "@testing-library/react";
import renderWithProviders from "./utils/test-utils";
import Header from "../components/Header";
import { mockSingleProduct } from "./__mocks__/mockData";

describe("<Header />", () => {
  it("render link to home", () => {
    renderWithProviders(<Header />);
    const link = screen.getByRole("link", { name: /icon/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("render link to cart with no items", () => {
    renderWithProviders(<Header />);
    const link = screen.getByRole("link", { name: "0" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/cart");
  });

  it("checks link to cart with 1 item", () => {
    const preloadedState = { cart: [mockSingleProduct] };

    renderWithProviders(<Header />, { preloadedState });

    const link = screen.getByRole("link", { name: "1" });

    expect(link).toBeInTheDocument();
  });

  it("checks link to cart to have multiple items", () => {
    const preloadedState = {
      cart: [
        mockSingleProduct,
        { ...mockSingleProduct, id: 2 },
        { ...mockSingleProduct, id: 3 },
      ],
    };

    renderWithProviders(<Header />, { preloadedState });

    const link = screen.getByRole("link", { name: "3" });

    expect(link).toBeInTheDocument();
  });
});

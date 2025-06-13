import { screen } from "@testing-library/dom";
import renderWithProviders from "./utils/test-utils";
import { mockProducts } from "./__mocks__/mockData";
import ProductCard from "../components/ProductCard";

describe("<ProductCard />", () => {
  it("render products", () => {
    renderWithProviders(<ProductCard productDetails={mockProducts} />);

    for (let i = 0; i < mockProducts.length; i++) {
      const image = screen.getByRole("img", {
        name: mockProducts[i].title,
      });
      const productName = screen.getByRole("heading", {
        name: mockProducts[i].title,
      });
      const price = screen.getByText(`💲 ${mockProducts[i].price}`);
      const rating = screen.getByText(`⭐️ ${mockProducts[i].rating}`);

      expect(image).toBeInTheDocument();
      expect(productName).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(rating).toBeInTheDocument();
    }

    expect(screen.getAllByRole("heading")).toHaveLength(2);
  });
});

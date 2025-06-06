import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderWithProviders from "./utils/test-utils";
import ProductContent from "@/components/ProductContent";
import { mockProducts } from "./__mocks__/mockData";
import { useFetchSingleProductQuery } from "../store/api/productsApi";

vi.mock("../store/api/productsApi", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useFetchSingleProductQuery: vi.fn(),
  };
});

const mockFetchSingleProductQuery =
  useFetchSingleProductQuery as unknown as ReturnType<typeof vi.fn>;

describe("<ProductContent />", () => {
  it("display single product and check component flow", async () => {
    const mockProduct = mockProducts[0];
    const user = userEvent.setup();

    mockFetchSingleProductQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<ProductContent productId={97} />);

    const altText = screen.getByRole("img", { name: mockProduct.title });
    const title = screen.getByText(mockProduct.title);
    const warranty = screen.getByText(mockProduct.warrantyInformation);
    const price = screen.getByText(`💲${mockProduct.price}`);
    const returnPolicy = screen.getByText(mockProduct.returnPolicy);
    const addToCartBtn = screen.getByRole("button", {
      name: /add to the cart/i,
    });
    const cartNotification = screen.getByTestId("cart-notification");

    await waitFor(() => {
      expect(altText).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(warranty).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(returnPolicy).toBeInTheDocument();
      expect(addToCartBtn).toBeInTheDocument();
      expect(cartNotification).not.toHaveClass(/show__notification/i);
    });

    await user.click(addToCartBtn);

    expect(cartNotification).toHaveClass(/show__notification/i);
  });

  it("display loading spinner", () => {
    mockFetchSingleProductQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<ProductContent productId={97} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("render all images to see product and checks img flow", async () => {
    const user = userEvent.setup();
    const mockProduct = mockProducts[0];

    mockFetchSingleProductQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<ProductContent productId={97} />);

    for (let i = 0; i < mockProducts.length; i++) {
      const imgBtn = screen.getByRole("button", {
        name: `${mockProduct.title}-${i}`,
      });
      const actualImg = screen.getByRole("img", {
        name: `${mockProduct.title}-${i}`,
      });

      expect(actualImg).toBeInTheDocument();
      await user.click(imgBtn);
      expect(actualImg).toHaveClass(/active__img/i);
      expect(imgBtn).toBeInTheDocument();
    }

    expect(mockProduct.images).toHaveLength(3);
  });
});

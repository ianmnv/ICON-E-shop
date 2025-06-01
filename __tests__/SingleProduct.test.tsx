import { screen, waitFor } from "@testing-library/react";
import renderWithProviders from "./utils/test-utils";
import SingleProduct from "@/app/product/[product]/page";
import { mockProducts } from "./__mocks__/mockData";
import { useFetchSingleProductQuery } from "../store/api/productsApi";

vi.mock("react", async () => {
  const actual = await import("react");
  return {
    ...actual,
    use: vi.fn((promise) => {
      if (promise instanceof Promise) {
        return promise.constructor === Promise.prototype.constructor
          ? vi.mocked(Promise.resolve(promise))
          : promise;
      }
      return promise;
    }),
  };
});

vi.mock("../store/api/productsApi", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useFetchSingleProductQuery: vi.fn(),
  };
});

const mockFetchSingleProductQuery =
  useFetchSingleProductQuery as unknown as ReturnType<typeof vi.fn>;

describe("<SingleProduct />", () => {
  it("display single product", async () => {
    const mockProduct = mockProducts[0];

    mockFetchSingleProductQuery.mockReturnValue({
      data: mockProduct,
      isLoading: false,
      isError: false,
    });

    const mockParams = Promise.resolve({ product: 97 });

    const reactModule = await import("react");
    const useMock = vi.mocked(reactModule.use);

    useMock.mockImplementation((value) => {
      if (value === mockParams) {
        return { product: 97 };
      }
      return value;
    });

    renderWithProviders(<SingleProduct params={mockParams} />);

    const altText = screen.getByRole("img", { name: mockProduct.title });
    const title = screen.getByText(mockProduct.title);
    const warranty = screen.getByText(mockProduct.warrantyInformation);
    const price = screen.getByText(mockProduct.price);
    const returnPolicy = screen.getByText(mockProduct.returnPolicy);
    const addToCartBtn = screen.getByRole("button", {
      name: /add to the cart/i,
    });

    await waitFor(() => {
      expect(altText).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(warranty).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(returnPolicy).toBeInTheDocument();
      expect(addToCartBtn).toBeInTheDocument();
    });
  });
});

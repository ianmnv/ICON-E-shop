import { screen } from "@testing-library/react";
import renderWithProviders from "./utils/test-utils";
import { useFetchProductsQuery } from "@/store/api/productsApi";
import { mockProducts } from "./__mocks__/mockData";
import ProductItem from "../components/ProductItem";

vi.mock(import("../store/api/productsApi"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useFetchProductsQuery: vi.fn(),
  };
});

const mockFetchProductsQuery = useFetchProductsQuery as unknown as ReturnType<
  typeof vi.fn
>;

describe("<ProductItem />", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render product cards ", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<ProductItem productItem={"mens-watches"} />);

    expect(screen.queryByText(/an error occur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    for (const mock of mockProducts) {
      const title3 = screen.getByRole("heading", { name: mock.title });
      const altImg = screen.getByRole("img", { name: mock.title });
      const priceTxt = screen.getByText(new RegExp(`${mock.price}`));

      expect(title3).toBeInTheDocument();
      expect(altImg).toBeInTheDocument();
      expect(priceTxt).toBeInTheDocument();
    }
  });

  it("displays error message", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 500, data: "Server Error" },
    });

    renderWithProviders(<ProductItem productItem={"mens-watches"} />);

    expect(
      screen.getByText(/an error occurred, please try again/i)
    ).toBeInTheDocument();
  });

  it("displays loading message", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<ProductItem productItem={"mens-watches"} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

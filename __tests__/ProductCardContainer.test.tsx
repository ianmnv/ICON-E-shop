import { screen } from "@testing-library/dom";
import { useFetchProductsQuery } from "../store/api/productsApi";
import renderWithProviders from "./utils/test-utils";
import { mockProducts } from "./__mocks__/mockData";
import ProductCardContainer from "../components/ProductCardContainer";

vi.mock("../store/api/productsApi", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useFetchProductsQuery: vi.fn(),
  };
});

const mockFetchProductsQuery = useFetchProductsQuery as unknown as ReturnType<
  typeof vi.fn
>;

describe("<ProductCardContainer />", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render products", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<ProductCardContainer productQuery="mens-waches" />);

    const productName = screen.getAllByRole("heading", {
      name: mockProducts[0].title,
    });
    const errorMsg = screen.queryByText(/an error occurred/i);
    const loadingMsg = screen.queryByText(/loading/i);

    expect(productName[0]).toBeInTheDocument();
    expect(errorMsg).not.toBeInTheDocument();
    expect(loadingMsg).not.toBeInTheDocument();
  });

  it("shows error message", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<ProductCardContainer productQuery="mens-watches" />);

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<ProductCardContainer productQuery="mens-watches" />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});

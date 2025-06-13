import { screen } from "@testing-library/dom";
import renderWithProviders from "./utils/test-utils";
import { mockProducts } from "./__mocks__/mockData";
import { useFetchProductsQuery } from "@/store/api/productsApi";
import ProductCard from "@/components/ProductCard";

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

describe("<ProductCard />", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("render products", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<ProductCard productQuery={"mens-watches"} />);

    for (let i = 0; i < mockProducts.length; i++) {
      const image = screen.getByRole("img", {
        name: mockProducts[i].title,
      });
      const titleH3 = screen.getByRole("heading", {
        name: mockProducts[i].title,
      });
      const price = screen.getByText(`💲 ${mockProducts[i].price}`);
      const rating = screen.getByText(`⭐️ ${mockProducts[i].rating}`);

      expect(image).toBeInTheDocument();
      expect(titleH3).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(rating).toBeInTheDocument();
    }

    expect(screen.getAllByRole("heading")).toHaveLength(2);
  });

  it("shows error message", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<ProductCard productQuery={"mens-watches"} />);

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockFetchProductsQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<ProductCard productQuery={"mens-watches"} />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });
});

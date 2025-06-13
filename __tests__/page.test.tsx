import { screen } from "@testing-library/react";
import renderWithProviders from "./utils/test-utils";
import { mockProducts } from "./__mocks__/mockData";
import { useFetchProductsQuery } from "@/store/api/productsApi";
import Home from "../app/page";

vi.mock("../store/api/productsApi", async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useFetchProductsQuery: vi.fn(),
  };
});

const mockedUseFetchProductsQuery =
  useFetchProductsQuery as unknown as ReturnType<typeof vi.fn>;

describe("<Home />", () => {
  it("render home page correctly", () => {
    mockedUseFetchProductsQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: { products: mockProducts },
    });

    renderWithProviders(<Home />);

    const title = screen.getAllByRole("heading", {
      name: mockProducts[0].title,
    });

    expect(screen.getAllByRole("heading", { name: /features/i })).toHaveLength(
      2
    );
    expect(screen.getByText(/for men/i)).toBeInTheDocument();
    expect(screen.getByText(/for women/i)).toBeInTheDocument();
    expect(screen.getByText(/feel iconic/i)).toBeInTheDocument();
    expect(title[0]).toBeInTheDocument();
  });

  it("displays error in features element", () => {
    mockedUseFetchProductsQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
    });

    renderWithProviders(<Home />);

    expect(
      screen.getAllByText(/an error occurred, please try again/i)[0]
    ).toBeInTheDocument();
  });
});

import { MenuContext } from "@/context/MenuContext";
import renderWithProviders from "./utils/test-utils";
import Menu from "../components/menu/Menu";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

interface Categories {
  title: string;
  subRoute: string;
}

describe("<Menu />", () => {
  const mockSetIsMenuOpen = vi.fn();

  it("initial state of component", () => {
    renderWithProviders(
      <MenuContext.Provider
        value={{ isMenuOpen: false, setIsMenuOpen: mockSetIsMenuOpen }}
      >
        <Menu />
      </MenuContext.Provider>
    );

    const aside = screen.getByRole("complementary");
    const closeBtn = screen.getByRole("button", { name: /close menu/i });

    expect(closeBtn).toBeInTheDocument();
    expect(aside).not.toHaveClass("menu__transition");
  });

  it("checks menu when open", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <MenuContext.Provider
        value={{ isMenuOpen: true, setIsMenuOpen: mockSetIsMenuOpen }}
      >
        <Menu />
      </MenuContext.Provider>
    );

    const aside = screen.getByRole("complementary");
    const closeBtn = screen.getByRole("button", { name: /close menu/i });
    const menCategoryBtn = screen.getByRole("button", { name: "Men" });
    const womenCategoryBtn = screen.getByRole("button", { name: "Women" });

    await user.click(closeBtn);

    expect(mockSetIsMenuOpen).toHaveBeenCalledOnce();
    expect(mockSetIsMenuOpen).toHaveBeenCalledWith(false);
    expect(aside).toHaveClass(/menu__transition/i);
    expect(menCategoryBtn).toBeInTheDocument();
    expect(womenCategoryBtn).toBeInTheDocument();
  });

  it("display categories", async () => {
    const user = userEvent.setup();

    const menCategories: Categories[] = [
      { title: "All for men", subRoute: "all" },
      { title: "T-shirts", subRoute: "mens-shirts" },
      { title: "Men's watches", subRoute: "mens-watches" },
      { title: "Men's shoes", subRoute: "mens-shoes" },
      { title: "Men's sunglasses", subRoute: "sunglasses" },
    ];

    const womenCategories: Categories[] = [
      {
        title: "All for women",
        subRoute: "all",
      },
      { title: "Dresses", subRoute: "womens-dresses" },
      { title: "Women's shoes", subRoute: "womens-shoes" },
      { title: "Women's jewellery", subRoute: "womens-jewellery" },
      { title: "Women's watches", subRoute: "womens-watches" },
      { title: "Women's bags", subRoute: "womens-bags" },
    ];

    renderWithProviders(
      <MenuContext.Provider
        value={{ isMenuOpen: true, setIsMenuOpen: mockSetIsMenuOpen }}
      >
        <Menu />
      </MenuContext.Provider>
    );

    const menCategoryBtn = screen.getByRole("button", { name: "Men" });
    const womenCategoryBtn = screen.getByRole("button", { name: "Women" });
    const navigationEl = screen.getAllByRole("navigation");

    expect(navigationEl[0]).toHaveClass(/hide/i);
    expect(navigationEl[1]).toHaveClass(/hide/i);

    await user.click(menCategoryBtn);

    expect(navigationEl[0]).not.toHaveClass(/hide/i);
    expect(navigationEl[0]).toBeInTheDocument();

    for (const eachCategory of menCategories) {
      expect(
        screen.getByRole("link", { name: eachCategory.title })
      ).toBeInTheDocument();
    }

    await user.click(womenCategoryBtn);

    expect(navigationEl[1]).not.toHaveClass(/hide/i);
    expect(navigationEl[1]).toBeInTheDocument();

    for (const eachCategory of womenCategories) {
      expect(
        screen.getByRole("link", { name: eachCategory.title })
      ).toBeInTheDocument();
    }
  });
});

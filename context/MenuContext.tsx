"use client";

import {
  useState,
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type Menu = {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const MenuContext = createContext<Menu>({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
});

export default function MenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <MenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

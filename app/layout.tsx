import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./providers";
import MenuProvider from "@/context/MenuContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICON | HOME",
  description: `Discover ICON Shop — your online destination for contemporary fashion. 
    Explore a curated selection of clothing, shoes, and accessories for men and women, 
    designed for those who value style and authenticity. Feel iconic. Be yourself.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <MenuProvider>
            <Header />
            <Menu />
          </MenuProvider>

          {children}
        </ReduxProvider>
        <Footer />
      </body>
    </html>
  );
}

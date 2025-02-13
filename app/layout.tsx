import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Providers } from './providers'
import Menu from "./Menu";
import localFont from "next/font/local";
import { Suspense } from "react";
import LoadingPage from "./loading";
const inter = Inter({ subsets: ["latin"] });

const localfont = localFont(
{ 
    
      src:"./fonts/futura-heavy-bt.ttf",
      weight: "700",
  variable: "--font-futura"
}
);

export const metadata: Metadata = {
  title: "ISIANPADU SYSTEMS SDN BHD",
  description: "Official website of ISIANPADU SYSTEMS SDN BHD",
  icons:{
    icon:['/favicon.ico?v=4'],
    apple:['/apple-touch-icon.png?v=4'],
    shortcut:['/apple-touch-icon.png']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={localfont.variable}>
            <NavBar></NavBar>
      <Providers>{children}</Providers>
      </body>


    </html>

  );
}

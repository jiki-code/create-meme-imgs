import "./globals.css";
import ToastProvider from "./ToastProvider";
import { Providers } from "./Providers";
import type { Metadata } from "next";
import LanguageSwitcher from "../components/language-switch"
export const metadata: Metadata = {
  title: "Meme Tool",
  description: "Create meme from JPG, GIF or PNG",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
      className="xl:overflow-hidden overflow-scroll min-h-screen"
      >
        <LanguageSwitcher />
       <Providers>
          {children}
        </Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
import Nav from "@/components/shared/Nav";
import "../sass/main.scss";
import type { Metadata } from "next";
import { roboto } from "@/lib/fonts";
import MarkdownInputContextProvider from "@/context/markdown-input-context";

export const metadata: Metadata = {
  title: "Markdown App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MarkdownInputContextProvider>
          <Nav />
          {children}
        </MarkdownInputContextProvider>
      </body>
    </html>
  );
}

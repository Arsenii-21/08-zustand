import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { openGraphImage, siteUrl } from "../lib/seo";
import Providers from "./providers";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A calm workspace for capturing and organizing your notes.",
  openGraph: {
    title: "NoteHub",
    description: "A calm workspace for capturing and organizing your notes.",
    url: siteUrl,
    images: [openGraphImage],
  },
};

export default function RootLayout({
  children,
  modal,
}: LayoutProps<"/"> & { modal: ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}

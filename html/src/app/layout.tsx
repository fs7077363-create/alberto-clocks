import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alberto — Luxury Watch Company",
  description: "Alberto luxury watches in gold & green. Shop 24 real timepieces, order online, Buy Now.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('alberto_theme')==='light')document.documentElement.classList.add('light')}catch(e){}` }} />
      </head>
      <body className="antialiased font-[ui-serif,Georgia,serif]">{children}</body>
    </html>
  );
}

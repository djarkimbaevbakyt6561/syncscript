import type {Metadata} from "next";
import "./globals.css";
import {Providers} from "../core/app/Providers";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: "Modular Colloboration Engine",
  description: "Notion like Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark`}>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}

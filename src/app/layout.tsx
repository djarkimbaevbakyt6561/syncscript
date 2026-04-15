import type {Metadata} from "next";
import "./globals.css";
import "@/src/core/app/styles/liveblocks-collaboration.css";
import "@/src/core/app/styles/liveblocks-threads.css";
import "@/src/core/app/styles/liveblocks-composer-ui.css";
import "@/src/core/app/styles/liveblocks-floating-toolbar.css";
import "@/src/core/app/styles/liveblocks-popovers.css";
import {Providers} from "../core/app/Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

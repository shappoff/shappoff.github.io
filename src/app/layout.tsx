import type {Metadata, Viewport} from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'shappoff',
  verification: {
    google: "WcZLxrvNHupEwOXBZ_xza8RMaDFrJ_7Nc_Ax_vyo0zw",
    yandex: "cd605c554612fb41"
  },
  other: {
    robots: "index, follow",
    charset: "UTF-8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <GoogleAnalytics gaId="G-BS71TCVL7J" />
      <body>
        {children}
      </body>
    </html>
  );
}

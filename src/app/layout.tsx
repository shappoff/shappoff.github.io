import type {Metadata, Viewport} from "next";
import GAAnalytics from "@/components/shared/GAAnalytics";
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
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body>
        {children}
        {
          !!process.env.DEBUG ? <></> : <GAAnalytics />
        }
      </body>
    </html>
  );
}

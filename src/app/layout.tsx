import type {Metadata, Viewport} from "next";
import GAAnalytics from "@/components/shared/GAAnalytics";
import YandexMetrika from "@/components/shared/YandexMetrika";
import SkipToMainContent from "@/components/shared/SkipToMainContent";
import "./globals.css";
import "./main-page.css";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shappoff.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "shappoff — архивы, карты, генеалогия",
    template: "%s | shappoff",
  },
  description:
    "Проекты по истории Беларуси: НИАБ и описи фондов, приходы и метрики, аэрофотосъёмка ВОВ, дневник Жигало, книги «Память», имена в метрических записях и другое.",
  keywords: [
    "Беларусь",
    "архив",
    "НИАБ",
    "генеалогия",
    "метрические книги",
    "приходы",
    "аэрофотосъёмка",
    "история",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "shappoff",
    title: "shappoff — архивы, карты, генеалогия",
    description:
      "Проекты по истории Беларуси: архивы, карты, поиск по книгам «Память», дневник Жигало, справочники имён.",
  },
  twitter: {
    card: "summary_large_image",
    title: "shappoff — архивы, карты, генеалогия",
    description:
      "Проекты по истории Беларуси: архивы, карты, генеалогия и локальная история.",
  },
  verification: {
    google: "WcZLxrvNHupEwOXBZ_xza8RMaDFrJ_7Nc_Ax_vyo0zw",
    yandex: "cd605c554612fb41"
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <SkipToMainContent />
        <main id="main-content">
          {children}
        </main>
        <GAAnalytics />
        <YandexMetrika />
      </body>
    </html>
  );
}

import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import Scripts from "@/components/common/Script";
import { LoadingProvider } from "@/components/ui/preloader";
import type { Lang } from "@/i18n/request";
import { routing } from "@/i18n/routing";
import "../globals.css";
import 'lenis/dist/lenis.css'


const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Lang }>;
}>) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Lang)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Scripts />
        <link rel="icon" href="/logo/favicon.svg" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href="/logo/favicon.svg"
          type="image/svg+xml"
        />
      </head>
      <body className={`${montserrat.variable} antialiased bg-background dark`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LoadingProvider>{children}</LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

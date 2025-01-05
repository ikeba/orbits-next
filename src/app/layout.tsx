import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { createTheme, MantineProvider, mantineHtmlProps } from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const theme = createTheme({});

export const metadata: Metadata = {
  title: "Orbits Next",
  description: "Orbits Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased tw-min-h-screen tw-font-[family-name:var(--font-geist-sans)] tw-grid tw-grid-rows-[auto_1fr_auto]`}
      >
        <Header />
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <main>{children}</main>
        </MantineProvider>
        <Footer />
      </body>
    </html>
  );
}

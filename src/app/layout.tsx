import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Masthead } from "@/ui/organisms/masthead";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marco Goedert",
  description:
    "Marco Goedert is a software engineer from Porto Alegre, Brazil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Masthead />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Masthead } from "@/ui/organisms/masthead";
import Footer from "@/ui/organisms/Footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Marco Goedert",
    template: "%s | Marco Goedert"
  },
  
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

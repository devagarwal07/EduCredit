import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Analytics } from "@/components/analytics";
import { SiteHeader } from "@/components/layouts/site-header";
import { SiteFooter } from "@/components/layouts/site-footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: {
    default: "EduCredit Pro | Education-to-Career Acceleration Platform",
    template: "%s | EduCredit Pro",
  },
  description:
    "Connecting education funding with career acceleration through skill verification, employer partnerships, and community knowledge exchange.",
  keywords: [
    "education funding",
    "career acceleration",
    "skill verification",
    "blockchain credentials",
    "education marketplace",
    "learning platform",
  ],
  authors: [
    {
      name: "EduCredit Pro Team",
      url: "https://educredit.pro",
    },
  ],
  creator: "EduCredit Pro Team",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <ClerkProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <Analytics />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

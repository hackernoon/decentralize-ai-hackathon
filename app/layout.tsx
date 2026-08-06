import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020812",
};

export const metadata: Metadata = {
  title: {
    default: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
    template: "%s | Decentralize AI Hackathon by HackerNoon",
  },
  description: "Join the Decentralize AI Hackathon by HackerNoon. Compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Publish on HackerNoon to enter. Open globally.",
  alternates: { canonical: "/" },
  keywords: [
    "Decentralize AI Hackathon",
    "Decentralized AI Hackathon 2026",
    "AI Hackathon 2026",
    "HackerNoon Hackathon",
    "Decentralized AI",
    "Open Source AI",
    "Nosana Compute Credits",
    "Arweave",
    "MEXC",
    "Web3 AI",
    "Blockchain AI",
    "Federated Learning",
    "AI Hackathon Prizes",
    "AI Compute Credits for Participants",
    "Write to Earn",
  ],
  authors: [{ name: "HackerNoon" }],
  creator: "HackerNoon",
  publisher: "HackerNoon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Decentralize AI Hackathon",
    title: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
    description: "Join the Decentralize AI Hackathon by HackerNoon. Compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Publish on HackerNoon to enter. Open globally.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Decentralize AI Hackathon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
    description: "Join the Decentralize AI Hackathon by HackerNoon. Compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Publish on HackerNoon to enter. Open globally.",
    creator: "@hackernoon",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true, 
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GoogleAnalytics />
      </head>
      <body className="antialiased flex flex-col min-h-screen min-h-dvh text-white bg-[#020812] overflow-x-hidden" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1 flex flex-col min-h-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

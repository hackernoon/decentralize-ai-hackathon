import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Blog Generator — Draft Your Hackathon Submission",
  description:
    "Generate a HackerNoon-ready blog draft about decentralized AI in minutes. Free, open-source AI scaffolds your hackathon submission step by step — your shot at the $51,750+ prize pool.",
  keywords: [
    "AI blog generator",
    "decentralized AI blog generator",
    "HackerNoon blog draft tool",
    "free AI writing tool",
    "hackathon submission generator",
    "open source AI writer",
  ],
  alternates: { canonical: "/blog-generator" },
  openGraph: {
    title: "Free AI Blog Generator — Decentralize AI Hackathon by HackerNoon",
    description:
      "Draft a HackerNoon-ready post about decentralized AI in minutes with our free, open-source AI tool. Enter the $51,750+ prize pool.",
    url: "/blog-generator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Free AI Blog Generator — Decentralize AI Hackathon by HackerNoon",
      },
    ],
  },
  twitter: {
    title: "Free AI Blog Generator — Decentralize AI Hackathon by HackerNoon",
    description:
      "Draft a HackerNoon-ready blog post about decentralized AI in minutes. Free, open-source.",
    images: ["/og-image.jpg"],
  },
};

export default function BlogGeneratorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claim $70 Free Nosana GPU Compute Credits",
  description:
    "Hackathon participants only: claim $70 in free Nosana GPU compute credits to train, run inference, and deploy your decentralized AI project. $35,000 pool, 500 spots.",
  keywords: [
    "free Nosana GPU credits",
    "Nosana compute credits claim",
    "free GPU credits AI",
    "decentralized GPU network",
    "AI inference credits",
    "hackathon compute credits",
    "Decentralize AI Hackathon claim",
  ],
  alternates: { canonical: "/claim/nosana" },
  openGraph: {
    title: "Claim $70 Free Nosana GPU Compute Credits — Decentralize AI Hackathon",
    description:
      "Free Nosana GPU compute credits for eligible hackathon participants. Train, run inference, and deploy on a decentralized GPU network. 500 spots, $35,000 pool.",
    url: "/claim/nosana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Claim $70 Free Nosana GPU Compute Credits — Decentralize AI Hackathon",
      },
    ],
  },
  twitter: {
    title: "Claim $70 Free Nosana GPU Credits — Decentralize AI Hackathon",
    description:
      "Free Nosana GPU compute credits for verified hackathon participants. 500 spots, $35,000 pool.",
    images: ["/og-image.jpg"],
  },
};

export default function NosanaClaimLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { SPONSORS, type Sponsor } from "@/lib/sponsors";

export interface SponsorPrize {
  sponsorName: Sponsor["name"];
  about: string;
  ctaLabel?: string;
  ctaHref?: string;
  cashAmount: string;
  computeCreditsAmount: string;
  prizeSubtext: string;
  /** Overrides for non-numeric prizes (e.g. a domain). When set, replaces the headline cash/compute value. */
  primaryLabel?: string;
  primaryValue?: string;
}

export interface SponsorPrizeCard extends SponsorPrize {
  sponsor: string;
  logo: string;
  url: string;
  accent: string;
}

export const TOTAL_PRIZE_POOL = "$51,750+";
export const PARTICIPANT_AI_CREDITS_POOL = "$35,000";

export const HACKATHON_TIMELINE = {
  launch: "June 1, 2026",
  end: "February 27, 2027",
  label: "June 2026 - Feb 2027 · 2 Rounds",
  rounds: [
    {
      name: "Round 1",
      period: "June 2026 - October 2026",
    },
    {
      name: "Round 2",
      period: "November 2026 - February 2027",
    },
  ],
} as const;

export const POOL_BREAKDOWN = [
  { category: "Nosana Compute Credits", value: "$41,750" },
  { category: "Arweave Credits", value: "$2,500" },
  { category: "AR Cash Prizes", value: "$2,500" },
  { category: "MEXC MX Token Rewards", value: "$5,000" },
] as const;

export const PRIZE_DISTRIBUTION = [
  {
    title: "Winners",
    body: "Top projects receive winner prizes according to each sponsor's criteria across both competition rounds.",
  },
  {
    title: "All Participants",
    body: "Eligible submissions qualify for Nosana compute credits and ecosystem support from partner sponsors.",
  },
  {
    title: "Two Rounds, Global Pool",
    body: "A $51.75K+ prize pool — compute credits, infrastructure, token rewards, and cash prizes — split across two competition rounds.",
  },
] as const;

const SPONSOR_ACCENTS: Record<Sponsor["name"], string> = {
  Nosana: "#00ff88",
  Arweave: "#ff6b35",
  MEXC: "#00b4ff",
  HackerNoon: "#00ff88",
};

const WINNER_PRIZE_DETAILS: SponsorPrize[] = [
  {
    sponsorName: "Nosana",
    cashAmount: "$0",
    computeCreditsAmount: "$6,750",
    prizeSubtext: "15 Winners × $450 Compute Credits",
    about:
      "Nosana winner rewards provide premium compute credits to deploy, test, and scale AI workloads on decentralized GPU infrastructure.",
    ctaLabel: "Explore Nosana",
    ctaHref: "https://nosana.com/?utm_source=hackernoon&utm_medium=ad_placement&utm_campaign=hackathon_submission",
  },
  {
    sponsorName: "Arweave",
    cashAmount: "1,000 AR",
    computeCreditsAmount: "$0",
    prizeSubtext: "$2,500 Worth of AR · Distributed Across Both Rounds",
    about:
      "Arweave winner rewards are paid in AR and support standout projects building with permanent decentralized storage.",
    ctaLabel: "Explore Arweave",
    ctaHref: "https://arweave.org/?utm_source=hackernoon&utm_medium=promotions&utm_campaign=decentralize-ai",
  },
  {
    sponsorName: "MEXC",
    cashAmount: "$5,000",
    computeCreditsAmount: "$0",
    prizeSubtext: "MX Token Rewards · Standout Projects & Winners",
    about:
      "MEXC winner rewards are distributed in MX token value for standout projects in eligible and regulated jurisdictions.",
    ctaLabel: "Explore MEXC",
    ctaHref: "https://www.mexc.com?utm_source=hackathon-website&utm_medium=logo&utm_campaign=decentralize-ai",
  },
  {
    sponsorName: "HackerNoon",
    cashAmount: "$0",
    computeCreditsAmount: "$0",
    primaryLabel: "Grand Prize",
    primaryValue: "decentralizeai.tech",
    prizeSubtext: "Domain · One Winner · Full Ownership Transfer",
    about:
      "HackerNoon will transfer full ownership of the DecentralizeAI.tech domain along with an open source codebase for this platform to one grand winner.",
    ctaLabel: "Read Announcement",
    ctaHref: "https://hackernoon.com/preview/698213250c790092286554e8",
  },
];

const PARTICIPANT_PRIZE_DETAILS: SponsorPrize[] = [
  {
    sponsorName: "Nosana",
    cashAmount: "$0",
    computeCreditsAmount: PARTICIPANT_AI_CREDITS_POOL,
    prizeSubtext: "$70 × 500 Eligible Participants",
    about:
      "Eligible participants can claim Nosana compute credits to build, test, and deploy AI workloads.",
    ctaLabel: "Claim Credits",
    ctaHref: "/claim/nosana",
  },
  {
    sponsorName: "Arweave",
    cashAmount: "$0",
    computeCreditsAmount: "1,000 AR",
    prizeSubtext: "$2,500 Worth of Storage & Ecosystem Credits",
    about:
      "Qualifying projects can receive Arweave ecosystem credits for building on permanent decentralized storage.",
    ctaLabel: "Explore Arweave",
    ctaHref: "https://arweave.org/?utm_source=hackernoon&utm_medium=promotions&utm_campaign=decentralize-ai",
  },
];

function toPrizeCard(prize: SponsorPrize): SponsorPrizeCard {
  const sponsor = SPONSORS.find((item) => item.name === prize.sponsorName);
  if (!sponsor) {
    throw new Error(`Missing sponsor metadata for ${prize.sponsorName}`);
  }

  return {
    sponsor: sponsor.name,
    logo: sponsor.logo,
    url: sponsor.url,
    accent: SPONSOR_ACCENTS[sponsor.name] ?? "#00ff88",
    ...prize,
  };
}

export const WINNER_PRIZES: SponsorPrizeCard[] = WINNER_PRIZE_DETAILS.map(toPrizeCard);
export const PARTICIPANT_PRIZES: SponsorPrizeCard[] = PARTICIPANT_PRIZE_DETAILS.map(toPrizeCard);

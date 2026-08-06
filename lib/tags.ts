export interface SponsorTagGroup {
  sponsorName: "Nosana" | "Arweave" | "MEXC" | "HackerNoon";
  featuredTags?: readonly string[];
  tags: readonly string[];
}

export const SPONSOR_TAGS: readonly SponsorTagGroup[] = [
  {
    sponsorName: "Nosana",
    tags: [
      "gpu-marketplace",
      "gpu-cloud",
      "ai-compute",
      "ai-infrastructure",
      "ai-inference",
      "gpu-rental",
      "on-demand-gpus",
      "scalable-compute",
      "developer-tools",
      "cloud-infrastructure",
      "open-source-gpu-cloud",
    ],
  },
  {
    sponsorName: "Arweave",
    tags: ["arweave", "decentralized-storage", "permanent-storage"],
  },
  {
    sponsorName: "MEXC",
    tags: ["crypto-ai-trading", "ai-token-liquidity", "ai-agent-tokens"],
  },
  {
    sponsorName: "HackerNoon",
    featuredTags: ["decentralize-ai", "decentralize-ai-hackathon"],
    tags: [
      "blockchain",
      "decentralization",
      "artificial-intelligence",
      "programming",
      "crypto",
      "open-source",
      "llms",
      "agentic-ai",
      "zero-knowledge-proofs",
      "technology",
      "future-of-ai",
      "dapps",
      "depin",
      "decentralized-ai",
      "cryptography",
      "web3-development",
      "decentralized-web",
      "ai-ethics",
    ],
  },
];

export const HACKATHON_TAGS = [
  ...new Set(
    SPONSOR_TAGS.flatMap((group) => [...(group.featuredTags ?? []), ...group.tags]),
  ),
];

/** Words that need special casing rather than plain Title Case */
const WORD_OVERRIDES: Record<string, string> = {
  ai: "AI",
  gpu: "GPU",
  gpus: "GPUs",
  llm: "LLM",
  llms: "LLMs",
  api: "API",
  depin: "DePIN",
  dapps: "dApps",
  web3: "Web3",
};

/** Convert a slug to a display label: "gpu-ai-inference" -> "GPU AI Inference" */
export function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => WORD_OVERRIDES[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Build the HackerNoon tagged URL for a slug */
export function tagUrl(slug: string): string {
  return `https://hackernoon.com/tagged/${slug}`;
}

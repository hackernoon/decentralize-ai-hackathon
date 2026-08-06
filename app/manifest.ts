import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Decentralize AI Hackathon by HackerNoon",
    short_name: "Decentralize AI",
    description:
      "Join the Decentralize AI Hackathon by HackerNoon. $51,750+ prize pool plus $35,000 in AI compute credits for participants. Publish on HackerNoon to enter.",
    start_url: "/",
    display: "standalone",
    background_color: "#020812",
    theme_color: "#00ff88",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

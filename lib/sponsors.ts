export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  about: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "Nosana",
    logo: "/sponsors/nosana.svg",
    url: "https://nosana.com/?utm_source=hackernoon&utm_medium=ad_placement&utm_campaign=hackathon_submission",
    about:
      "Nosana is a decentralized GPU marketplace powering AI inference and training workloads at scale.",
    ctaLabel: "Explore Nosana",
    ctaHref: "https://nosana.com/?utm_source=hackernoon&utm_medium=ad_placement&utm_campaign=hackathon_submission",
  },
  {
    name: "Arweave",
    logo: "/sponsors/arweave.svg",
    url: "https://arweave.org/?utm_source=hackernoon&utm_medium=promotions&utm_campaign=decentralize-ai",
    about:
      "Arweave is decentralized permanent storage for the permaweb, built for resilient and open data infrastructure.",
    ctaLabel: "Explore Arweave",
    ctaHref: "https://arweave.org/?utm_source=hackernoon&utm_medium=promotions&utm_campaign=decentralize-ai",
  },
  {
    name: "MEXC",
    logo: "/sponsors/mexc.svg",
    url: "https://www.mexc.com?utm_source=hackathon-website&utm_medium=logo&utm_campaign=decentralize-ai",
    about:
      "MEXC is a global digital asset exchange supporting Web3 builders and token ecosystems.",
    ctaLabel: "Explore MEXC",
    ctaHref: "https://www.mexc.com?utm_source=hackathon-website&utm_medium=logo&utm_campaign=decentralize-ai",
  },
  {
    name: "HackerNoon",
    logo: "/sponsors/hackernoon.svg",
    url: "https://hackernoon.com/?utm_source=hackathon-website&utm_medium=logo&utm_campaign=decentralize-ai",
    about:
      "HackerNoon is a technology publishing platform where builders share open knowledge and project updates.",
    ctaLabel: "Explore HackerNoon",
    ctaHref: "https://hackernoon.com/?utm_source=hackathon-website&utm_medium=logo&utm_campaign=decentralize-ai",
  },
];

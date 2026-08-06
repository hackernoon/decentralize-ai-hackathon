import type { Metadata } from "next";
import Link from "next/link";
import HeroCellBackground from "@/app/components/HeroCellBackground";
import PrizeSponsorCard from "@/app/components/PrizeSponsorCard";
import PrizePoolCount from "@/app/components/PrizePoolCount";
import {
  TOTAL_PRIZE_POOL,
  WINNER_PRIZES,
  PARTICIPANT_PRIZES,
  PRIZE_DISTRIBUTION,
  HACKATHON_TIMELINE,
} from "@/lib/prizes";

export const metadata: Metadata = {
  title: "Prizes — Decentralize AI Hackathon by HackerNoon — $51,750+ Pool + $35,000 in AI Compute Credits for Participants",
  description:
    "See all Decentralize AI Hackathon by HackerNoon prizes: $51,750+ global pool, $35,000 in Nosana compute credits, 1,000 AR cash, and MEXC MX token rewards. Two rounds.",
  keywords: [
    "Decentralize AI Hackathon prizes",
    "AI hackathon prize pool 2026",
    "Nosana compute credits",
    "Arweave AR prizes",
    "MEXC MX token rewards",
    "AI credits for participants",
    "hackathon cash prizes",
  ],
  alternates: { canonical: "/prizes" },
  openGraph: {
    title: "Prizes — Decentralize AI Hackathon by HackerNoon — $51,750+ Pool + $35,000 in AI Compute Credits for Participants",
    description:
      "$51,750+ global prize pool plus $35,000 in Nosana AI compute credits for participants, Arweave storage, AR cash, and MEXC token rewards. Two rounds, open globally.",
    url: "/prizes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prizes — Decentralize AI Hackathon by HackerNoon — $51,750+ Pool + $35,000 in AI Compute Credits for Participants",
      },
    ],
  },
  twitter: {
    title: "Prizes — Decentralize AI Hackathon by HackerNoon",
    description:
      "$51,750+ prize pool + $35,000 in Nosana AI compute credits for participants. Open globally.",
    images: ["/og-image.jpg"],
  },
};

export default function Prizes() {
  return (
    <>
      {/* HERO — count-up baked in */}
      <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
          <HeroCellBackground />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-full blur-[120px] bg-[radial-gradient(ellipse,#00ff8826_0%,transparent_70%)]" />
          <div className="absolute top-1/2 left-1/4 w-[320px] h-[320px] rounded-full blur-[110px] bg-[radial-gradient(ellipse,#00b4ff14_0%,transparent_70%)]" />
          <div className="absolute top-1/2 right-1/4 w-[280px] h-[280px] rounded-full blur-[110px] bg-[radial-gradient(ellipse,#ff6b3514_0%,transparent_70%)]" />
        </div>

        <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10 isolate max-w-[1100px] mx-auto">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-6 px-4 py-2 rounded-full border bg-[#00ff88]/8 border-[#00ff88]/20 text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse inline-block" />
            All you can win
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] pb-1 shimmer-text mb-6">
            Total Prize Pool
          </h1>

          {/* The big count-up — IS the hero now */}
          <PrizePoolCount
            target={51750}
            className="block font-funnel-display font-black leading-[0.95] tracking-tighter text-[#00ff88] text-glow-green text-[clamp(3.25rem,11vw,7.5rem)] mb-4"
          />
          <p className="font-mono text-xs sm:text-sm text-neutral-400">
            {HACKATHON_TIMELINE.label}
          </p>
        </div>
      </section>

      {/* FOR WINNERS */}
      <section id="winners" className="scroll-mt-24 py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] text-[#00ff88] mb-3">
              For Winners
            </p>
            <h2 className="text-3xl md:text-4xl text-white mb-3">
              Premium Packages from Sponsors
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Top-scoring projects compete for compute credits, AR cash prizes, MEXC token rewards across both rounds and for the grand prize - the DecentralizeAI.tech domain & its open source codebase from HackerNoon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:max-w-5xl lg:mx-auto">
            {WINNER_PRIZES.map((prize) => (
              <PrizeSponsorCard key={`winner-${prize.sponsor}`} prize={prize} />
            ))}
          </div>
        </div>
      </section>

      {/* FOR PARTICIPANTS */}
      <section
        id="participants"
        className="scroll-mt-24 py-16 md:py-20"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] text-[#00ff88] mb-3">
              For Participants
            </p>
            <h2 className="text-3xl md:text-4xl text-white mb-3">
              Free credits for every eligible submission
            </h2>
            <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Build with decentralized compute and permanent storage from day one — no waiting
              until the final round.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:max-w-5xl lg:mx-auto">
            {PARTICIPANT_PRIZES.map((prize) => (
              <PrizeSponsorCard key={`participant-${prize.sponsor}`} prize={prize} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — clean 4-tile grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-10 md:mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] text-[#00ff88] mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl text-white">Prize distribution at a glance</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {PRIZE_DISTRIBUTION.map((item, i) => (
              <div
                key={item.title}
                className="group relative rounded-2xl border border-[#ffffff]/10 bg-[#040c19]/60 backdrop-blur-[16px] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff88]/30"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8818_0%,transparent_70%)]" aria-hidden />
                <div className="relative">
                  <span className="font-funnel-display text-3xl md:text-4xl font-black text-[#00ff88]/30 group-hover:text-[#00ff88]/60 transition-colors duration-300 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-funnel-display text-lg text-white font-semibold mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — drive straight into participation */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="relative rounded-3xl border border-[#00ff88]/25 bg-[linear-gradient(180deg,#00ff8810_0%,#00ff8804_60%,transparent_100%)] backdrop-blur-[20px] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_50%_-10%,#00ff8833_0%,transparent_70%)]" aria-hidden />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/60 to-transparent" aria-hidden />

            <div className="relative grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center px-6 md:px-12 py-12 md:py-16">
              {/* Copy */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] mb-5 px-3 py-1.5 rounded-full border bg-[#00ff88]/10 border-[#00ff88]/25 text-[#00ff88]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                  Submissions Open
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-funnel-display leading-[1.05] tracking-tight mb-4">
                  Your shot at{" "}
                  <span className="text-[#00ff88] text-glow-green tabular-nums">
                    {TOTAL_PRIZE_POOL}
                  </span>
                  <br />
                  starts with one post.
                </h2>
                <p className="text-neutral-400 text-sm md:text-base max-w-xl mx-auto md:mx-0 leading-relaxed">
                  Publish your decentralized AI piece on HackerNoon with the right tags and you&apos;re
                  in. Two rounds, multiple sponsor prizes, real money and credits on the line.
                </p>
              </div>

              {/* Action stack */}
              <div className="flex flex-col gap-3 md:items-stretch">
                <div className="group flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
                  <Link
                    href="/blog-generator"
                    className="hero-cta flex-1 inline-flex items-center justify-center gap-2 font-funnel-display font-semibold text-base px-7 py-4 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black"
                  >
                    <span>Start Your Submission</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1"><i className="hn hn-arrow-right-solid text-center inline-block"></i></span>
                  </Link>
                  <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
                </div>
                <div className="group flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
                  <Link
                    href="/faq"
                    className="hero-cta flex-1 inline-flex items-center justify-center gap-2 font-funnel-display font-semibold text-base px-7 py-4 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black"
                  >
                    <span>How It Works</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1"><i className="hn hn-arrow-right-solid text-center inline-block"></i></span>
                  </Link>
                  <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500 mt-1 text-center">
                  Free to enter · Open globally
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

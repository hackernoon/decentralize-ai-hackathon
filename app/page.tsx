import Link from "next/link";
import type { Metadata } from "next";
import StructuredData from "./components/StructuredData";
import HeroRotatingMessage from "./components/HeroRotatingMessage";
import HeroMolecule from "./components/HeroMolecule";
import { articleLinks } from "@/lib/articleLinks";
import { SPONSORS } from "@/lib/sponsors";
import { slugToLabel, tagUrl, HACKATHON_TAGS, SPONSOR_TAGS } from "@/lib/tags";
import { TOTAL_PRIZE_POOL, PARTICIPANT_AI_CREDITS_POOL, HACKATHON_TIMELINE } from "@/lib/prizes";

export const metadata: Metadata = {
  title: {
    absolute: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
  },
  description: "Write about decentralized AI on HackerNoon and compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Two rounds, June 2026 - Feb 2027. Open globally.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
    description: "Write about decentralized AI on HackerNoon and compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Two rounds, June 2026 - Feb 2027. Open globally.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
      },
    ],
  },
  twitter: {
    title: "Decentralize AI Hackathon by HackerNoon — Win from $51,750+ Prize Pool + $35,000 in AI Compute Credits for Participants",
    description: "Write about decentralized AI on HackerNoon and compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants. Two rounds, June 2026 - Feb 2027.",
    images: ["/og-image.jpg"],
  },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "Decentralize AI Hackathon",
      url: SITE_URL,
      description: "Building the future of decentralized artificial intelligence.",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#org`,
      name: "HackerNoon",
      url: "https://hackernoon.com",
      logo: "https://hackernoon.imgix.net/hn-logo.png",
      sameAs: [
        "https://x.com/hackernoon",
        "https://github.com/hackernoon",
        "https://www.linkedin.com/company/hackernoon",
      ],
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}#event`,
      name: "Decentralize AI Hackathon by HackerNoon",
      description:
        "Global online hackathon: write about decentralized AI on HackerNoon and compete for a $51,750+ prize pool plus $35,000 in AI compute credits for participants.",
      url: SITE_URL,
      image: [`${SITE_URL}/og-image.jpg`],
      startDate: "2026-06-01",
      endDate: "2027-02-27",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: {
        "@type": "VirtualLocation",
        url: SITE_URL,
      },
      organizer: { "@id": `${SITE_URL}#org` },
      sponsor: [
        { "@type": "Organization", name: "Nosana", url: "https://nosana.io" },
        { "@type": "Organization", name: "Arweave", url: "https://arweave.org" },
        { "@type": "Organization", name: "MEXC", url: "https://www.mexc.co" },
      ],
      offers: {
        "@type": "Offer",
        name: "Free Entry",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/blog-generator`,
        validFrom: "2026-06-01",
      },
    },
  ],
};

const NOSANA_TAGS = SPONSOR_TAGS.find((group) => group.sponsorName === "Nosana")?.tags ?? [];

export default function Home() {
  return (
    <>
      <StructuredData data={structuredData} />

      {/* HERO */}
      <section className="relative overflow-hidden isolate pt-24 sm:pt-14 md:pt-18 lg:pt-22 pb-14 sm:pb-20 md:pb-28">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0" aria-hidden>
          <HeroMolecule />
        </div>

        <div className="relative w-full min-h-[420px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[680px] flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 z-10">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border bg-[#052617] border-[#00ff88]/20 text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse inline-block shrink-0" />
            <span className="whitespace-nowrap">Submissions Open</span>
          </div>
          <h1 className="relative z-10 text-5xl md:text-6xl lg:text-8xl text-center shimmer-text max-w-[95vw]">
            Decentralize AI
          </h1>
          <p className="relative z-10 mt-8 sm:mt-12 max-w-4xl text-center text-xs sm:text-base leading-relaxed text-white">
            The <span className="font-semibold">Decentralize AI Hackathon by HackerNoon</span> is built around a simple idea: the future of AI should be open, transparent, and owned by its users. We&rsquo;re inviting developers, researchers, and startups to discuss and build the infrastructure powering decentralized AI, from distributed compute networks and open inference systems to permanent data storage, verifiable AI, and sovereignty-focused tooling. Participants will have access to compute resources, decentralized storage, and ecosystem support to help bring their ideas to life and run compute-intensive AI applications, from AI agents and inference workloads to rendering and model-serving systems. <span className="font-semibold">Let&rsquo;s Decentralize AI!</span>
          </p>
          <div className="relative z-10 mt-6 sm:mt-10 group flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="font-mono text-2xl sm:text-xl font-bold text-[#00ff88]/80 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88] select-none">|</span>
            <Link
              href="/blog-generator"
              className="hero-cta inline-flex items-center justify-center gap-2 font-funnel-display font-black text-lg sm:text-base min-h-[56px] sm:min-h-[44px] px-12 sm:px-8 md:px-14 py-4 sm:py-4 rounded-none transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] border-y-0 border-l-2 border-r-2 border-[#5cffb2] text-[#03170f] shadow-[0_0_24px_rgba(0,255,136,0.35)] hover:bg-[linear-gradient(135deg,#6dffbf_0%,#00ff88_100%)] hover:shadow-[0_0_34px_rgba(0,255,136,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020812] active:scale-[0.98]"
            >
              BLOG IT
            </Link>
            <span className="font-mono text-2xl sm:text-xl font-bold text-[#00ff88]/80 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88] select-none">|</span>
          </div>
        </div>

        {/* PRIZES & SPONSORS — nested section */}
        <section className="relative z-10 sm:pt-2 md:pt-6" aria-label="Prize pool and sponsors">
          <div className="z-10 px-3 sm:px-4 md:px-8 flex justify-center">
          <div className="w-full max-w-[1400px] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[#020812]/40 backdrop-blur-[16px] backdrop-saturate-[180%] border border-[#00ff88]/10 mx-1 sm:mx-0">

            {/* ── Prize row ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#00ff88]/8">
              {[
                { value: TOTAL_PRIZE_POOL, label: "Total Prize Pool", labelNode: null, cta: null },
                {
                  value: PARTICIPANT_AI_CREDITS_POOL,
                  label: "Worth of AI Credits for Participants",
                  labelNode: null,
                  cta: { href: "/claim/nosana", label: "Claim Credits Now" },
                },
                { value: null, label: "This Website + Domain", labelNode: (
                  <>
                    This Website
                    {" (Open Source)"}
                     {" + "}
                    <br />
                    DecentralizeAi.tech
                    {" Domain"}
                  </>
                ), cta: null },
              ].map((p) => (
                <div
                  key={p.label}
                  className="group relative flex flex-col items-center justify-center gap-1 sm:gap-1.5 py-5 sm:py-7 md:py-10 px-3 sm:px-4 md:px-6 overflow-hidden transition-all duration-300 bg-[#00ff88]/4 hover:-translate-y-0.5 hover:bg-[#00ff88]/10"
                >
                  {/* ambient hover glow */}
                  <div className="absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8810_0%,transparent_70%)]" aria-hidden />

                  {/* value */}
                  <div className="relative text-3xl lg:text-4xl font-black font-funnel-display leading-none tracking-tight text-[#00ff88] text-glow-green transition-all duration-300 group-hover:scale-[1.05] group-hover:text-[#6dffbf]">
                    {p.value !== null
                      ? p.value
                      : <i className="hn hn-globe text-3xl lg:text-4xl inline-block" aria-hidden />
                    }
                  </div>

                  {/* label */}
                  <div className="relative text-sm font-bold text-white mt-0.5 sm:mt-1 leading-snug text-center transition-colors duration-300 group-hover:text-[#d5ffe9]">
                    {p.labelNode ?? p.label}
                  </div>

                  {p.cta && (
                    <Link
                      href={p.cta.href}
                      className="relative z-10 mt-2 sm:mt-2.5 inline-flex items-center justify-center font-funnel-display font-semibold text-[10px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-none transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] border border-[#5cffb2]/70 text-[#03170f] shadow-[0_0_10px_rgba(0,255,136,0.2)] hover:bg-[linear-gradient(135deg,#6dffbf_0%,#00ff88_100%)] hover:shadow-[0_0_16px_rgba(0,255,136,0.35)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ff88] active:scale-[0.98]"
                    >
                      {p.cta.label}
                    </Link>
                  )}

                </div>
              ))}
            </div>

            {/* ── Sponsor strip ── */}
            <div className="px-4 sm:px-5 md:px-8 pt-0 pb-6 sm:pb-8 md:pb-10">
              {/* divider with label */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7 md:mb-9">
                <div className="flex-1 min-w-0 h-px bg-[#00ff88]/8 -mt-2"/>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-neutral-500 shrink-0 -mt-2">
                  Sponsored by
                </span>
                <div className="flex-1 min-w-0 h-px bg-[#00ff88]/8 -mt-2" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-24">
                {SPONSORS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-90 hover:opacity-100 active:opacity-100 transition-opacity duration-300 min-h-[44px] flex items-center cursor-pointer"
                  >
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="h-10 md:h-14 w-auto object-contain max-h-12 sm:max-h-none"
                    />
                  </a>
                ))}
              </div>
            </div>

            </div>
          </div>
        </section>
      </section>

      {/* HOW TO ENTER — THREE STEPS */}
      <section className="py-14 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">

          <div className="text-center mb-10 sm:mb-14">
                <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] pb-1 shimmer-text mb-6 max-w-5xl mx-auto">
                  Write a Blog Post on HackerNoon to Enter to Win
                </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-19 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/20 to-[#00ff88]/20" aria-hidden />

            <div className="space-y-8 md:space-y-10">

              {/* Step 01 — WRITE */}
              <article className="relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 border border-[#ffffff]/10 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/20">
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-5 md:gap-7 mb-6">
                    <span className="flex items-center justify-center w-18 h-18 rounded-2xl font-funnel-display text-2xl md:text-3xl font-bold shrink-0 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">
                      01
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1 rounded-full text-[#00ff88] border border-[#00ff88]/20 bg-[#00ff88]/5 self-start">
                        Write
                      </span>
                      <h3 className="text-xl md:text-2xl text-white leading-snug">
                        Share Your Idea, Architecture, or Early Progress as You Build
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <a
                      href="https://hackernoon.com/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/card rounded-xl md:rounded-2xl border border-[#ffffff]/6 bg-[#ffffff]/3 p-5 md:p-6 text-left transition-all duration-200 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <i className="hn hn-pen-solid text-2xl text-[#00ff88]/75 group-hover/card:text-[#00ff88] transition-colors" aria-hidden />
                        <h4 className="text-base md:text-lg font-funnel-display text-white group-hover/card:text-[#00ff88] transition-colors">
                          Already have an idea?
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Open a blank HackerNoon draft and use any of the tags below to enter the contest.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[#00ff88]">
                        Start a Draft
                        <i className="hn hn-arrow-right-solid text-sm" aria-hidden />
                      </span>
                    </a>

                    <Link
                      href="/blog-generator"
                      className="group/card rounded-xl md:rounded-2xl border border-[#00ff88]/25 bg-[#00ff88]/5 p-5 md:p-6 text-left transition-all duration-200 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <i className="hn hn-sparkles-solid text-2xl text-[#00ff88]/75 group-hover/card:text-[#00ff88] transition-colors" aria-hidden />
                        <h4 className="text-base md:text-lg font-funnel-display text-white group-hover/card:text-[#00ff88] transition-colors">
                          Not sure where to start?
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Use our Blog Generator for guided prompts, an AI-assisted outline, and a ready-to-publish draft.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[#00ff88]">
                        Generate My Blog
                        <i className="hn hn-arrow-right-solid text-sm" aria-hidden />
                      </span>
                    </Link>
                  </div>

                  <div className="relative mt-6 md:mt-8 overflow-hidden rounded-xl md:rounded-2xl border border-[#00ff88]/25 bg-gradient-to-br from-[#00ff88]/10 via-[#00ff88]/4 to-transparent">
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_120%_at_0%_50%,#00ff8818_0%,transparent_60%)]" aria-hidden />
                    <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t border-l border-[#00ff88]/60" aria-hidden />
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b border-r border-[#00ff88]/60" aria-hidden />

                    <div className="relative flex items-start gap-4 md:gap-5 p-5 md:p-6">
                      <i className="hn hn-bolt-solid text-xl md:text-2xl text-[#00ff88] shrink-0 mt-0.5 inline-block" aria-hidden />

                      <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                        <span className="font-mono uppercase tracking-[0.15em] text-[#00ff88]/90 text-xs">Pro tip:</span>{" "}
                        Tackle at least one layer of open AI infrastructure in your submission — <span className="text-[#00ff88]">decentralized GPU orchestration</span>, <span className="text-[#00ff88]">permanent model storage</span>, <span className="text-[#00ff88]">verifiable AI</span>, <span className="text-[#00ff88]">open inference</span>, or <span className="text-[#00ff88]">data sovereignty</span>. Concept-stage ideas with clear technical direction are just as welcome as shipped products.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              {/* Step 02 — TAG (grouped by sponsor track) */}
              <article className="relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 border border-[#ffffff]/10 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/20">
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-5 md:gap-7 mb-6">
                    <span className="flex items-center justify-center w-18 h-18 rounded-2xl font-funnel-display text-2xl md:text-3xl font-bold shrink-0 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">
                      02
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1 rounded-full text-[#00ff88] border border-[#00ff88]/20 bg-[#00ff88]/5 self-start">
                        Tag
                      </span>
                      <h3 className="text-xl md:text-2xl text-white leading-snug">
                        Publish Your Blog With Any of These Tags
                      </h3>
                    </div>
                  </div>

                  <div className="rounded-xl md:rounded-2xl border border-[#ffffff]/6 bg-[#ffffff]/2 p-5 sm:p-6 md:p-8">
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                      {[...HACKATHON_TAGS].sort().map((slug) => (
                        <a
                          key={slug}
                          href={tagUrl(slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-mono text-sm px-4 py-1.5 rounded-full border border-[#ffffff]/10 bg-[#ffffff]/3 text-neutral-300 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/8 hover:text-[#00ff88] transition-all duration-200"
                        >
                          {slugToLabel(slug)}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* Step 03 — BUILD & WIN NOSANA CREDITS */}
              <article className="relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 border border-[#ffffff]/10 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/20">
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-5 md:gap-7 mb-6">
                    <span className="flex items-center justify-center w-18 h-18 rounded-2xl font-funnel-display text-2xl md:text-3xl font-bold shrink-0 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">
                      03
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1 rounded-full text-[#00ff88] border border-[#00ff88]/20 bg-[#00ff88]/5 self-start">
                        Build
                      </span>
                      <h3 className="text-xl md:text-2xl text-white leading-snug">
                        Build &amp; Win Nosana Credits
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:gap-5">
                    <Link
                      href="/claim/nosana"
                      className="group/card rounded-xl md:rounded-2xl border border-[#00ff88]/25 bg-[#00ff88]/5 p-5 md:p-6 text-left transition-all duration-200 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/10"
                    >
                      <h4 className="text-base md:text-lg font-funnel-display text-white group-hover/card:text-[#00ff88] transition-colors mb-3 leading-snug">
                        First 500 participants get <span className="text-[#00ff88]">$70 in Nosana credits</span>
                      </h4>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                        Claim Nosana compute credits and start building real decentralized AI systems. Use the credits to run and test GPU-heavy workloads like agents, inference, model serving, and other AI infrastructure.
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[#00ff88]">
                        Claim Nosana Credits
                        <i className="hn hn-arrow-right-solid text-sm" aria-hidden />
                      </span>
                    </Link>

                    <div className="group/card rounded-xl md:rounded-2xl border border-[#ffffff]/6 bg-[#ffffff]/3 p-5 md:p-6 text-left transition-all duration-200 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/5">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1 rounded-full text-[#00ff88] border border-[#00ff88]/20 bg-[#00ff88]/5 self-start inline-flex mb-3">
                        15 winners
                      </span>
                      <h4 className="text-base md:text-lg font-funnel-display text-white group-hover/card:text-[#00ff88] transition-colors mb-3 leading-snug">
                        Win an additional <span className="text-[#00ff88]">$450 prize pool</span>
                      </h4>
                      <p className="text-sm text-neutral-400 leading-relaxed">
                      To qualify for an additional $450 prize pool, publish a follow-up blog showing how you used the credits—share your build process, architecture, experiments, or results using Nosana tags.</p>
                      <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                        {NOSANA_TAGS.slice(0, 4).map((slug) => (
                          <a
                            key={slug}
                            href={tagUrl(slug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center font-mono text-sm px-4 py-1.5 rounded-full border border-[#ffffff]/10 bg-[#ffffff]/3 text-neutral-300 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/8 hover:text-[#00ff88] transition-all duration-200"
                          >
                            {slugToLabel(slug)}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </div>
      </section>

      {/* HACKATHON TIMELINE */}
      <section className="py-14 sm:py-20 md:py-28 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] pb-1 shimmer-text mb-5">
              Hackathon Timeline
            </h2>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
              Based on readership and quality,{" "}
              <Link
                href="/judges"
                className="text-[#00ff88] hover:text-[#6dffbf] underline decoration-[#00ff88]/30 hover:decoration-[#00ff88] underline-offset-4 transition-colors duration-200"
              >
                judges
              </Link>{" "}
              create a shortlist and then vote on top HackerNoon posts during the period. Half the prize pool will be awarded in each round.
            </p>
            <p className="mt-8 text-neutral-400 text-base md:text-lg font-mono tracking-tight">
              {HACKATHON_TIMELINE.launch} - {HACKATHON_TIMELINE.end}
            </p>
          </div>

          {/* horizontal timeline track */}
          <div className="relative">

            {/* dots row + connecting line — desktop only */}
            <div className="hidden md:grid grid-cols-2 gap-6 mb-8 relative">
              {/* line runs from center of col-1 to center of col-2 */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#00ff88] to-[#00ff88]/40" aria-hidden />
              <div className="absolute top-1/2 -translate-y-1/2 left-1/4 right-1/4 h-[3px] -mt-px bg-gradient-to-r from-[#00ff88]/25 to-transparent blur-[2px]" aria-hidden />
              {/* dot 1 — filled (active) */}
              <div className="flex justify-center relative z-10">
                <div className="w-4 h-4 rounded-full bg-[#00ff88] border-2 border-[#00ff88] shadow-[0_0_14px_#00ff88aa]" />
              </div>
              {/* dot 2 — hollow (upcoming) */}
              <div className="flex justify-center relative z-10">
                <div className="w-4 h-4 rounded-full border-2 border-[#00ff88]/60 bg-[#020812] shadow-[0_0_10px_#00ff8855]" />
              </div>
            </div>

            {/* round cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {HACKATHON_TIMELINE.rounds.map((round, i) => {
                const isActive = i === 0;
                return (
                  <div
                    key={round.name}
                    className={`group relative rounded-2xl md:rounded-3xl p-7 md:p-9 lg:p-11 overflow-hidden transition-all duration-300 backdrop-blur-[16px] backdrop-saturate-[180%] border hover:-translate-y-0.5 ${
                      isActive
                        ? "bg-[#00ff88]/10 border-[#00ff88]/30 shadow-[0_0_32px_rgba(0,255,136,0.08)]"
                        : "bg-[#00ff88]/4 border-[#00ff88]/10 hover:bg-[#00ff88]/10 hover:border-[#00ff88]/30"
                    }`}
                  >
                    {/* ambient radial glow */}
                    <div
                      className={`absolute inset-0 pointer-events-none transition-all duration-500 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8822_0%,transparent_70%)] ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      aria-hidden
                    />

                    {/* giant translucent number — poster watermark, bottom-right, partially clipped */}
                    <span
                      aria-hidden
                      className={`absolute -bottom-10 md:-bottom-14 lg:-bottom-20 -right-2 md:-right-4 font-funnel-display text-[8rem] md:text-[10rem] lg:text-[12rem] font-black tabular-nums leading-none select-none pointer-events-none transition-colors duration-500 ${
                        isActive ? "text-[#00ff88]/15" : "text-[#00ff88]/8 group-hover:text-[#00ff88]/15"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex flex-col items-start gap-4 md:gap-5">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-[#00ff88]/25 bg-[#00ff88]/8 text-[#00ff88]">
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse shrink-0" aria-hidden />}
                        {round.period}
                      </span>
                      <h3 className="font-funnel-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] pb-1 text-white">
                        {round.name}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* mobile vertical spine */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/40 to-[#00ff88]/10 pointer-events-none" aria-hidden />
          </div>

          {/* Multi-entry callout */}
          <div className="mt-10 md:mt-14 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-8 sm:w-12 bg-[#00ff88]/40 shrink-0" aria-hidden />
            <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#00ff88] text-center">
              Enter as many times as you want — in either round
            </p>
            <span className="h-px w-8 sm:w-12 bg-[#00ff88]/40 shrink-0" aria-hidden />
          </div>
        </div>
      </section>

      {/* PROBLEM vs SOLUTION */}
      <section className="py-14 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">The landscape</p>
            <h2 className="text-3xl md:text-4xl  text-white">Problem vs Solution</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="rounded-2xl p-8 md:p-10 flex flex-col gap-7 bg-red-500/5 backdrop-blur-[24px] border border-red-500/20">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1.5 rounded-full text-red-400 border border-red-500/30 bg-red-500/10">
                  The Problem
                </span>
                <h3 className="text-xl md:text-2xl  text-neutral-100 mt-5 mb-4 leading-snug">
                  Centralized AI Concentrates Power
                </h3>
                <blockquote className="mt-5 flex items-stretch gap-5">
                  <div className="w-px shrink-0 bg-red-500/30" />
                  <div>
                    <p className="text-sm md:text-base font-medium text-neutral-300 leading-relaxed">
                      &ldquo;Not going to beat centralized AI with more centralized AI.&rdquo;
                    </p>
                    <cite className="mt-2 not-italic flex items-center gap-1.5">
                      <span className="font-mono text-xs text-red-400 uppercase tracking-[0.15em]">Emad Mostaque</span>
                    </cite>
                  </div>
                </blockquote>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "business", title: "Big Tech Monopoly", body: "Google, Microsoft, Amazon, and Meta control AI infrastructure, data, and distribution." },
                  { icon: "exclamation-triangle-solid", title: "Data Exploitation", body: "Your data trains their models. You get nothing. They profit billions." },
                  { icon: "tech-companies", title: "Centralized Control", body: "One company decides what AI can and cannot do. Censorship. Surveillance. Control." },
                ].map((c) => (
                  <div key={c.title}
                    className="flex items-start gap-4 rounded-xl p-5 transition-all duration-200 hover:brightness-110 border border-red-500/10 bg-red-500/5">
                    <i className={`hn hn-${c.icon} text-2xl shrink-0 mt-0.5 text-red-400 inline-block`} aria-hidden />
                    <div>
                      <h4 className=" text-red-300 text-base leading-snug">{c.title}</h4>
                      <p className="text-sm text-neutral-400 mt-1.5 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="rounded-2xl p-8 md:p-10 flex flex-col gap-7 bg-[#00ff88]/4 backdrop-blur-[24px] border border-[#00ff88]/20">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1.5 rounded-full text-[#00ff88] border border-[#00ff88]/30 bg-[#00ff88]/8">
                  The Solution
                </span>
                <h3 className="text-xl md:text-2xl  text-neutral-100 mt-5 mb-4 leading-snug">
                  Networks Without Single Owners
                </h3>
                <blockquote className="mt-5 flex items-stretch gap-5">
                  <div className="w-px shrink-0 bg-[#00ff88]/30" />
                  <div>
                    <p className="text-sm md:text-base font-medium text-neutral-300 leading-relaxed">
                      &ldquo;If you can run the network for money without a single entity in charge... you could make any network decentralized.&rdquo;
                    </p>
                    <cite className="mt-2 not-italic">
                      <span className="font-mono text-xs text-[#00ff88] uppercase tracking-[0.15em]">Naval Ravikant</span>
                    </cite>
                  </div>
                </blockquote>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "chart-network-solid", title: "Decentralized Infrastructure", body: "No single point of failure. No single entity in control. Community-owned networks." },
                  { icon: "cybersecurity", title: "Data Sovereignty", body: "You own your data. You control access. You decide how AI models use it." },
                  { icon: "users-solid", title: "Community Governance", body: "Democratic decision-making. Open source. Transparent. No corporate overlords." },
                ].map((c) => (
                  <div key={c.title}
                    className="flex items-start gap-4 rounded-xl p-5 transition-all duration-200 hover:brightness-110 border border-[#00ff88]/10 bg-[#00ff88]/4">
                    <i className={`hn hn-${c.icon} text-2xl shrink-0 mt-0.5 inline-block text-[#00ff88]`} aria-hidden />
                    <div>
                      <h4 className=" text-base leading-snug text-[#00ff88]">{c.title}</h4>
                      <p className="text-sm text-neutral-400 mt-1.5 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - The Decentralized AI Stack */}
      <section className="py-14 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">How it works</p>
            <h2 className="text-3xl md:text-4xl  text-white mb-4 leading-tight">The Decentralized AI Stack</h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              Three layers that make open, community-owned AI possible-from compute to data to governance.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-19 top-0 bottom-0 w-px bg-gradient-to-b from-[#00ff88]/20 to-[#00ff88]/20" aria-hidden />

            <div className="space-y-8 md:space-y-10">
              {[
                {
                  tag: "Compute",
                  title: "How Decentralized AI Runs",
                  quote: { text: "Decentralization will out-scale centralized AI-diverse techniques co-evolving beats one-size-fits-all.", author: "Janet Adams" },
                  cards: [
                    { icon: "chart-network-solid", title: "Distributed Compute Networks", body: "Network GPUs across independent operators-no hyperscaler dependency." },
                    { icon: "home-solid", title: "Edge & Local Inference", body: "Run AI on your device when it matters: private, offline-capable, resilient." },
                    { icon: "code-solid", title: "Open Inference Protocols", body: "No single API chokepoint. Route, swap providers, or self-host anytime." },
                  ],
                },
                {
                  tag: "Data",
                  title: "Ownership, Training & Exit",
                  quote: { text: "Someone will control your data, so it might as well be you.", author: "David Johnston" },
                  cards: [
                    { icon: "share-solid", title: "Open-Weight Models", body: "Forkable, inspectable models-if you disagree, you can exit and build." },
                    { icon: "management", title: "Federated Training", body: "Improve models without pooling raw data-privacy by design." },
                    { icon: "cloud", title: "Data Ownership & Portability", body: "Users control access and reuse. Your data doesn't become the platform's." },
                  ],
                },
                {
                  tag: "Governance",
                  title: "Who Decides & Who Gets Paid",
                  quote: { text: "Leaving AGI in corporate or military hands could plunge humanity into chaos.", author: "Ben Goertzel" },
                  cards: [
                    { icon: "eye-solid", title: "Transparent Governance", body: "Rules and upgrades are visible and contestable-no silent policy shifts." },
                    { icon: "wallet-solid", title: "Contributor-Aligned Economics", body: "Value flows to compute, data, and maintenance contributors-not middlemen." },
                    { icon: "grid-solid", title: "Composable AI Interfaces", body: "No default assistant monopoly. Agents and apps stay modular and replaceable." },
                  ],
                },
              ].map((group, i) => (
                <article
                  key={group.tag}
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 border border-[#ffffff]/10 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/20"
                >
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="flex items-center gap-5 md:gap-7 mb-6">
                      <span className="flex items-center justify-center w-18 h-18 rounded-2xl font-funnel-display text-2xl md:text-3xl font-bold shrink-0 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-xs uppercase tracking-[0.18em] px-3 py-1 rounded-full text-[#00ff88] border border-[#00ff88]/20 bg-[#00ff88]/5 self-start">
                          {group.tag}
                        </span>
                        <h3 className="text-xl md:text-2xl text-white leading-snug">
                          {group.title}
                        </h3>
                      </div>
                    </div>

                    <blockquote className="mb-8 flex items-stretch gap-6">
                      <div className="w-px shrink-0 bg-[#00ff88]/30" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm md:text-base font-medium text-neutral-300 leading-relaxed">
                          &ldquo;{group.quote.text}&rdquo;
                        </p>
                        <cite className="mt-2 not-italic block">
                          <span className="font-mono text-xs text-[#00ff88] uppercase tracking-[0.15em]">{group.quote.author}</span>
                        </cite>
                      </div>
                    </blockquote>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                      {group.cards.map((card) => (
                        <div
                          key={card.title}
                          className="group/card rounded-xl md:rounded-2xl p-5 md:p-6 transition-all duration-200 border border-[#ffffff]/6 bg-[#ffffff]/3 hover:border-[#00ff88]/20 hover:bg-[#00ff88]/5"
                        >
                          <i
                            className={`hn hn-${card.icon} text-2xl md:text-3xl mb-3 inline-block transition-colors text-[#00ff88]/75 group-hover/card:text-[#00ff88]`}
                            aria-hidden
                          />
                          <h4 className="text-neutral-100 text-base mb-2 leading-snug">{card.title}</h4>
                          <p className="text-sm text-neutral-400 leading-relaxed">{card.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="py-14 sm:py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-10 sm:mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">Reading room</p>
            <h2 className="text-3xl md:text-4xl text-white">Can we actually decentralize AI?</h2>
          </div>

          <div className="rounded-2xl overflow-hidden bg-[#ffffff]/3 backdrop-blur-[20px] border border-[#ffffff]/10">
            <ul className="list-none divide-y divide-[#ffffff]/6">
              {articleLinks.map((article) => (
                <li key={article.url}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-4 px-5 md:px-6 transition-colors cursor-pointer hover:bg-[#00ff88]/4"
                  >
                    <span className="text-base text-neutral-300 group-hover:text-[#00ff88] transition-colors leading-snug">
                      {article.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://hackernoon.com/search"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-4 flex justify-center border-t border-[#ffffff]/6 bg-[#ffffff]/3 hover:bg-[#00ff88]/10 font-mono text-sm font-medium transition-colors cursor-pointer text-[#00ff88] hover:text-[#00cc70]"
            >
              Browse HackerNoon
            </a>
          </div>
        </div>
      </section>

      {/* David's quote */}
      <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
        <a
          href="https://hackernoon.com/preview/69fcdbe529f841b4ddb65f14"
          target="_blank"
          rel="noopener noreferrer"
          className="group block max-w-4xl mx-auto relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-4 focus-visible:ring-offset-[#020812]"
        >
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ff88] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00ff88] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00ff88] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ff88] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#00ff8812_0%,transparent_70%)] transition-all duration-500 group-hover:bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,#00ff8822_0%,transparent_70%)]" aria-hidden />

          <div className="relative px-6 sm:px-10 md:px-16 py-12 sm:py-14 md:py-20 text-center">
            <blockquote>
              <p className="text-2xl sm:text-3xl md:text-5xl font-funnel-display tracking-relaxed text-white leading-tight transition-colors duration-300 group-hover:text-[#d5ffe9]">
                &ldquo;Buidl something<br className="hidden md:block" /> worth blogging about.&rdquo;
              </p>
              <footer className="mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-[#00ff88]/40 transition-all duration-300 group-hover:bg-[#00ff88] group-hover:w-14" />
                <cite className="not-italic font-mono text-sm text-[#00ff88] tracking-widest uppercase inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-[#6dffbf]">
                  David Smooke
                </cite>
                <span className="h-px w-10 bg-[#00ff88]/40 transition-all duration-300 group-hover:bg-[#00ff88] group-hover:w-14" />
              </footer>
            </blockquote>
          </div>
        </a>
      </div>
    </>
  );
}

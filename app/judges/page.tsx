import type { Metadata } from "next";
import Link from "next/link";
import HeroCellBackground from "@/app/components/HeroCellBackground";
import JudgeCard from "@/app/components/JudgeCard";
import JudgeAnnouncementCard from "@/app/components/JudgeAnnouncementCard";
import { JUDGES } from "@/lib/judges";

export const metadata: Metadata = {
  title: "Judges — Expert Panel for the 2026 Hackathon — Expert voices from the decentralized AI community",
  description:
    "Meet the expert panel judging the Decentralize AI Hackathon by HackerNoon. Founders, researchers, and operators evaluating submissions on technical depth, novelty, and real-world impact.",
  keywords: [
    "Decentralize AI Hackathon judges",
    "AI hackathon judging panel",
    "decentralized AI experts",
    "hackathon judging criteria",
    "HackerNoon hackathon judges",
  ],
  alternates: { canonical: "/judges" },
  openGraph: {
    title: "Judges — Expert Panel for the 2026 Hackathon — Expert voices from the decentralized AI community",
    description:
      "Meet the expert panel of founders, researchers, and operators judging submissions on technical depth, novelty, and real-world impact.",
    url: "/judges",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Judges — Expert Panel for the 2026 Hackathon — Expert voices from the decentralized AI community",
      },
    ],
  },
  twitter: {
    title: "Judges — Decentralize AI Hackathon by HackerNoon — Expert voices from the decentralized AI community",
    description:
      "Meet the expert panel judging the Decentralize AI Hackathon by HackerNoon.",
    images: ["/og-image.jpg"],
  },
};

export default function Judges() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 md:pt-48 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
          <HeroCellBackground />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-[radial-gradient(ellipse,#00ff8820_0%,transparent_70%)]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-[radial-gradient(ellipse,#00b4ff14_0%,transparent_70%)]" />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px] bg-[radial-gradient(ellipse,#a855f712_0%,transparent_70%)]" />
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 text-center z-10 isolate">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] mb-6 px-4 py-2 rounded-full border bg-[#00ff88]/8 border-[#00ff88]/20 text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse inline-block" />
            The panel
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tight leading-[1.15] pb-1 shimmer-text mb-4">
            Judges
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed">
            Expert voices from the decentralized AI community.
          </p>
        </div>
      </section>

      {/* QUOTE + JUDGES PANEL */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {JUDGES.map((judge) => (
              <JudgeCard key={judge.linkedin || judge.name} judge={judge} />
            ))}
            <JudgeAnnouncementCard />
          </div>
        </div>
      </section>

      {/* SCORING RUBRIC + CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">Scoring rubric</span>
            <h2 className="text-3xl md:text-4xl text-white mt-2">What judges look for</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { num: "01", title: "Deep Technical Understanding", body: "Show you know the technology, not just the hype. Judges can smell surface-level takes." },
                { num: "02", title: "Novel Insights", body: "Bring fresh perspectives that challenge conventional thinking. Don't rehash what everyone already knows." },
                { num: "03", title: "Real-World Impact", body: "Address actual problems with actionable solutions. Theory is great; impact is better." },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 border border-[#ffffff]/8 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-funnel-display text-base md:text-lg text-[#00ff88] tabular-nums shrink-0 mt-1">{item.num}</span>
                    <div>
                      <h3 className="text-neutral-100 text-lg md:text-xl mb-2 leading-snug group-hover:text-[#00ff88] transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-2/3 mx-auto">
              {[
                { num: "04", title: "Research & Evidence", body: "Back up claims with data, papers, and case studies. Specifics beat generalities every time." },
                { num: "05", title: "Clear Communication", body: "Make complex ideas accessible and engaging. If experts struggle to read it, it won't win." },
              ].map((item) => (
                <div
                  key={item.num}
                  className="group relative rounded-2xl p-6 md:p-8 transition-all duration-300 border border-[#ffffff]/8 bg-[#ffffff]/3 backdrop-blur-[20px] hover:border-[#00ff88]/30 hover:bg-[#00ff88]/5"
                >
                  <div className="flex items-start gap-5">
                    <span className="font-funnel-display text-base md:text-lg text-[#00ff88] tabular-nums shrink-0 mt-1">{item.num}</span>
                    <div>
                      <h3 className="text-neutral-100 text-lg md:text-xl mb-2 leading-snug group-hover:text-[#00ff88] transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm md:text-base text-neutral-400 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl p-5 md:p-6 border border-[#00ff88]/20 bg-[#00ff88]/6 backdrop-blur-[20px] flex items-start gap-4">
              <i className="hn hn-bolt-solid text-xl text-[#00ff88] shrink-0 mt-0.5 inline-block" aria-hidden />
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-mono text-base uppercase tracking-[0.15em] text-[#00ff88] font-bold">Pro tip:</span>
                <span className="text-sm md:text-base text-neutral-300 leading-relaxed">
                  Judges favor posts that cite <strong className="text-white">specific projects, papers, and people.</strong> Vague generalizations won&apos;t cut it.
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-14">
            <div className="group inline-flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
              <Link
                href="/blog-generator"
                className="hero-cta inline-flex items-center gap-2 font-funnel-display font-semibold text-base px-6 sm:px-14 py-4 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black"
              >
                IMPRESS THE JUDGES
              </Link>
              <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

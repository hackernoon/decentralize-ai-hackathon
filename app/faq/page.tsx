import type { Metadata } from "next";
import Link from "next/link";
import HeroCellBackground from "@/app/components/HeroCellBackground";
import StructuredData from "@/app/components/StructuredData";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQ — How to Enter, Win & Claim Prizes",
  description:
    "FAQ for the Decentralize AI Hackathon by HackerNoon: eligibility, how to submit on HackerNoon, prize claims, judging criteria, deadlines, and Nosana compute credits.",
  keywords: [
    "Decentralize AI Hackathon FAQ",
    "how to enter AI hackathon",
    "HackerNoon submission rules",
    "hackathon judging criteria",
    "claim Nosana compute credits",
    "AI hackathon eligibility",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Decentralize AI Hackathon by HackerNoon",
    description:
      "Eligibility, submissions, judging, deadlines, and prize claims — everything you need to enter and win the Decentralize AI Hackathon.",
    url: "/faq",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FAQ — Decentralize AI Hackathon by HackerNoon",
      },
    ],
  },
  twitter: {
    title: "FAQ — Decentralize AI Hackathon by HackerNoon",
    description:
      "Eligibility, submissions, judging, deadlines, and prize claims for the Decentralize AI Hackathon.",
    images: ["/og-image.jpg"],
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <StructuredData data={faqStructuredData} />

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
            Support
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tight shimmer-text mb-4">
            FAQ
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed">
            Everything you need to know about participating and winning.
          </p>
        </div>
      </section>

      {/* CONTENT + CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="faq-item group rounded-2xl overflow-hidden bg-[#ffffff]/5 backdrop-blur-[20px] border border-[#ffffff]/6 open:border-[#00ff88]/20 transition-colors duration-200"
              >
                <summary className="flex justify-between items-center p-5 md:p-6 cursor-pointer list-none">
                  <span className="text-base md:text-lg text-neutral-100 pr-4">
                    {faq.question}
                  </span>
                  <span className="faq-icon text-xl md:text-2xl flex-shrink-0 font-mono tabular-nums text-[#00ff88] transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6 pt-1 border-t border-[#ffffff]/6">
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed">
                    {faq.answer
                      .split(/(DecentralizeAI\.tech|\$70 in Nosana GPU compute credits|Claim your free compute and storage credits)/g)
                      .map((part, i) => {
                        if (part === "DecentralizeAI.tech") {
                          return (
                            <a
                              key={i}
                              href="https://decentralizeai.tech"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#00ff88] transition-colors cursor-pointer hover:text-[#00cc70]"
                            >
                              {part}
                            </a>
                          );
                        }
                        if (
                          part === "$70 in Nosana GPU compute credits" ||
                          part === "Claim your free compute and storage credits"
                        ) {
                          return (
                            <Link
                              key={i}
                              href="/claim/nosana"
                              className="text-[#00ff88] transition-colors cursor-pointer hover:text-[#00cc70]"
                            >
                              {part}
                            </Link>
                          );
                        }
                        return part;
                      })}
                  </p>
                </div>
              </details>
            ))}

            <div className="rounded-2xl p-8 md:p-10 text-center bg-[#00ff88]/4 backdrop-blur-[20px] border border-[#00ff88]/20">
              <h2 className="text-xl md:text-2xl text-white mb-3">Still have questions?</h2>
              <p className="text-neutral-400 text-sm md:text-base mb-8 leading-relaxed">
                Reach out to us on{" "}
                <a
                  href="https://hackernoon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ff88] transition-colors cursor-pointer hover:text-[#00cc70]"
                >
                  HackerNoon
                </a>{" "}
                or jump start your submission by generating your blog post.
              </p>
              <div className="group inline-flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
                <Link
                  href="/blog-generator"
                  className="hero-cta inline-flex items-center gap-2 font-funnel-display font-semibold text-base px-6 sm:px-14 py-4 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black"
                >
                  GENERATE YOUR BLOG POST
                </Link>
                <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

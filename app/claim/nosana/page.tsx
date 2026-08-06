import HeroCellBackground from "@/app/components/HeroCellBackground";
import NosanaClaimForm from "@/app/components/NosanaClaimForm";

const requirements = [
  {
    icon: "badge-check-solid",
    title: "Valid AI Project Proposal",
    body: "Submit a clear, well-scoped AI-related project proposal that leverages decentralized infrastructure.",
  },
  {
    icon: "startups",
    title: "Deploy on Nosana",
    body: "Intend to deploy or test your AI workloads on the Nosana decentralized GPU network.",
  },
  {
    icon: "users-solid",
    title: "One Claim per Team",
    body: "A single representative submits on behalf of the entire team. Duplicate submissions are not approved.",
  },
];

export default function NosanaClaimPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 md:pt-48 pb-16 md:pb-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
          <HeroCellBackground />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-[radial-gradient(ellipse,#00ff8820_0%,transparent_70%)]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-[radial-gradient(ellipse,#00b4ff14_0%,transparent_70%)]" />
          <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] rounded-full blur-[100px] bg-[radial-gradient(ellipse,#00ff8810_0%,transparent_70%)]" />
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 text-center z-10 isolate">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] mb-6 px-4 py-2 rounded-full border bg-[#00ff88]/8 border-[#00ff88]/20 text-[#00ff88]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse inline-block shrink-0" />
            Powered by
            <img src="/sponsors/nosana.svg" alt="Nosana" className="h-8 w-auto object-contain opacity-80 inline-block" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-tight shimmer-text mb-4">
            Claim $70 in<br className="hidden sm:block" /> Nosana Compute Credits
          </h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl leading-relaxed mb-10">
            Qualified participants in the Decentralize AI Hackathon can access Nosana compute credits to build, test, and deploy AI workloads.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="group inline-flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
              <a
                href="#claim"
                className="hero-cta inline-flex items-center gap-2 font-funnel-display font-semibold text-base px-10 py-4 rounded-none transition-all duration-300 cursor-pointer bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] border-y-0 border-l-2 border-r-2 border-[#5cffb2] text-[#03170f] shadow-[0_0_24px_rgba(0,255,136,0.35)] hover:shadow-[0_0_34px_rgba(0,255,136,0.55)] hover:bg-[linear-gradient(135deg,#6dffbf_0%,#00ff88_100%)]"
              >
                Claim Credits
              </a>
              <span className="font-mono text-xl font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-2 group-hover:text-[#00ff88]/80 select-none">|</span>
            </div>
            <div className="flex items-center gap-5 sm:gap-6">
              <a
                href="#eligibility"
                className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 hover:text-[#00ff88] transition-colors duration-200"
              >
                See Eligibility
              </a>
              <span className="w-px h-3 bg-neutral-700" aria-hidden />
              <a
                href="#efficient-usage"
                className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 hover:text-[#00ff88] transition-colors duration-200"
              >
                Usage Guidelines
              </a>
            </div>
          </div>

          {/* Stats cards */}
          <div className="mt-16 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden bg-[#020812]/40 backdrop-blur-[16px] backdrop-saturate-[180%] border border-[#00ff88]/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 divide-x-0 sm:divide-x divide-[#00ff88]/8">
              {[
                { small: "Compute Credits Worth", large: "$70" },
                { small: "AI Builders", large: "Worldwide" },
                { small: "Deploy on", large: "Nosana" },
              ].map((p) => (
                <div
                  key={p.large}
                  className="group relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-5 sm:py-7 md:py-10 px-3 sm:px-4 md:px-6 overflow-hidden transition-all duration-300 bg-[#00ff88]/4 hover:-translate-y-0.5 hover:bg-[#00ff88]/10"
                >
                  <div className="absolute inset-0 opacity-100 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8810_0%,transparent_70%)]" aria-hidden />
                  <div className="relative font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
                    {p.small}
                  </div>
                  <div className="relative text-3xl lg:text-4xl font-black font-funnel-display leading-none tracking-tight text-[#00ff88] text-glow-green transition-all duration-300 group-hover:scale-[1.05] group-hover:text-[#6dffbf]">
                    {p.large}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}
      <section id="eligibility" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">Eligibility requirements</p>
            <h2 className="text-3xl md:text-4xl text-white">Who can claim credits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
            {requirements.map((r) => (
              <div
                key={r.title}
                className="group relative rounded-2xl overflow-hidden border border-[#ffffff]/8 bg-[#040c19]/60 backdrop-blur-[20px] hover:border-[#00ff88]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,255,136,0.08)]"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                <div className="p-6 md:p-7">
                  <div className="w-11 h-11 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/8 flex items-center justify-center mb-5 group-hover:shadow-[0_0_16px_rgba(0,255,136,0.2)] transition-shadow duration-300">
                    <i className={`hn hn-${r.icon} text-xl text-[#00ff88] inline-block`} aria-hidden />
                  </div>
                  <h3 className="text-white text-base mb-2 leading-snug group-hover:text-[#00ff88] transition-colors duration-300">{r.title}</h3>
                  <p className="font-mono text-sm text-neutral-500 leading-relaxed">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-4xl mx-auto rounded-2xl border border-[#00ff88]/20 bg-[#00ff88]/4 px-6 py-5 text-center">
            <p className="text-sm text-neutral-300 leading-relaxed">
              <span className="text-[#00ff88] font-medium">Note:</span> These credits must be used exclusively for Decentralize AI Hackathon submissions. Builders may either extend an existing project using Nosana credits or create an entirely new project for the hackathon. Incomplete or duplicate submissions may not be approved.
            </p>
          </div>
        </div>
      </section>

      {/* CLAIM FORM */}
      <section id="claim" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">Credit claim form</p>
            <h2 className="text-3xl md:text-4xl text-white">Submit your claim</h2>
            <p className="font-mono text-sm text-neutral-500 mt-3 max-w-lg mx-auto leading-relaxed">
              Share your project details. Approved teams receive Nosana credit access instructions by email.
            </p>
          </div>
          <NosanaClaimForm />
        </div>
      </section>

      {/* USE CREDITS EFFICIENTLY */}
      <section id="efficient-usage" className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="font-mono text-lg uppercase tracking-[0.2em] mb-3 text-[#00ff88]">Usage Guide</p>
            <h2 className="text-3xl md:text-4xl text-white">Here&rsquo;s How You Can Use Your Credits Efficiently</h2>
          </div>

          {/* The default behavior */}
          <div>
            <div className="space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
              <p>
                Deployments on Nosana are by default set to using an{" "}
                <span className="font-mono text-[#00ff88]">&ldquo;Infinite Strategy&rdquo;</span>, with a default{" "}
                <span className="font-mono text-[#00ff88]">&ldquo;Container Timeout&rdquo;</span> of 6 hours and a{" "}
                <span className="font-mono text-[#00ff88]">&ldquo;Replica Count&rdquo;</span> of 1.
              </p>
              <p>
                This mean that one instance will be created for you, and will continue running until your credits run out. Depending on the GPU market you have chosen, your credits will run out quickly.
              </p>
            </div>

            {/* Warning callout: the $350/mo math */}
            <div className="mt-6 rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] backdrop-blur-[20px] p-5 md:p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl border border-amber-400/25 bg-amber-400/10 flex items-center justify-center shrink-0">
                <i className="hn hn-exclamation-triangle-solid text-base text-amber-400 inline-block" aria-hidden />
              </div>
              <p className="text-sm md:text-base text-neutral-200 leading-relaxed pt-1.5">
                With an <span className="text-white font-medium">NVIDIA 5090</span>, at{" "}
                <span className="font-mono text-white">$0.48/h</span>, this will cost{" "}
                <span className="text-amber-300 font-semibold">$350/month</span>.
              </p>
            </div>

            {/* Cost table */}
            <div className="mt-6 rounded-2xl border border-[#ffffff]/8 bg-[#040c19]/60 backdrop-blur-[20px] overflow-hidden">
              <div className="grid grid-cols-3 px-5 md:px-6 py-3.5 border-b border-[#ffffff]/8 bg-[#00ff88]/[0.03]">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-neutral-400">Usage</span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-neutral-400 text-center">Hours/month</span>
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] text-neutral-400 text-right">Cost</span>
              </div>
              {[
                { usage: "24/7", hours: "~730", cost: "~$350", tone: "danger" },
                { usage: "12 h/day", hours: "~365", cost: "~$175", tone: "warn" },
                { usage: "8 h/day", hours: "~243", cost: "~$117", tone: "warn" },
                { usage: "1 h/day", hours: "~30", cost: "~$14.40", tone: "ok" },
              ].map((row, idx, arr) => {
                const costColor =
                  row.tone === "danger" ? "text-red-400" :
                  row.tone === "warn"   ? "text-amber-300" :
                                          "text-[#00ff88]";
                return (
                  <div
                    key={row.usage}
                    className={`grid grid-cols-3 px-5 md:px-6 py-4 transition-colors hover:bg-[#00ff88]/[0.03] ${idx === arr.length - 1 ? "" : "border-b border-[#ffffff]/6"}`}
                  >
                    <span className="text-sm text-neutral-200 font-medium">{row.usage}</span>
                    <span className="font-mono text-sm text-neutral-400 text-center tabular-nums">{row.hours}</span>
                    <span className={`font-mono text-sm text-right tabular-nums font-semibold ${costColor}`}>{row.cost}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configure efficiently */}
          <div className="mt-10">
            <div className="space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
              <p>
                With only <span className="text-[#00ff88] font-semibold">$70 worth of compute credits</span>, you&rsquo;ll need to use it efficiently for the hackathon.
              </p>
              <p>
                In order to do so, when creating your deployments, on{" "}
                <a
                  href="https://deploy.nosana.com/deployments/create"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#00ff88] underline-offset-4 hover:underline break-words"
                >
                  https://deploy.nosana.com/deployments/create
                </a>
              </p>
            </div>

            {/* Steps list */}
            <ol className="mt-6 rounded-2xl border border-[#ffffff]/8 bg-[#040c19]/60 backdrop-blur-[20px] overflow-hidden">
              {[
                <>Click the <span className="font-mono text-[#00ff88]">&ldquo;configure&rdquo;</span> button</>,
                <>Go to the <span className="font-mono text-[#00ff88]">&ldquo;Deployment Configuration&rdquo;</span> tab</>,
                <>Select <span className="font-mono text-[#00ff88]">&ldquo;Simple&rdquo;</span> from the <span className="font-mono text-[#00ff88]">&ldquo;Deployment Strategy&rdquo;</span> drop down list</>,
                <>Keep the <span className="font-mono text-[#00ff88]">&ldquo;Replica Count&rdquo;</span> at 1</>,
                <>Choose your desired <span className="font-mono text-[#00ff88]">&ldquo;Container Timeout&rdquo;</span></>,
                <>Click <span className="font-mono text-[#00ff88]">&ldquo;Save Changes&rdquo;</span></>,
                <>Last but not least choose a GPU market that fits your needs</>,
              ].map((content, i, arr) => (
                <li
                  key={i}
                  className={`group flex items-start gap-4 md:gap-5 px-5 md:px-7 py-4 md:py-5 transition-colors hover:bg-[#00ff88]/[0.04] ${i === arr.length - 1 ? "" : "border-b border-[#ffffff]/6"}`}
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg font-funnel-display text-sm font-bold shrink-0 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] tabular-nums group-hover:bg-[#00ff88]/15 transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-base text-neutral-300 leading-relaxed pt-0.5">
                    {content}
                  </span>
                </li>
              ))}
            </ol>

            {/* Quick CTA to Nosana deploy */}
            <a
              href="https://deploy.nosana.com/deployments/create"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 rounded-xl border border-[#00ff88]/25 bg-[#00ff88]/[0.04] hover:bg-[#00ff88]/[0.08] hover:border-[#00ff88]/40 transition-all duration-300 px-5 py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl border border-[#00ff88]/25 bg-[#00ff88]/10 flex items-center justify-center shrink-0 group-hover:bg-[#00ff88]/20 transition-colors">
                  <i className="hn hn-globe text-base text-[#00ff88] inline-block" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#00ff88] mb-0.5">Open in Nosana</p>
                  <p className="font-mono text-xs sm:text-sm text-white truncate">deploy.nosana.com/deployments/create</p>
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#00ff88] shrink-0 hidden sm:inline-flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-x-1">
                Launch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>

          {/* Pay only for what you use */}
          <div className="mt-10 space-y-4 text-sm md:text-base text-neutral-300 leading-relaxed">
            <p>
              Because billing is based on actual uptime, you only pay for the hours your instance is running. To avoid burning through credits, stop instances when they&rsquo;re idle or lower the Container Timeout.
            </p>
            <p className="text-[#00ff88] font-medium">
              This should help you stretch those $70 as long as possible!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

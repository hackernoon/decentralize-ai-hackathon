export default function JudgeAnnouncementCard() {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-dashed border-[#00ff88]/25 bg-[#040c19]/60 backdrop-blur-[20px] hover:border-[#00ff88]/45 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,255,136,0.1)] flex flex-col h-full">
      <div
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00ff88]/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8814_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative p-5 md:p-6 flex flex-col gap-4 flex-1">
        <div className="w-full aspect-square rounded-xl overflow-hidden border border-dashed border-[#00ff88]/25 bg-[#00ff88]/6 shrink-0 flex items-center justify-center transition-all duration-300 group-hover:border-[#00ff88]/40 group-hover:bg-[#00ff88]/10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-xl border border-[#00ff88]/25 bg-[#00ff88]/10 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,255,136,0.25)] transition-shadow duration-300">
              <i className="hn hn-users-solid text-3xl text-[#00ff88]/70 inline-block" aria-hidden />
            </div>
            <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#00ff88]/80 px-3 py-1 rounded-full border border-[#00ff88]/25 bg-[#00ff88]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse inline-block" />
              Coming soon
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-white text-base font-funnel-display font-semibold leading-snug group-hover:text-[#00ff88] transition-colors duration-300">
            Judges Being Announced
          </h3>
          <p className="font-mono text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Our complete panel of experts from the decentralized AI community will be announced shortly. Check back soon.
          </p>
        </div>

        <div className="w-9 h-9 mt-auto" aria-hidden />
      </div>
    </div>
  );
}

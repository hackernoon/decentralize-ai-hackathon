import type { Judge } from "@/lib/judges";

interface JudgeCardProps {
  judge: Judge;
}

export default function JudgeCard({ judge }: JudgeCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-[#ffffff]/8 bg-[#040c19]/60 backdrop-blur-[20px] hover:border-[#00ff88]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,255,136,0.08)] flex flex-col h-full">
      <div
        className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,#00ff8810_0%,transparent_70%)]"
        aria-hidden
      />

      <div className="relative p-5 md:p-6 flex flex-col gap-4 flex-1">
        <div className="w-full aspect-square rounded-xl overflow-hidden border border-[#ffffff]/10 bg-[#ffffff]/5 shrink-0 transition-all duration-300 group-hover:border-[#00ff88]/35 group-hover:shadow-[0_0_24px_rgba(0,255,136,0.15)]">
          {judge.image ? (
            <img
              src={judge.image}
              alt={judge.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" aria-hidden>
              <i className="hn hn-user-solid text-4xl text-neutral-500 inline-block" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-white text-base font-funnel-display font-semibold leading-snug group-hover:text-[#00ff88] transition-colors duration-300">
            {judge.name}
          </h3>
          <p className="font-mono text-xs sm:text-sm text-neutral-500 leading-relaxed">
            {judge.designation}
          </p>
        </div>

        {(judge.linkedin || judge.email) && (
          <div className="flex items-center gap-2 mt-auto pt-1">
            {judge.linkedin && (
              <a
                href={judge.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${judge.name} on LinkedIn`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/8 text-neutral-400 hover:text-[#00ff88] hover:border-[#00ff88]/40 hover:shadow-[0_0_16px_rgba(0,255,136,0.2)] transition-all duration-300"
              >
                <i className="hn hn-linkedin text-lg inline-block" aria-hidden />
              </a>
            )}
            {judge.email && (
              <a
                href={`mailto:${judge.email}`}
                aria-label={`Email ${judge.name}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-[#00ff88]/20 bg-[#00ff88]/8 text-neutral-400 hover:text-[#00ff88] hover:border-[#00ff88]/40 hover:shadow-[0_0_16px_rgba(0,255,136,0.2)] transition-all duration-300"
              >
                <i className="hn hn-email text-lg inline-block" aria-hidden />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import Link from "next/link";
import { type SponsorPrizeCard } from "@/lib/prizes";

interface PrizeSponsorCardProps {
  prize: SponsorPrizeCard;
}

function parseAmount(raw: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (!cleaned) return 0;
  return Number.parseFloat(cleaned);
}

export default function PrizeSponsorCard({ prize }: PrizeSponsorCardProps) {
  const isExternalCta = prize.ctaHref?.startsWith("http");

  const cashValue = parseAmount(prize.cashAmount);
  const computeValue = parseAmount(prize.computeCreditsAmount);
  const showCash = cashValue > 0;
  const showCompute = computeValue > 0;
  const isTextPrize = !!prize.primaryValue;

  const primary = isTextPrize
    ? { label: prize.primaryLabel ?? "Prize", amount: prize.primaryValue! }
    : showCash
      ? { label: "Credits", amount: prize.cashAmount }
      : showCompute
        ? { label: "Compute Credits", amount: prize.computeCreditsAmount }
        : { label: "Prize", amount: prize.cashAmount };

  const secondary = !isTextPrize && showCash && showCompute
    ? { label: "Compute Credits", amount: prize.computeCreditsAmount }
    : null;

  return (
    <article
      className="group relative rounded-2xl overflow-hidden border border-[#ffffff]/10 bg-[#040c19]/60 backdrop-blur-[20px] hover:-translate-y-1 hover:border-[#ffffff]/20 transition-all duration-300 flex flex-col h-full"
      style={{ boxShadow: `inset 0 1px 0 0 ${prize.accent}10` }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${prize.accent}1f 0%, transparent 70%)`,
        }}
        aria-hidden
      />
      {/* accent top-bar */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${prize.accent}aa 50%, transparent 100%)`,
        }}
        aria-hidden
      />

      {/* Header: logo */}
      <div className="relative px-6 md:px-8 pt-6 md:pt-7 pb-5">
        <a
          href={prize.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center min-w-0 group/logo"
        >
          <img
            src={prize.logo}
            alt={prize.sponsor}
            className="h-8 md:h-10 w-auto object-contain opacity-95 group-hover/logo:opacity-100 transition-opacity"
          />
        </a>
      </div>

      {/* Primary prize value */}
      <div className="relative px-6 md:px-8 pb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
          {primary.label}
        </p>
        <p
          className={`font-funnel-display font-black tracking-tight ${
            isTextPrize
              ? "text-4xl md:text-5xl leading-tight break-words"
              : "text-5xl md:text-6xl leading-none tabular-nums"
          }`}
          style={{ color: prize.accent }}
        >
          {primary.amount}
        </p>
        <p className="font-mono text-xs text-neutral-400 mt-3 leading-relaxed">
          {prize.prizeSubtext}
        </p>
      </div>

      {/* Secondary value (only when both cash + compute exist) */}
      {secondary && (
        <div className="relative mx-6 md:mx-8 mb-5 flex items-center justify-between rounded-lg border border-[#ffffff]/10 bg-[#ffffff]/4 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-500">
            + {secondary.label}
          </span>
          <span
            className="font-funnel-display text-lg font-bold tabular-nums"
            style={{ color: prize.accent }}
          >
            {secondary.amount}
          </span>
        </div>
      )}

      {/* About */}
      <div className="relative px-6 md:px-8 pb-6 flex flex-col flex-1">
        <div className="border-t border-[#ffffff]/8 pt-5 flex-1">
          <p className="text-sm text-neutral-400 leading-relaxed">{prize.about}</p>
        </div>

        {prize.ctaLabel && prize.ctaHref && (
          <div className="mt-5">
            {isExternalCta ? (
              <a
                href={prize.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full font-funnel-display font-semibold text-sm px-6 py-3.5 rounded-none transition-all duration-300 border-y-0 border-l-2 border-r-2 hover:text-black"
                style={{
                  color: prize.accent,
                  borderColor: `${prize.accent}66`,
                  backgroundColor: `${prize.accent}12`,
                }}
              >
                {prize.ctaLabel}
              </a>
            ) : (
              <Link
                href={prize.ctaHref}
                className="inline-flex items-center justify-center w-full font-funnel-display font-semibold text-sm px-6 py-3.5 rounded-none transition-all duration-300 border-y-0 border-l-2 border-r-2 hover:text-black"
                style={{
                  color: prize.accent,
                  borderColor: `${prize.accent}66`,
                  backgroundColor: `${prize.accent}12`,
                }}
              >
                {prize.ctaLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

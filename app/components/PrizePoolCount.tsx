"use client";

import { useEffect, useRef, useState } from "react";

interface PrizePoolCountProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function PrizePoolCount({
  target,
  duration = 1800,
  prefix = "$",
  suffix = "+",
  className,
}: PrizePoolCountProps) {
  const [value, setValue] = useState(0);
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || startedRef.current) continue;
          startedRef.current = true;

          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted = value.toLocaleString("en-US");

  return (
    <span
      ref={nodeRef}
      className={className}
      aria-label={`${prefix}${target.toLocaleString("en-US")}${suffix}`}
    >
      {prefix}
      <span className="tabular-nums">{formatted}</span>
      {suffix}
    </span>
  );
}

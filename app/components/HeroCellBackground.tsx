"use client";

import { useState, useEffect } from "react";

/**
 * Upward-moving cell grid background: 30 cells per column stay fixed;
 * a wave of opacity (8 cells) moves up one cell at a time via script.
 */
const WAVE_OPACITIES = [
  0.0284, 0.1284, 0.2852, 0.642, 0.858, 0.4148, 0.1716, 0.0716,
];
const WAVE_LENGTH = WAVE_OPACITIES.length;
const CELLS_PER_COLUMN = 30;
const COLUMN_COUNT = 8;
const TICK_MS = 180;

const COLUMN_PHASE_OFFSETS = [7, 19, 3, 24, 11, 28, 1, 16];

/** Wave moves upward: at phase 0 the bottom 8 cells are lit; phase increments move the band toward the top. */
function getCellOpacity(cellIndex: number, phase: number): number {
  const waveStart = (CELLS_PER_COLUMN - 1 - phase + CELLS_PER_COLUMN) % CELLS_PER_COLUMN;
  const offset = (cellIndex - waveStart + CELLS_PER_COLUMN) % CELLS_PER_COLUMN;
  if (offset < WAVE_LENGTH) return WAVE_OPACITIES[offset];
  return 0;
}

export default function HeroCellBackground() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % CELLS_PER_COLUMN);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hero-cell-bg" aria-hidden>
      {Array.from({ length: COLUMN_COUNT }).map((_, colIndex) => {
        const variant = (colIndex % 8) + 1;
        const columnPhase = (phase + COLUMN_PHASE_OFFSETS[colIndex]) % CELLS_PER_COLUMN;
        return (
          <div
            key={colIndex}
            className={`hero-cell-col hero-cell-col--var-${variant}`}
          >
            {Array.from({ length: CELLS_PER_COLUMN }).map((_, i) => (
              <div
                key={i}
                className="hero-cell"
                style={{ opacity: getCellOpacity(i, columnPhase) }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

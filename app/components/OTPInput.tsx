'use client';

import { useRef, KeyboardEvent, ClipboardEvent, ChangeEvent } from 'react';

interface OTPInputProps {
  value: string;           // always 6 chars, padded with '' per cell
  onChange: (val: string) => void;
  disabled?: boolean;
  hasError?: boolean;
  onEnter?: () => void;
}

/**
 * 6-cell OTP input.
 * - Auto-advances focus on digit entry
 * - Backspace retreats to previous cell
 * - Paste fills all 6 cells at once
 */
export default function OTPInput({ value, onChange, disabled = false, hasError = false, onEnter }: OTPInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const cells = Array.from({ length: 6 }, (_, i) => value[i] ?? '');

  const update = (index: number, char: string) => {
    const digits = cells.slice();
    digits[index] = char;
    onChange(digits.join(''));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) return;
    const digit = raw.slice(-1); // take last digit (handles autocomplete)
    update(i, digit);
    if (i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Backspace') {
      if (cells[i]) {
        update(i, '');
      } else if (i > 0) {
        update(i - 1, '');
        refs.current[i - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && i > 0) {
      refs.current[i - 1]?.focus();
    } else if (e.key === 'ArrowRight' && i < 5) {
      refs.current[i + 1]?.focus();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    onChange(pasted.padEnd(6, '').slice(0, 6));
    // move focus to the cell after the last pasted digit
    const nextIndex = Math.min(pasted.length, 5);
    refs.current[nextIndex]?.focus();
  };

  const borderClass = hasError
    ? 'border-red-500/60 bg-red-500/8 focus:border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.25)]'
    : 'border-[#ffffff]/20 bg-[#ffffff]/5 focus:border-[#00ff88]/70 focus:bg-[#00ff88]/6 focus:shadow-[0_0_14px_rgba(0,255,136,0.35)]';

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" role="group" aria-label="One-time verification code">
      {cells.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          id={`otp-cell-${i}`}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of 6`}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={`
            w-11 h-14 sm:w-12 sm:h-16
            rounded-xl border
            text-center text-xl sm:text-2xl font-funnel-display font-bold text-white
            outline-none transition-all duration-200
            disabled:opacity-40 disabled:cursor-not-allowed
            caret-transparent
            ${borderClass}
          `}
        />
      ))}
    </div>
  );
}

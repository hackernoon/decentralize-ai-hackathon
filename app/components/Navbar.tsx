'use client';

import Link from "next/link";
import { useState } from "react";
import logo from "@/public/logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-4 right-4 z-[1000] md:left-8 md:right-8 md:top-6">
      <div className="max-w-[1400px] mx-auto rounded-2xl px-5 py-3.5 md:px-8 md:py-4 flex justify-between items-center bg-[#020812]/40 backdrop-blur-[16px] backdrop-saturate-[180%] border border-[#00ff88]/10">
        <Link href="/" className="no-underline cursor-pointer">
          <img
            src={logo.src}
            alt="Decentralize AI Hackathon"
            className="h-8 w-auto object-contain md:h-9"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-5 md:gap-8 items-center">
          <Link href="/prizes" className="text-[#888888] font-mono text-xs md:text-sm transition-all cursor-pointer hover:text-[#00ff88]">
            PRIZES
          </Link>
          <Link href="/judges" className="text-[#888888] font-mono text-xs md:text-sm transition-all cursor-pointer hover:text-[#00ff88]">
            JUDGES
          </Link>
          <Link href="/faq" className="text-[#888888] font-mono text-xs md:text-sm transition-all cursor-pointer hover:text-[#00ff88]">
            FAQ
          </Link>
          <div className="group inline-flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-1.5 group-hover:text-[#00ff88]/80 select-none">|</span>
            <Link
              href="/blog-generator"
              className="hero-cta font-funnel-display inline-flex items-center justify-center font-semibold text-sm px-8 py-3 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black"
            >
              BLOG IT
            </Link>
            <span className="font-mono text-sm font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#00ff88]/80 select-none">|</span>
          </div>
        </nav>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden relative flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-[#00ff88]/20 bg-[#00ff88]/5 transition-colors cursor-pointer hover:bg-[#00ff88]/10"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`absolute block w-[18px] h-px bg-[#00ff88] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-[5px]'}`}
          />
          <span
            className={`absolute block w-[18px] h-px bg-[#00ff88] transition-all duration-300 origin-center ${menuOpen ? 'opacity-0 scale-x-0' : 'translate-y-0'}`}
          />
          <span
            className={`absolute block w-[18px] h-px bg-[#00ff88] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-[5px]'}`}
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden mt-2 mx-0 rounded-2xl bg-[#020812]/90 backdrop-blur-[24px] border border-[#00ff88]/10 overflow-hidden">
          <nav className="flex flex-col divide-y divide-[#ffffff]/6 [&>*:last-child]:border-t-0">
            <Link
              href="/prizes"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 min-h-[44px] flex items-center text-[#888888] font-mono text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer hover:text-[#00ff88] hover:bg-[#00ff88]/5 active:bg-[#00ff88]/10"
            >
              Prizes
            </Link>
            <Link
              href="/judges"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 min-h-[44px] flex items-center text-[#888888] font-mono text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer hover:text-[#00ff88] hover:bg-[#00ff88]/5 active:bg-[#00ff88]/10"
            >
              Judges
            </Link>
            <Link
              href="/faq"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 min-h-[44px] flex items-center text-[#888888] font-mono text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer hover:text-[#00ff88] hover:bg-[#00ff88]/5 active:bg-[#00ff88]/10"
            >
              FAQ
            </Link>
            <div className="px-6 py-5 flex justify-center">
              <div className="group inline-flex items-center gap-3">
                <span className="font-mono text-lg font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:-translate-x-1.5 group-hover:text-[#00ff88]/80 select-none">|</span>
                <Link
                  href="/blog-generator"
                  onClick={() => setMenuOpen(false)}
                  className="hero-cta inline-flex items-center justify-center font-funnel-display font-semibold text-sm px-10 py-3.5 rounded-none transition-all duration-300 cursor-pointer bg-[#00ff88]/10 border-y-0 border-l-2 border-r-2 border-[#00ff88]/40 text-[#00ff88] hover:bg-[linear-gradient(135deg,#00ff88_0%,#00e07a_100%)] hover:border-[#00ff88] hover:text-black active:scale-[0.98]"
                >
                  BLOG IT
                </Link>
                <span className="font-mono text-lg font-bold text-[#00ff88]/50 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#00ff88]/80 select-none">|</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

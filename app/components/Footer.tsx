import Link from "next/link";
import { SPONSORS } from "@/lib/sponsors";
import logo from "@/public/logo.svg";

export default function Footer() {
  return (
    <footer className="pt-14 pb-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto rounded-2xl p-6 sm:p-8 md:p-10 bg-[#020812]/60 backdrop-blur-[20px] border border-[#ffffff]/6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-12 md:gap-x-14 md:gap-y-0 mb-14">
          <div className="col-span-2 md:col-span-2 pb-4 md:pb-0">
            <Link href="/" className="no-underline cursor-pointer">
              <img
                src={logo.src}
                alt="Decentralize AI Hackathon"
                className="h-8 w-auto object-contain md:h-9"
              />
            </Link>
            <p className="mt-3 text-sm text-neutral-500 leading-relaxed max-w-[200px]">
              A global hackathon for the open AI future.
            </p>
          </div>

          <div className="min-w-0 md:pr-2">
            <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5">About</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/prizes" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Prizes
                </Link>
              </li>
              <li>
                <a href="https://editingprotocol.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline hover:text-[#00ff88]">
                  Editing Protocol
                </a>
              </li>
              <li>
                <a href="https://hackernoon.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Privacy
                </a>
              </li>
              <li>
                <a href="https://hackernoon.ai" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  HackerNoon AI
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0 md:pr-2">
            <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/judges" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Judges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="https://hackernoon.com/tagged/decentralize-ai-hackathon" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Hackathon Entries
                </a>
              </li>
              <li>
                <a href="https://hackernoon.com/c/ai" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  AI Newsletter
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0 md:pr-2">
            <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5">Powered By</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://hackernoon.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  HackerNoon
                </a>
              </li>
              <li>
                <a href="https://contests.hackernoon.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Blogging Contests
                </a>
              </li>
              <li>
                <a href="https://proofofusefulness.com" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Proof of Usefulness
                </a>
              </li>
              <li>
                <a href="https://hackernoon.com/technology-hackathons" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                  Tech Hackathons
                </a>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs uppercase tracking-[0.18em] text-neutral-500 mb-5">Sponsored by</h3>
            <ul className="space-y-3">
              {SPONSORS.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 transition-colors no-underline cursor-pointer hover:text-[#00ff88]">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-7 flex justify-between items-center flex-wrap gap-4 border-t border-[#ffffff]/6">
          <p className="text-sm text-neutral-600">
            © 2026{" "}
            <a href="https://hackernoon.com" target="_blank" rel="noopener noreferrer"
              className="text-[#00ff88] transition-colors no-underline cursor-pointer hover:text-[#00cc70]">
              HackerNoon
            </a>
          </p>
          <p className="text-sm italic text-neutral-600">Decentralize AI, or Else</p>
        </div>
      </div>
    </footer>
  );
}

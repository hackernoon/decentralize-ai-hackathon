'use client';

import { useEffect, useState } from 'react';

const MESSAGES = [
  'own your models',
  'human in loop',
  'freedom to compute',
  'open weight models',
  'open intelligence',
  'open source tech',
  'on-chain inference',
  'p2p model sharing',
  'federated learning',
  'sovereign identity',
  'model provenance',
  'data ownership',
  'compute without kings',
  'trusted execution',
  'via HackerNoon',
];

export default function HeroRotatingMessage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMessageIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <p
      className="relative z-10 mt-4 font-mono text-sm md:text-base text-center min-h-[1.5em] transition-all duration-300 text-[#00ff88]/85"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(4px)',
      }}
    >
      {MESSAGES[messageIndex]}
    </p>
  );
}

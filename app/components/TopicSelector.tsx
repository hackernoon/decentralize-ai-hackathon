'use client';

interface Topic {
  id: string;
  icon: string;
  name: string;
  desc: string;
}

const topics: Topic[] = [
  { id: 'open-source', icon: 'globe', name: 'Open-Source AI', desc: 'Models, weights, datasets' },
  { id: 'compute', icon: 'chart-network-solid', name: 'Decentralized Compute', desc: 'GPU networks, P2P training' },
  { id: 'governance', icon: 'bank-solid', name: 'AI Governance', desc: 'DAOs, community control' },
  { id: 'data-sovereignty', icon: 'cybersecurity', name: 'Data Sovereignty', desc: 'Privacy, ownership, rights' },
  { id: 'federated', icon: 'management', name: 'Federated Learning', desc: 'Distributed training' },
  { id: 'blockchain', icon: 'machine-learning', name: 'Blockchain & AI', desc: 'On-chain inference, tokens' },
];

interface TopicSelectorProps {
  selectedTopic: string;
  customTopic: string;
  onSelectTopic: (topic: string) => void;
  onCustomTopicChange: (value: string) => void;
  onEnter?: () => void;
}

export default function TopicSelector({
  selectedTopic,
  customTopic,
  onSelectTopic,
  onCustomTopicChange,
  onEnter,
}: TopicSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {topics.map((topic) => {
          const isSelected = selectedTopic === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onSelectTopic(topic.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isSelected && onEnter) {
                  e.preventDefault();
                  onEnter();
                }
              }}
              className={`group relative text-left p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-[16px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020812] ${
                isSelected
                  ? 'bg-[#00ff88]/8 border-[#00ff88]/40 shadow-[0_0_20px_rgba(0,255,136,0.08)]'
                  : 'bg-[#ffffff]/4 border-[#ffffff]/8 hover:border-[#00ff88]/25 hover:bg-[#00ff88]/4'
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
              )}
              <i
                className={`hn hn-${topic.icon} text-2xl mb-3 inline-block transition-colors duration-200 ${
                  isSelected ? 'text-[#00ff88]' : 'text-neutral-500 group-hover:text-[#00ff88]/70'
                }`}
                aria-hidden
              />
              <h3 className={`text-sm mb-1 transition-colors duration-200 ${isSelected ? 'text-[#00ff88]' : 'text-white'}`}>
                {topic.name}
              </h3>
              <p className="text-xs text-neutral-500 leading-snug">{topic.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="relative max-w-5xl mx-auto">
        <input
          type="text"
          value={customTopic}
          onChange={(e) => onCustomTopicChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onEnter) {
              e.preventDefault();
              onEnter();
            }
          }}
          placeholder="Or type your own topic — e.g. AI model marketplaces, edge inference..."
          className={`w-full pl-11 pr-6 py-4 rounded-xl text-white placeholder-neutral-600 focus:outline-none transition-all duration-200 bg-[#ffffff]/5 backdrop-blur-[12px] border ${
            customTopic
              ? 'border-[#00ff88]/40 shadow-[0_0_16px_rgba(0,255,136,0.06)]'
              : 'border-[#ffffff]/10 focus:border-[#00ff88]/30'
          }`}
        />
        <div className="pointer-events-none absolute left-4 top-0 bottom-0 flex items-center z-10" aria-hidden>
          <i className="hn hn-pen-solid text-lg text-neutral-500 inline-block" aria-hidden />
        </div>
      </div>
    </div>
  );
}

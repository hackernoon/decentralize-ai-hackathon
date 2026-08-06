'use client';

interface AIModel {
  id: string;
  icon: string;
  name: string;
  org: string;
  desc: string;
  bestFor: string;
  params: string;
}

const models: AIModel[] = [
  {
    id: 'gpt-oss-120b',
    icon: 'machine-learning',
    name: 'GPT-OSS 120B',
    org: 'OpenAI',
    desc: 'State-of-the-art open weights model. Excellent balance of logical reasoning, technical depth, and engaging flow.',
    bestFor: 'Technical deep-dives, research summaries',
    params: '120B params',
  },
  {
    id: 'mistral-medium-3',
    icon: 'bolt-solid',
    name: 'Mistral Medium 3',
    org: 'Mistral AI',
    desc: 'Advanced creative and reasoning model. Writes exceptionally fluent, engaging technical blogs.',
    bestFor: 'Creative drafts, conversational writing',
    params: 'Medium MoE',
  },
  {
    id: 'qwen3-235b',
    icon: 'code-solid',
    name: 'Qwen3 235B',
    org: 'Alibaba',
    desc: 'Gigantic Mixture-of-Experts open weights. Unmatched technical reasoning and coding accuracy.',
    bestFor: 'Complex technical concepts, smart contracts',
    params: '235B MoE',
  },
];

interface AIModelSelectorProps {
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onEnter?: () => void;
}

export default function AIModelSelector({ selectedModel, onSelectModel, onEnter }: AIModelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
      {models.map((model) => {
        const isSelected = selectedModel === model.id;
        return (
          <button
            key={model.id}
            type="button"
            onClick={() => onSelectModel(model.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isSelected && onEnter) {
                e.preventDefault();
                onEnter();
              }
            }}
            className={`group relative text-left p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-[16px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020812] ${
              isSelected
                ? 'bg-[#00ff88]/8 border-[#00ff88]/40 shadow-[0_0_20px_rgba(0,255,136,0.08)]'
                : 'bg-[#ffffff]/4 border-[#ffffff]/8 hover:border-[#00ff88]/25 hover:bg-[#00ff88]/4'
            }`}
          >
            {isSelected && (
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88]" />
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-200 ${
                isSelected ? 'bg-[#00ff88]/15 border-[#00ff88]/30' : 'bg-[#ffffff]/5 border-[#ffffff]/8 group-hover:border-[#00ff88]/20'
              }`}>
                <i
                  className={`hn hn-${model.icon} text-base inline-block transition-colors duration-200 ${
                    isSelected ? 'text-[#00ff88]' : 'text-neutral-500 group-hover:text-[#00ff88]/70'
                  }`}
                  aria-hidden
                />
              </div>
              <div>
                <h4 className={`text-sm leading-tight transition-colors duration-200 ${isSelected ? 'text-[#00ff88]' : 'text-white'}`}>
                  {model.name}
                </h4>
                <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-neutral-500">{model.org}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">{model.desc}</p>

            <div className="pt-3 border-t border-[#ffffff]/6 space-y-2">
              <div className={`text-xs py-1.5 pl-3 leading-snug border-l-2 transition-colors duration-200 ${
                isSelected ? 'text-[#00ff88] border-[#00ff88]/50' : 'text-neutral-500 border-[#ffffff]/15'
              }`}>
                {model.bestFor}
              </div>
              <div className="text-neutral-600 text-[10px] text-right font-mono">{model.params}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

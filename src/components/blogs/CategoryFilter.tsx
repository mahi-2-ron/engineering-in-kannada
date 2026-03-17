interface CategoryFilterProps {
  readonly domains: string[];
  readonly selectedDomain: string;
  readonly onSelect: (domain: string) => void;
}

export function CategoryFilter({ domains, selectedDomain, onSelect }: CategoryFilterProps) {
  return (
    <div className="sticky top-[48px] md:top-[56px] z-40 bg-[#0a0a0a]/60 backdrop-blur-2xl border-y border-white/[0.05] py-2 md:py-3 mb-4 md:mb-6 shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-3 items-center justify-start md:justify-center pb-1 md:pb-0 hide-scrollbar touch-pan-x">
          {domains.map(domain => {
            const isActive = selectedDomain === domain;
            return (
              <button
                key={domain}
                onClick={() => onSelect(domain)}
                className={`whitespace-nowrap px-6 md:px-8 py-2.5 md:py-3 rounded-[1.2rem] md:rounded-2xl text-[11px] md:text-sm font-black uppercase tracking-widest transition-all duration-500 active:scale-95 ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-yellow-500 text-black shadow-[0_0_30px_rgba(250,204,21,0.4)] md:scale-105' 
                    : 'bg-white/[0.03] text-gray-500 hover:bg-white/[0.08] hover:text-white border border-white/5 hover:border-white/10'
                }`}
              >
                {domain}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

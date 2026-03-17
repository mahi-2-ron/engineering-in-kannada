import { Search } from 'lucide-react';

interface SearchBarProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onClear: () => void;
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative group max-w-2xl mx-auto mt-[-8px] md:mt-[-12px] z-50 px-4 mb-3 md:mb-4">
      <div className="absolute inset-0 bg-primary/20 rounded-[2rem] md:rounded-3xl blur-xl md:blur-2xl transition-all duration-700 group-hover:bg-primary/30 opacity-40"></div>
      <div className="relative flex items-center bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-3xl p-1.5 md:p-3 transition-all duration-500 hover:border-white/20 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 shadow-2xl shadow-black/50">
        <div className="pl-4 text-gray-400 group-focus-within:text-primary transition-colors">
          <Search className="w-5 md:w-6 h-5 md:h-6" />
        </div>
        <input
          type="text"
          className="w-full bg-transparent text-white px-3 md:px-5 py-3 md:py-4 focus:outline-none placeholder-gray-500 font-bold text-base md:text-xl"
          placeholder="Search topics, tags..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button 
            type="button"
            onClick={onClear}
            className="px-4 md:px-6 py-2 md:py-2.5 mr-1.5 md:mr-2 bg-white/5 hover:bg-white/10 text-white rounded-[1.2rem] md:rounded-2xl transition-all font-black text-xs"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

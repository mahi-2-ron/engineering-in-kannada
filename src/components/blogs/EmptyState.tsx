import { Search, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  readonly searchTerm: string;
  readonly onClear: () => void;
}

export function EmptyState({ searchTerm, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center animate-fade-in bg-white/[0.02] border border-white/[0.05] rounded-[3rem] backdrop-blur-md shadow-2xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl rounded-full"></div>
      
      <div className="relative mb-10">
        <div className="absolute inset-x-0 bottom-0 h-10 bg-primary/20 blur-2xl rounded-full scale-110 opacity-60"></div>
        <div className="relative w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center shadow-inner">
          <Search className="w-10 h-10 text-primary animate-pulse" />
        </div>
      </div>
      
      <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter relative z-10 Poppins">
        No results for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-500">"{searchTerm}"</span>
      </h3>
      <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg font-medium leading-relaxed opacity-70 relative z-10 Inter">
        We couldn't find any blogs matching your search. Try different keywords or reset your filters to explore everything.
      </p>
      
      <button
        onClick={onClear}
        className="flex items-center gap-3 px-10 py-5 bg-gradient-to-br from-primary to-yellow-600 text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_15px_30px_rgba(250,204,21,0.25)] ring-4 ring-primary/10 uppercase tracking-widest text-sm relative z-10"
      >
        <RotateCcw className="w-5 h-5" />
        Reset Research
      </button>
    </div>
  );
}

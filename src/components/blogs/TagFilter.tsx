import { Tag as TagIcon, X } from 'lucide-react';

interface TagFilterProps {
  readonly allTags: string[];
  readonly selectedTags: string[];
  readonly onToggleTag: (tag: string) => void;
  readonly onClearTags: () => void;
}

export function TagFilter({ allTags, selectedTags, onToggleTag, onClearTags }: TagFilterProps) {
  if (allTags.length === 0) return null;

  return (
    <div className="container mx-auto px-4 mb-4 md:mb-6 animate-fade-in">
      <div className="flex flex-wrap items-center gap-2 md:gap-3 max-w-6xl mx-auto bg-white/[0.02] border border-white/5 p-2 md:p-3 rounded-lg md:rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mr-2 md:mr-4 text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-widest">
          <TagIcon className="w-3 md:w-4 h-3 md:h-4 text-primary/60" />
          <span>Quick Filters:</span>
        </div>
        
        {allTags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggleTag(tag)}
              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold border transition-all duration-500 active:scale-95 ${
                isSelected 
                  ? 'bg-primary/20 border-primary/40 text-primary shadow-[0_0_20px_rgba(250,204,21,0.2)] md:scale-105' 
                  : 'bg-white/[0.03] border-white/5 text-gray-500 hover:border-white/20 hover:text-white'
              }`}
            >
              #{tag}
            </button>
          );
        })}

        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={onClearTags}
            className="flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all uppercase tracking-tighter"
          >
            <X className="w-3 md:w-3.5 h-3 md:h-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

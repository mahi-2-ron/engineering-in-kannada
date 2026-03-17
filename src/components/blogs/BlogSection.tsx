import { Compass, ChevronDown } from 'lucide-react';
import { BlogPost } from '../../types';
import { BlogCard } from './BlogCard';

interface BlogSectionProps {
  readonly domain: string;
  readonly blogs: BlogPost[];
  readonly isExpanded: boolean;
  readonly searchTerm: string;
  readonly onToggle: () => void;
}

export function BlogSection({ domain, blogs, isExpanded, searchTerm, onToggle }: BlogSectionProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6 animate-fade-in group/section">
      <button 
        type="button"
        onClick={onToggle}
        className={`w-full text-left group relative overflow-hidden rounded-xl md:rounded-2xl border transition-all duration-700 cursor-pointer block ${
          isExpanded 
            ? 'bg-white/[0.05] border-primary/40 shadow-lg p-1.5 md:p-3' 
            : 'bg-white/[0.02] border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] p-1.5 md:p-2'
        }`}
      >
        {!isExpanded && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.05] to-transparent pointer-events-none"></div>
        )}

        <div className="relative flex flex-row items-center justify-between gap-3 md:gap-4 z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-700 ${isExpanded ? 'bg-primary text-black rotate-[360deg] shadow-[0_0_20px_rgba(250,204,21,0.3)]' : 'bg-white/5 text-gray-500 group-hover:text-white group-hover:bg-white/10'}`}>
              <Compass className="w-4 md:w-5 h-4 md:h-5" />
            </div>
            <div>
              <h2 className={`text-lg md:text-2xl font-black transition-all duration-500 tracking-tighter ${isExpanded ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                {domain}
              </h2>
              <p className="text-[9px] md:text-[10px] text-gray-600 mt-0.5 font-black uppercase tracking-[0.15em] opacity-60">
                {blogs.length} {blogs.length === 1 ? 'Collection' : 'Collections'}
              </p>
            </div>
          </div>
          
          {!searchTerm && (
            <div className="flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-primary transition-all">
              <span className="hidden sm:inline">{isExpanded ? 'Hide' : 'View'}</span>
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-700 ${isExpanded ? 'bg-primary/10 border-primary/30 text-primary rotate-180' : 'bg-white/5 border-white/10 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                <ChevronDown className="w-3.5 md:w-4 h-3.5 md:h-4" />
              </div>
            </div>
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-2 md:pt-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.slug} blog={blog} searchTerm={searchTerm} />
          ))}
        </div>
      )}
    </div>
  );
}

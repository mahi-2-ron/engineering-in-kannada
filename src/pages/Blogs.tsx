import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../utils/blogUtils';
import { truncateWords } from '../utils/textUtils';
import { User, Tag, Clock, Search, ChevronDown, Compass, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';

const getDifficultyColors = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'Intermediate':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    default:
      return 'bg-red-500/10 text-red-400 border-red-500/20';
  }
};

export function Blogs() {
  const allBlogs = getBlogPosts();
  
  // Extract unique domains
  const domains = ['All', ...Array.from(new Set(allBlogs.map(b => b.metadata.domain).filter(Boolean)))];
  
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter logic
  const filteredBlogs = allBlogs.filter((b) => {
    const matchesDomain = selectedDomain === 'All' || b.metadata.domain === selectedDomain;
    const matchesSearch = b.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.metadata.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-primary/30">
      <ScrollToTop />
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              <span>Knowledge Hub</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-300">Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Deep-dive articles, tutorials, and real-world engineering analogies tailored for Karnataka students.
            </p>

            {/* Premium Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl transition-all duration-500 group-hover:bg-primary/30 opacity-50"></div>
              <div className="relative flex items-center bg-[#111111] border border-white/10 rounded-2xl p-2 transition-all duration-300 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
                <div className="pl-4 text-gray-500">
                  <Search className="w-6 h-6" />
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent text-white px-4 py-3 focus:outline-none placeholder-gray-600 font-medium text-lg"
                  placeholder="Search architecture, algorithms, cloud..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="pr-4 text-gray-500 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[72px] z-40 bg-[#0a0a0a]/80 backdrop-blur-xl border-y border-white/5 py-4 mb-16 shadow-2xl shadow-black">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-3 items-center justify-start md:justify-center pb-2 md:pb-0 hide-scrollbar">
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                  selectedDomain === domain 
                    ? 'bg-primary text-black shadow-[0_0_20px_rgba(250,204,21,0.3)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 pb-24 min-h-[50vh]">
        <div className="flex flex-col gap-8 md:gap-12 max-w-6xl mx-auto">
          {domains.filter(d => d !== 'All').map(domain => {
            const domainBlogs = filteredBlogs.filter(b => b.metadata.domain === domain);
            
            // If we are searching, and this domain has no matches, hide it entirely.
            if (domainBlogs.length === 0 && searchTerm !== '') return null;
            // If we selected a specific domain, and this isn't it, hide it.
            if (selectedDomain !== 'All' && selectedDomain !== domain) return null;

            // Determine if the grid should be shown (expanded) or collapsed
            // It expands if: the user selected this domain explicitly OR user is searching and found matches
            const isExpanded = selectedDomain === domain || searchTerm !== '';

            return (
              <div key={domain} className="flex flex-col gap-6 animate-fade-in">
                {/* Domain Header Card */}
                <button 
                  type="button"
                  onClick={() => {
                    if (selectedDomain === domain) setSelectedDomain('All');
                    else setSelectedDomain(domain);
                  }}
                  className={`w-full text-left group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer block ${
                    isExpanded 
                      ? 'bg-[#151515] border-primary/30 shadow-[0_0_30px_rgba(250,204,21,0.05)] p-6 md:p-8' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04] p-6'
                  }`}
                >
                  {/* Subtle shimmer effect on hover when collapsed */}
                  {!isExpanded && (
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
                  )}

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl flex-shrink-0 transition-colors duration-500 ${isExpanded ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                        <Compass className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className={`text-2xl md:text-3xl font-bold transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                          {domain}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                          {domainBlogs.length} {domainBlogs.length === 1 ? 'Article' : 'Articles'} available
                        </p>
                      </div>
                    </div>
                    {!searchTerm && (
                      <div className="flex items-center gap-3 text-sm font-semibold text-gray-500 group-hover:text-primary transition-colors">
                        {isExpanded ? 'Close section' : 'Browse articles'}
                        <div className={`p-2 rounded-full transition-all duration-500 ${isExpanded ? 'bg-primary/20 text-primary rotate-180' : 'bg-white/5 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
                
                {/* Blog Grid (Only visible when expanded) */}
                {isExpanded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                    {domainBlogs.map((blog) => (
                      <Link
                        key={blog.slug}
                        to={`/blogs/${blog.slug}`}
                        className="group flex flex-col h-full overflow-hidden rounded-2xl bg-[#111] border border-white/5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
                      >
                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                          {/* Card Header (Domain & Difficulty) */}
                          <div className="flex items-start justify-between mb-5">
                            {blog.metadata.domain && (
                              <span className="inline-flex text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary">
                                {blog.metadata.domain}
                              </span>
                            )}
                            {blog.metadata.difficulty && (
                              <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${getDifficultyColors(blog.metadata.difficulty)}`}>
                                {blog.metadata.difficulty}
                              </span>
                            )}
                          </div>
                          
                          {/* Title & Description */}
                          <h3 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 group-hover:text-primary transition-colors leading-tight">
                            {truncateWords(blog.metadata.title, 12)}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                            {blog.metadata.description}
                          </p>
                          
                          {/* Footer Info */}
                          <div className="mt-auto pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-4">
                              <div className="flex items-center gap-2">
                                <User className="h-3.5 w-3.5" />
                                <span>{blog.metadata.author}</span>
                              </div>
                              {blog.metadata.readTime && (
                                <div className="flex items-center gap-1.5 opacity-80">
                                  <Clock className="h-3 w-3" />
                                  <span>{blog.metadata.readTime}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {blog.metadata.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-[10px] font-semibold text-gray-400 group-hover:text-gray-300 transition-colors"
                                >
                                  <Tag className="h-2.5 w-2.5" />
                                  {tag}
                                </span>
                              ))}
                              {blog.metadata.tags.length > 3 && (
                                <span className="inline-flex items-center px-2 py-1 text-[10px] font-semibold text-gray-600">
                                  +{blog.metadata.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty State */}
          {filteredBlogs.length === 0 && (
            <div className="text-center py-24 px-4 border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
              <Search className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No algorithms found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any articles matching "{searchTerm}". Try adjusting your filters or search terms.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedDomain('All'); }}
                className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-full transition-colors text-sm font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
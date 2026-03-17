import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../utils/blogUtils';
import { truncateWords } from '../utils/textUtils';
import { Calendar, User, Tag, BookOpen, Clock, Search } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop'; // 🟢 Import ScrollToTop component

export function Blogs() {
  const allBlogs = getBlogPosts();
  
  // Extract unique domains
  const domains = ['All', ...Array.from(new Set(allBlogs.map(b => b.metadata.domain).filter(Boolean)))];
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogs = allBlogs.filter((b) => {
    const matchesDomain = selectedDomain === 'All' || b.metadata.domain === selectedDomain;
    const matchesSearch = b.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.metadata.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark">
      <ScrollToTop /> {/* 🟢 Add ScrollToTop component */}
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-0.5 w-12 bg-primary/50"></div>
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="h-0.5 w-12 bg-primary/50"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent pb-2">
            Explore Our Tech Blogs
          </h1>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="w-full bg-white/5 border border-white/10 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder-gray-500"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category/Domain Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedDomain === domain 
                  ? 'bg-primary text-dark shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 md:gap-10">
          {domains.filter(d => d !== 'All').filter(d => selectedDomain === 'All' || d === selectedDomain).map(domain => {
            const domainBlogs = blogs.filter(b => b.metadata.domain === domain);
            
            if (domainBlogs.length === 0) return null;

            const showBlogs = selectedDomain !== 'All' || searchTerm !== '';

            return (
              <div key={domain} className={showBlogs ? 'space-y-6' : ''}>
                <div 
                  className={`flex items-center gap-4 ${!showBlogs ? 'cursor-pointer group py-4 hover:bg-white/5 rounded-xl px-4 transition-all border border-transparent hover:border-white/10' : ''}`}
                  onClick={() => !showBlogs && setSelectedDomain(domain)}
                >
                  <h2 className={`text-2xl md:text-3xl font-bold text-white ${!showBlogs ? 'group-hover:text-primary transition-colors' : ''}`}>
                    {domain}
                    {!showBlogs && (
                      <span className="text-sm md:text-base font-normal text-gray-400 ml-3">
                        ({domainBlogs.length} {domainBlogs.length === 1 ? 'blog' : 'blogs'})
                      </span>
                    )}
                  </h2>
                  <div className="h-px bg-white/10 flex-grow"></div>
                  {!showBlogs && (
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-sm font-semibold whitespace-nowrap hidden md:block">
                      View all →
                    </span>
                  )}
                </div>
                
                {showBlogs && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domainBlogs.map((blog) => (
                      <Link
                        key={blog.slug}
                        to={`/blogs/${blog.slug}`}
                        className="group cursor-pointer overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:bg-white/20"
                      >
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            {blog.metadata.domain && (
                              <span className="inline-flex py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                                {blog.metadata.domain}
                              </span>
                            )}
                            {blog.metadata.difficulty && (
                              <span className={`inline-flex py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider ${
                                blog.metadata.difficulty === 'Beginner' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                blog.metadata.difficulty === 'Intermediate' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                                'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {blog.metadata.difficulty}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-primary" />
                              <span>{blog.metadata.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{new Date(blog.metadata.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3 leading-tight flex-grow">
                            {truncateWords(blog.metadata.title, 10)}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                            {blog.metadata.description}
                          </p>
                          <div className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                            {blog.metadata.readTime && (
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{blog.metadata.readTime}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {blog.metadata.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
                              >
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import { BlogPost, INITIAL_POSTS } from '../data/blogPosts';
import { 
  Search, 
  Heart, 
  Clock, 
  Calendar, 
  Share2, 
  ArrowRight, 
  X, 
  Bookmark, 
  BookOpen,
  Sparkles
} from 'lucide-react';

interface BlogPageProps {
  showToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ showToast }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('nexora_blog_likes');
    if (!saved) return INITIAL_POSTS;
    try {
      const parsedLikes: Record<number, number> = JSON.parse(saved);
      return INITIAL_POSTS.map(p => ({
        ...p,
        likes: parsedLikes[p.id] ?? p.likes
      }));
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('nexora_blog_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Categories
  const categories = ['All', 'AI', 'Blockchain', 'Engineering', 'Design', 'Life'];

  // Handle Like
  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPosts(prev => {
      const updated = prev.map(p => {
        if (p.id === id) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      });
      // Save likes map
      const likesMap: Record<number, number> = {};
      updated.forEach(p => { likesMap[p.id] = p.likes; });
      localStorage.setItem('nexora_blog_likes', JSON.stringify(likesMap));
      return updated;
    });
    showToast('Liked Article', 'Thank you for your feedback!', 'success');
  };

  // Handle Bookmark
  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: number[];
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(b => b !== id);
      showToast('Bookmark Removed', 'Article removed from your saved list.', 'info');
    } else {
      updated = [...bookmarkedIds, id];
      showToast('Bookmarked!', 'Article saved to your reading list.', 'success');
    }
    setBookmarkedIds(updated);
    localStorage.setItem('nexora_blog_bookmarks', JSON.stringify(updated));
  };

  // Handle Share
  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/#blog-${post.id}`);
      showToast('Link Copied', `Share link for "${post.title}" copied to clipboard.`, 'success');
    }
  };

  // Filtered
  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const queryLower = searchQuery.toLowerCase().trim();
      const matchSearch = !queryLower ||
        p.title.toLowerCase().includes(queryLower) ||
        p.excerpt.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower) ||
        p.content.some(c => c.toLowerCase().includes(queryLower));

      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured Article
  const featuredPost = posts[0];

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold tracking-widest text-blue-500 uppercase">
          — The Journal — Vol. 02 —
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--text)]">
          Crafted Engineering Thoughts
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Essays, architectural teardowns, and quiet reflections on building scalable software people love to use every day.
        </p>

        {/* Search & Category Filter Toolbar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search essays, topics, keywords..."
              className="w-full text-xs bg-[var(--surface)] border border-[var(--surface-border)] rounded-full pl-10 pr-4 py-2.5 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--surface-border)] hover:text-[var(--text)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Lead Story Showcase (When on 'All' and no search query) */}
      {selectedCategory === 'All' && !searchQuery && featuredPost && (
        <div 
          onClick={() => setSelectedPost(featuredPost)}
          className="cursor-pointer group p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 aspect-[16/10] rounded-2xl overflow-hidden bg-black/40 relative">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                Featured Essay
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="text-blue-400 font-semibold uppercase tracking-wider text-[11px]">{featuredPost.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredPost.readTime}</span>
              <span>·</span>
              <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text)] tracking-tight leading-tight group-hover:text-blue-400 transition-colors">
              {featuredPost.title}
            </h2>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              {featuredPost.excerpt}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                Read Full Story <ArrowRight className="w-3.5 h-3.5" />
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleLike(featuredPost.id, e)}
                  className="p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs text-[var(--text-muted)] hover:text-rose-400 hover:border-rose-400/40 flex items-center gap-1.5 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
                  <span className="font-mono">{featuredPost.likes}</span>
                </button>
                <button
                  onClick={(e) => toggleBookmark(featuredPost.id, e)}
                  className={`p-2 rounded-lg border transition-colors ${
                    bookmarkedIds.includes(featuredPost.id)
                      ? 'bg-blue-600/10 text-blue-400 border-blue-500/30'
                      : 'bg-[var(--surface-elevated)] border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Showing {filteredPosts.length} Articles
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center text-[var(--text-muted)] space-y-2">
            <BookOpen className="w-8 h-8 mx-auto opacity-40" />
            <p className="text-sm">No articles found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs text-blue-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => {
              const isBookmarked = bookmarkedIds.includes(post.id);
              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer group p-5 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image with sensible clean treatment */}
                    <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-black/30 relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm border border-white/10">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mb-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      <span>·</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--text)] tracking-tight leading-snug group-hover:text-blue-400 transition-colors mb-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-0.5 transition-transform">
                      Read Article →
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleLike(post.id, e)}
                        title="Like this article"
                        className="p-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[11px] text-[var(--text-muted)] hover:text-rose-400 hover:border-rose-400/30 flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500/20" />
                        <span className="font-mono">{post.likes}</span>
                      </button>
                      <button
                        onClick={(e) => toggleBookmark(post.id, e)}
                        title={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-blue-600/10 text-blue-400 border-blue-500/30'
                            : 'bg-[var(--surface-elevated)] border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text)]'
                        }`}
                      >
                        <Bookmark className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => handleShare(post, e)}
                        title="Share article link"
                        className="p-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] disabled:opacity-30 hover:bg-[var(--surface)] transition-colors"
            >
              ← Previous
            </button>
            <span className="text-xs text-[var(--text-muted)] px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[var(--surface-border)] disabled:opacity-30 hover:bg-[var(--surface)] transition-colors"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Full Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--surface-border)]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                {selectedPost.category}
              </span>
              <button 
                onClick={() => setSelectedPost(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-[var(--surface-elevated)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight leading-tight">
                {selectedPost.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-2">
                <span>By Nexora Research</span>
                <span>·</span>
                <span>{new Date(selectedPost.date).toLocaleDateString()}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selectedPost.readTime}</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-black/40">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm text-[var(--text)] leading-relaxed">
              {selectedPost.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Key Takeaway box */}
            <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] space-y-1.5">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Key Architectural Takeaway
              </span>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Clean abstractions and accessibility are not overhead; they are the primary drivers of compounding engineering velocity.
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between">
              <button
                onClick={(e) => handleLike(selectedPost.id, e)}
                className="px-4 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs text-[var(--text)] hover:text-rose-400 flex items-center gap-2 transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                <span>{selectedPost.likes} Likes</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(selectedPost, e)}
                  className="px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs text-[var(--text)] hover:bg-[var(--surface-border)] flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

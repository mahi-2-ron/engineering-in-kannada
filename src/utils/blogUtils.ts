import { BlogMetadata, BlogPost } from '../types';

// Import all blog content files
const blogModules = import.meta.glob('../blogs/*/content.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

// Import all metadata files
const metadataModules = import.meta.glob('../blogs/*/metadata.json', {
  eager: true,
  import: 'default',
});

export const getBlogPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];

  for (const [path, content] of Object.entries(blogModules)) {
    // Extract the slug from the path (e.g., '../blogs/sample-blog/content.md' -> 'sample-blog')
    const slug = path.split('/')[2];
    const metadataPath = path.replace('content.md', 'metadata.json');
    const metadata = metadataModules[metadataPath] as BlogMetadata;

    if (metadata) {
      posts.push({
        metadata,
        content: content as string,
        slug,
      });
    }
  }

  return posts;
};

export const getBlogPost = (slug: string): BlogPost | null => {
  const contentPath = `../blogs/${slug}/content.md`;
  const metadataPath = `../blogs/${slug}/metadata.json`;

  const content = blogModules[contentPath] as string;
  const metadata = metadataModules[metadataPath] as BlogMetadata;

  if (!content || !metadata) {
    return null;
  }

  return {
    metadata,
    content,
    slug,
  };
};

export const getRelatedBlogs = (currentSlug: string, limit: number = 3): BlogPost[] => {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return [];

  const allPosts = getBlogPosts().filter(post => post.slug !== currentSlug);

  // Score posts: +2 for matching domain, +1 for each matching tag
  const scoredPosts = allPosts.map(post => {
    let score = 0;
    if (post.metadata.domain === currentPost.metadata.domain) score += 2;
    
    if (post.metadata.tags && currentPost.metadata.tags) {
      const commonTags = post.metadata.tags.filter(tag => currentPost.metadata.tags.includes(tag));
      score += commonTags.length;
    }
    
    return { post, score };
  });

  // Sort by score descending
  scoredPosts.sort((a, b) => b.score - a.score);

  // Return top N
  return scoredPosts.slice(0, limit).map(sp => sp.post);
};
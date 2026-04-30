import { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { BlogPost } from '../types';

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Prophetic Medicine: Benefits of Kalizira',
    excerpt: 'Exploring the science and tradition behind the "cure for everything except death".',
    content: 'Long form content here...',
    author: 'Dr. Wellness',
    imageUrl: 'https://images.unsplash.com/photo-1544833058-e70f9ca25c17?q=80&w=1200',
    tags: ['Health', 'Research'],
    type: 'spotlight',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'How to Identify Pure Raw Honey at Home',
    excerpt: 'Simple tests to ensure your honey is free from sugar syrup and additives.',
    content: 'Tutorial content here...',
    author: 'Honey Expert',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200',
    tags: ['Honey', 'Purity'],
    type: 'tutorial',
    createdAt: Date.now() - 86400000
  }
];

export default function Blog() {
  const [activeType, setActiveType] = useState<'all' | 'tutorial' | 'spotlight'>('all');

  const filteredPosts = activeType === 'all' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.type === activeType);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Blog Header */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-brand-night tracking-tighter">
            CRAFTED STORIES.
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed">
            A home for the curious maker. Dive into the history of high-end crafts and learn the skills to create your own.
          </p>
          
          <div className="flex items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => setActiveType('all')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeType === 'all' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              All Stories
            </button>
            <button 
              onClick={() => setActiveType('spotlight')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeType === 'spotlight' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              Spotlights
            </button>
            <button 
              onClick={() => setActiveType('tutorial')}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${activeType === 'tutorial' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-100'}`}
            >
              Tutorials
            </button>
          </div>
        </div>

        {/* Featured Post */}
        {activeType === 'all' && <BlogCard post={MOCK_POSTS[0]} featured />}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post, idx) => {
            // Skip the first one if we're in "all" view because it's featured
            if (activeType === 'all' && idx === 0) return null;
            return <BlogCard key={post.id} post={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

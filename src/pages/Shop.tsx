import { useState } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Raw Sundarbans Honey',
    description: 'Wild, forest-extracted honey with zero additives. Rich in antioxidants and natural enzymes.',
    price: 18,
    category: 'Pure Honey',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800'],
    inventory: 50,
    rating: 4.9,
    reviewsCount: 42,
    tags: ['raw', 'organic', 'honey'],
    artist: 'Green Touch',
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Cold-Pressed Kalizira Oil',
    description: 'Premium black seed oil extracted using traditional cold-press methods to preserve medicinal properties.',
    price: 24,
    category: 'Herbal Oils',
    images: ['https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=800'],
    inventory: 30,
    rating: 5.0,
    reviewsCount: 28,
    tags: ['kalizira', 'blackseed', 'immunity'],
    artist: 'Green Touch',
    createdAt: Date.now() - 86400000
  },
  {
    id: '3',
    name: 'Organic Kalizira Seeds',
    description: 'Whole black cumin seeds, sun-dried and sorted for maximum potency.',
    price: 12,
    category: 'Wellness',
    images: ['https://images.unsplash.com/photo-1544833058-e70f9ca25c17?q=80&w=800'],
    inventory: 100,
    rating: 4.8,
    reviewsCount: 15,
    tags: ['superfood', 'digestive'],
    artist: 'Green Touch',
    createdAt: Date.now() - 172800000
  }
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Pure Honey', 'Kalizira', 'Herbal Oils', 'Wellness'];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Shop Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-night tracking-tight">
              THE MARKETPLACE.
            </h1>
            <p className="text-zinc-500 max-w-md">
              Browse our complete collection of handmade treasures, each with a unique history and creator.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-brand-teal transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search crafts or artists..."
                className="pl-11 pr-6 py-3 bg-white rounded-2xl border border-zinc-200 outline-hidden focus:ring-2 focus:ring-brand-emerald/20 focus:border-brand-emerald transition-all w-full md:w-64 shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-3 bg-white rounded-2xl border border-zinc-200 text-brand-night hover:bg-zinc-50 transition-colors shadow-sm flex items-center gap-2"
            >
              <SlidersHorizontal size={18} />
              <span className="hidden md:inline font-bold text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat 
                ? 'bg-brand-night text-white shadow-xl shadow-brand-night/10Scale-105' 
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Sidebar/Dropdown Area (Expandable) */}
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8 bg-white rounded-[32px] border border-zinc-100 shadow-sm"
          >
            <div className="space-y-4">
              <h4 className="font-bold text-brand-night uppercase text-xs tracking-widest">Sort By</h4>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="radio" name="sort" /> Newest Arrivals</label>
                <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="radio" name="sort" /> Price: Low to High</label>
                <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="radio" name="sort" /> Price: High to Low</label>
                <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="radio" name="sort" /> Best Rating</label>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-brand-night uppercase text-xs tracking-widest">Price Range</h4>
              <input type="range" className="w-full accent-brand-emerald" min="0" max="1000" />
              <div className="flex justify-between text-xs text-zinc-500 font-medium">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-brand-night uppercase text-xs tracking-widest">Availability</h4>
              <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="checkbox" className="rounded" /> In Stock Only</label>
              <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="checkbox" className="rounded" /> Ready to Ship</label>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-brand-emerald/10 text-brand-emerald py-3 rounded-xl font-bold text-sm hover:bg-brand-emerald hover:text-white transition-all">
                Apply All Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 space-y-4">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto text-zinc-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-brand-night">No crafts found</h3>
            <p className="text-zinc-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
              className="text-brand-emerald font-bold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

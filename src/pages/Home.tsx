import { motion } from 'motion/react';
import { ArrowRight, Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Pure Honey', icon: '🍯', count: 12, color: 'bg-amber-50' },
  { name: 'Kalizira', icon: '🌿', count: 8, color: 'bg-zinc-50' },
  { name: 'Herbal Oils', icon: '💧', count: 15, color: 'bg-emerald-50' },
  { name: 'Wellness', icon: '🧘', count: 24, color: 'bg-blue-50' },
];

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-night">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1585499193151-0f50d54c4e1c?q=80&w=2000" 
            alt="Pure honey and herbs" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-brand-night via-transparent to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-teal/20 backdrop-blur-md rounded-full text-brand-teal text-xs font-semibold tracking-wider uppercase border border-brand-teal/30">
              <Star size={14} />
              <span>100% Organic Wellness</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter">
              NATURE'S <br />
              <span className="text-brand-leaf underline decoration-brand-emerald decoration-4 underline-offset-8">GIFT</span> TO YOU.
            </h1>
            
            <p className="text-zinc-300 text-lg md:text-xl max-w-lg leading-relaxed">
              Experience the healing power of earth. From Sundarbans Honey to premium Nigella seeds, we bring purity to your doorstep.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-brand-emerald hover:bg-brand-leaf text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 group transition-all"
              >
                Shop Collection
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/blog" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                Read Tutorials
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-brand-night mb-2">Curated Categories</h2>
            <p className="text-zinc-500">Explore our most popular handmade domains</p>
          </div>
          <Link to="/shop" className="text-brand-emerald font-semibold flex items-center gap-2 group">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${cat.color} p-8 rounded-3xl group cursor-pointer hover:shadow-lg transition-all`}
            >
              <span className="text-4xl mb-4 block group-hover:scale-125 transition-transform">{cat.icon}</span>
              <h3 className="font-bold text-xl text-brand-night">{cat.name}</h3>
              <p className="text-zinc-500 text-sm">{cat.count}+ items</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Highlight */}
      <section className="bg-zinc-100 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="flex-1 space-y-8">
               <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-night leading-[1.0]">
                 The Ceramic <br /> Collection 2026.
               </h2>
               <p className="text-zinc-600 text-lg leading-relaxed">
                 Hand-thrown in the heart of Florence, our newest ceramic series features earthy textures and minimalist profiles. Each piece is numbered and signed by the artist.
               </p>
               <button className="text-brand-night font-bold underline decoration-brand-emerald decoration-2 underline-offset-8">
                 Meet the Artist: Elena K.
               </button>
             </div>
             
             <div className="flex-1 relative">
               <div className="aspect-square bg-white rounded-full scale-110 shadow-xl overflow-hidden">
                 <img 
                   src="https://images.unsplash.com/photo-1578749553570-2cc03ca9298d?q=80&w=1200" 
                   alt="Featured product"
                   className="w-full h-full object-cover"
                 />
               </div>
               <div className="absolute top-0 right-0 bg-white p-6 rounded-2xl shadow-xl max-w-[180px] -rotate-6">
                  <span className="text-brand-emerald font-bold mb-1 block">Staff Pick</span>
                  <p className="text-xs text-zinc-500 italic">"The texture is unlike anything I've seen. Truly a masterpiece."</p>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-zinc-100 py-16">
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 bg-brand-emerald/10 rounded-2xl flex items-center justify-center text-brand-emerald">
            <Truck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-brand-night">Carbon Neutral</h4>
            <p className="text-sm text-zinc-500">Eco-friendly shipping options</p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-brand-night">Secure Trades</h4>
            <p className="text-sm text-zinc-500">100% verified artisan payments</p>
          </div>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="w-14 h-14 bg-brand-leaf/10 rounded-2xl flex items-center justify-center text-brand-leaf">
            <Heart size={28} />
          </div>
          <div>
            <h4 className="font-bold text-brand-night">Direct to Artist</h4>
            <p className="text-sm text-zinc-500">85% of revenue goes to the maker</p>
          </div>
        </div>
      </section>
    </div>
  );
}

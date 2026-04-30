import { motion } from 'motion/react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[32px] overflow-hidden border border-zinc-100 hover:shadow-2xl hover:shadow-brand-emerald/5 transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-600 hover:text-brand-teal transition-colors shadow-sm">
            <Heart size={18} />
          </button>
        </div>
        
        {product.inventory === 0 && (
          <div className="absolute inset-0 bg-brand-night/60 flex items-center justify-center text-white font-bold tracking-widest uppercase text-sm backdrop-blur-[2px]">
            Sold Out
          </div>
        )}

        <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
          <button className="w-full bg-brand-night text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-brand-emerald transition-colors">
            <ShoppingBag size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-display font-bold text-lg text-brand-night hover:text-brand-emerald transition-colors">
              {product.name}
            </h3>
            <p className="text-zinc-400 text-xs italic">By {product.artist}</p>
          </Link>
          <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded-lg">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-zinc-600">{product.rating}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xl font-display font-bold text-brand-night">${product.price}</span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold px-2 py-1 bg-zinc-100 rounded-md">
            {product.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

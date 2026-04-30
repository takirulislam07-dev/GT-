import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  ArrowLeft,
  MessageCircle,
  Share2
} from 'lucide-react';
import { Product, Review } from '../types';

const MOCK_REVIEWS: Review[] = [
  { id: 'r1', productId: '1', userId: 'u1', userName: 'Sarah L.', rating: 5, comment: 'Absolutely stunning work. The glaze caught the light exactly as shown in the photos.', createdAt: Date.now() - 172800000 },
  { id: 'r2', productId: '1', userId: 'u2', userName: 'James M.', rating: 4, comment: 'Well packaged and fast delivery. The vessel is slightly smaller than I imagined but still beautiful.', createdAt: Date.now() - 432000000 }
];

export default function ProductDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // In a real app, we'd fetch this from Firebase
  const product: Product = {
    id: id || '1',
    name: 'Glazed Sun Pitcher',
    description: 'Each piece is hand-thrown and double-fired in our Umbrian workshop. The "Sun" glaze is a reactive finish that creates unique crystalline patterns on every surface, meaning no two pitchers are exactly alike. Perfect for table service or as a sculptural statement piece.',
    price: 58,
    category: 'Ceramics',
    images: [
      'https://images.unsplash.com/photo-1578749553570-2cc03ca9298d?q=80&w=1200',
      'https://images.unsplash.com/photo-1544450290-7822453e0f06?q=80&w=1200'
    ],
    inventory: 10,
    rating: 4.8,
    reviewsCount: 12,
    tags: ['blue', 'pottery', 'kitchen'],
    artist: 'Elena K.',
    createdAt: Date.now()
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumbs */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-brand-night transition-colors">
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Section */}
          <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="aspect-[4/5] rounded-[40px] overflow-hidden border border-zinc-100 shadow-sm"
            >
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </motion.div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-emerald' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-8">
            <div className="space-y-4">
               <div className="flex justify-between items-start">
                 <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-night tracking-tight uppercase">
                   {product.name}
                 </h1>
                 <div className="flex gap-2">
                   <button className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-brand-emerald transition-colors"><Heart size={20} /></button>
                   <button className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 hover:text-brand-emerald transition-colors"><Share2 size={20} /></button>
                 </div>
               </div>
               
               <div className="flex items-center gap-6">
                 <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                   <Star size={14} className="text-amber-500 fill-amber-500" />
                   <span className="text-sm font-bold text-amber-700">{product.rating}</span>
                   <span className="text-sm text-amber-600/70 ml-1">({product.reviewsCount} reviews)</span>
                 </div>
                 <span className="text-zinc-400 font-medium">•</span>
                 <p className="text-zinc-500 text-sm">Artist: <span className="text-brand-night font-bold uppercase tracking-wide">{product.artist}</span></p>
               </div>
            </div>

            <div className="text-3xl font-display font-bold text-brand-night">
              ${product.price}
            </div>

            <p className="text-zinc-600 leading-relaxed text-lg italic">
              "{product.description}"
            </p>

            <hr className="border-zinc-100" />

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center bg-zinc-100 rounded-full p-1 border border-zinc-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:text-brand-emerald transition-colors">-</button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center font-bold text-lg hover:text-brand-emerald transition-colors">+</button>
                </div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  {product.inventory} pieces available
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-brand-night text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-brand-emerald transition-all transform active:scale-95 shadow-xl shadow-brand-night/10">
                  <ShoppingBag size={22} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-zinc-100 flex items-center gap-4">
                 <ShieldCheck className="text-brand-teal" size={24} />
                 <span className="text-xs font-bold text-brand-night uppercase tracking-wider">Secure <br /> Checkout</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-zinc-100 flex items-center gap-4">
                 <Truck className="text-brand-teal" size={24} />
                 <span className="text-xs font-bold text-brand-night uppercase tracking-wider">Fast <br /> Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Reviews / Artist) */}
        <div className="pt-24 space-y-12">
          <div className="flex gap-12 border-b border-zinc-100 pb-4">
            <button className="text-xl font-display font-bold text-brand-night relative after:absolute after:-bottom-5 after:left-0 after:right-0 after:h-1 after:bg-brand-emerald">Reviews</button>
            <button className="text-xl font-display font-bold text-zinc-400 hover:text-brand-night transition-colors">Meet the Artist</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
               {MOCK_REVIEWS.map(review => (
                 <div key={review.id} className="space-y-3 pb-8 border-b border-zinc-100 last:border-0">
                   <div className="flex justify-between">
                     <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={14} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-zinc-200"} />
                       ))}
                     </div>
                     <span className="text-xs text-zinc-400 font-medium">Verified Purchase</span>
                   </div>
                   <p className="text-zinc-700 leading-relaxed font-medium">"{review.comment}"</p>
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-brand-emerald/10 flex items-center justify-center text-brand-emerald font-bold text-xs uppercase">{review.userName.charAt(0)}</div>
                       <span className="text-xs font-bold text-brand-night">{review.userName}</span>
                     </div>
                     <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</span>
                   </div>
                 </div>
               ))}
               
               <button className="flex items-center gap-2 text-brand-emerald font-bold border-b border-brand-emerald leading-tight pb-1">
                 <MessageCircle size={18} />
                 Write a Review
               </button>
            </div>

            <div className="space-y-6">
              <div className="p-8 bg-zinc-900 rounded-[32px] text-white space-y-6">
                <h4 className="text-2xl font-display font-bold leading-tight">Need a customized version?</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">Most of our artists accept custom commissions for specific sizes or colorways. Start a conversation with Elena K.</p>
                <button className="w-full bg-brand-emerald py-4 rounded-xl font-bold hover:bg-brand-leaf transition-colors">Contact Artist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

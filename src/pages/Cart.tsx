import { useCart } from '../CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold text-brand-night">Your cart is empty</h2>
        <p className="text-zinc-500 max-w-sm">Looks like you haven't added any handmade treasures yet. Let's find something unique!</p>
        <Link to="/shop" className="bg-brand-emerald text-white px-8 py-4 rounded-full font-bold hover:bg-brand-leaf transition-all">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-display font-bold text-brand-night tracking-tight uppercase">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-[32px] border border-zinc-100 shadow-sm flex gap-6 items-center"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <Link to={`/product/${item.productId}`} className="font-display font-bold text-lg text-brand-night hover:text-brand-emerald">
                        {item.product.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400 italic">By {item.product.artist}</p>
                    
                    <div className="flex justify-between items-end pt-2">
                       <div className="flex items-center bg-zinc-50 rounded-lg border border-zinc-100 px-2 py-1">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center font-bold text-lg">-</button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center font-bold text-lg">+</button>
                       </div>
                       <span className="font-display font-bold text-brand-night">${item.product.price * item.quantity}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-zinc-100 shadow-xl space-y-6">
              <h3 className="text-2xl font-display font-bold text-brand-night">Order Summary</h3>
              
              <div className="space-y-4 text-sm font-medium text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-brand-night">${cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-brand-emerald">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="text-brand-night">$0.00</span>
                </div>
                <hr className="border-zinc-100" />
                <div className="flex justify-between text-lg font-bold text-brand-night">
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
              </div>

              <button className="w-full bg-brand-night text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-emerald transition-all shadow-lg shadow-brand-night/10 flex items-center justify-center gap-2 group">
                Checkout Now
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 pt-4 grayscale opacity-50">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>
            </div>

            <div className="p-6 bg-brand-emerald/5 rounded-3xl border border-brand-emerald/10">
               <p className="text-xs text-brand-forest font-bold mb-2 uppercase tracking-widest">Green Promise</p>
               <p className="text-xs text-brand-teal leading-relaxed">Every purchase supports carbon-neutral shipping and fair wages for artisanal creators.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Leaf, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-night text-zinc-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Leaf className="text-brand-leaf" size={24} />
            <span className="text-xl font-display font-bold tracking-tight">
              GREEN TOUCH
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            Sustainable, handmade crafts made with love and a touch of nature. Supporting local artists worldwide.
          </p>
          <div className="flex gap-4">
            <Instagram size={20} className="hover:text-brand-leaf cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-brand-leaf cursor-pointer transition-colors" />
            <Facebook size={20} className="hover:text-brand-leaf cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Shop</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/shop?category=honey" className="hover:text-white transition-colors">Pure Honey</Link></li>
            <li><Link to="/shop?category=seeds" className="hover:text-white transition-colors">Super Seeds</Link></li>
            <li><Link to="/shop?category=oils" className="hover:text-white transition-colors">Herbal Oils</Link></li>
            <li><Link to="/shop?category=supplements" className="hover:text-white transition-colors">Natural Supplements</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Join our Newsletter</h4>
          <p className="text-sm mb-4">Get craft tutorials and artist spotlights delivered to your inbox.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address"
              className="bg-zinc-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-emerald w-full outline-hidden"
            />
            <button className="bg-brand-emerald hover:bg-brand-leaf text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-zinc-800 text-xs flex flex-col md:flex-row justify-between gap-4">
        <p>&copy; 2026 Green Touch Crafts. All rights reserved.</p>
        <div className="flex gap-6">
          <span>Made with ❤️ for artists</span>
        </div>
      </div>
    </footer>
  );
}

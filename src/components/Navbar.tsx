import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  User, 
  Settings,
  Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import { LogOut } from 'lucide-react';

function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItemsCount } = (() => {
    const { cart } = useCart();
    return { cartItemsCount: cart.reduce((acc, item) => acc + item.quantity, 0) };
  })();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'Our Story', path: '/about' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-brand-night rounded-full flex items-center justify-center text-brand-leaf group-hover:scale-110 transition-transform">
            <Leaf size={24} />
          </div>
          <span className={cn(
            "text-xl font-display font-bold tracking-tight transition-colors",
            isScrolled ? "text-brand-night" : "text-brand-night" 
          )}>
            GREEN TOUCH
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-teal",
                location.pathname === link.path ? "text-brand-teal" : "text-zinc-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button className="text-zinc-600 hover:text-brand-teal transition-colors">
            <Search size={20} />
          </button>
          <Link to="/wishlist" className="text-zinc-600 hover:text-brand-teal transition-colors relative">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="text-zinc-600 hover:text-brand-teal transition-colors relative">
            <ShoppingBag size={20} />
            {cartItemsCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartItemsCount}
                className="absolute -top-2 -right-2 bg-brand-emerald text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartItemsCount}
              </motion.span>
            )}
          </Link>
          <div className="h-6 w-[1px] bg-zinc-200 hidden md:block" />
          {user ? (
            <div className="relative group">
              <Link to="/account" className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-night hover:text-brand-teal">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full border border-zinc-200" />
                ) : (
                  <User size={18} />
                )}
                <span className="max-w-[100px] truncate">{user.displayName || 'Account'}</span>
              </Link>
              
              {/* Desktop Dropdown */}
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white border border-zinc-100 rounded-2xl shadow-xl p-4 w-48 space-y-2">
                  <Link to="/account" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-brand-teal p-2 rounded-lg hover:bg-zinc-50">
                    <User size={16} /> My Profile
                  </Link>
                  <Link to="/admin" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-brand-teal p-2 rounded-lg hover:bg-zinc-50">
                    <Settings size={16} /> Admin Panel
                  </Link>
                  <hr className="border-zinc-100" />
                  <button 
                    onClick={() => logout()}
                    className="w-full flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-brand-night hover:text-brand-teal">
              <User size={18} />
              <span>Login</span>
            </Link>
          )}
          
          <button 
            className="md:hidden text-brand-night"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 shadow-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-zinc-800 hover:text-brand-teal"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-zinc-100" />
              {user ? (
                <>
                  <Link to="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-zinc-800">
                    <User size={20} /> My Profile
                  </Link>
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-zinc-800">
                    <Settings size={20} /> Admin Panel
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-lg font-medium text-red-500"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-zinc-800">
                  <User size={20} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

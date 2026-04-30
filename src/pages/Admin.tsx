import { useState } from 'react';
import { BarChart3, Package, ShoppingBag, Users, Plus, MoreVertical, Edit, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Raw Sundarbans Honey',
    price: 18,
    category: 'Pure Honey',
    inventory: 50,
    rating: 4.9,
    reviewsCount: 42,
    artist: 'Green Touch',
    images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200'],
    description: '',
    tags: [],
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'Kalizira Oil (500ml)',
    price: 24,
    category: 'Herbal Oils',
    inventory: 5,
    rating: 5.0,
    reviewsCount: 28,
    artist: 'Green Touch',
    images: ['https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?q=80&w=200'],
    description: '',
    tags: [],
    createdAt: Date.now()
  }
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="min-h-screen pt-24 bg-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-100 hidden lg:flex flex-col p-6 space-y-8 fixed h-full">
        <div className="space-y-1">
           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] px-3 mb-2">Management</p>
           <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
           >
             <BarChart3 size={18} /> Dashboard
           </button>
           <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
           >
             <Package size={18} /> Inventory
           </button>
           <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
           >
             <ShoppingBag size={18} /> Orders
           </button>
           <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-brand-night text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}
           >
             <Users size={18} /> Customers
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow lg:ml-64 p-8 md:p-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center px-2">
            <div>
              <h1 className="text-3xl font-display font-bold text-brand-night uppercase">Control Center</h1>
              <p className="text-zinc-500 text-sm">Managing Green Touch Crafts Artisan marketplace</p>
            </div>
            <button className="bg-brand-emerald text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-leaf transition-all shadow-lg shadow-brand-emerald/10">
              <Plus size={20} /> Add Product
            </button>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm space-y-4">
               <div className="flex justify-between items-center">
                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><ShoppingBag size={24} /></div>
                 <span className="text-xs font-bold text-green-600">+12%</span>
               </div>
               <div>
                  <p className="text-zinc-400 text-sm font-medium">Total Sales</p>
                  <h3 className="text-3xl font-display font-bold text-brand-night">$12,480</h3>
               </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm space-y-4">
               <div className="flex justify-between items-center">
                 <div className="p-3 bg-brand-emerald/10 text-brand-emerald rounded-2xl"><CheckCircle2 size={24} /></div>
                 <span className="text-xs font-bold text-zinc-400">Stable</span>
               </div>
               <div>
                  <p className="text-zinc-400 text-sm font-medium">Active Orders</p>
                  <h3 className="text-3xl font-display font-bold text-brand-night">34</h3>
               </div>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-sm space-y-4">
               <div className="flex justify-between items-center">
                 <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Clock size={24} /></div>
                 <span className="text-xs font-bold text-red-500">-2%</span>
               </div>
               <div>
                  <p className="text-zinc-400 text-sm font-medium">Low Stock Items</p>
                  <h3 className="text-3xl font-display font-bold text-brand-night">8</h3>
               </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
               <h3 className="font-display font-bold text-xl text-brand-night uppercase">Live Inventory</h3>
               <div className="flex gap-2">
                  <button className="text-xs font-bold text-zinc-400 border border-zinc-200 px-3 py-1 rounded-lg">CSV Export</button>
                  <button className="text-xs font-bold text-zinc-400 border border-zinc-200 px-3 py-1 rounded-lg">Refresh</button>
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Product</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Artist</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Price</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Stock</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Rating</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {MOCK_PRODUCTS.map(product => (
                    <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <img src={product.images[0]} className="w-12 h-12 rounded-xl object-cover" />
                          <span className="font-bold text-brand-night text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm text-zinc-500 font-medium">{product.artist}</td>
                      <td className="px-8 py-6 text-sm font-bold text-brand-night">${product.price}</td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${product.inventory < 5 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-brand-emerald'}`}>
                          {product.inventory} in stock
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium text-zinc-500">{product.rating} / 5</td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          <button className="p-2 text-zinc-400 hover:text-brand-teal transition-colors"><Edit size={16} /></button>
                          <button className="p-2 text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                          <button className="p-2 text-zinc-400 hover:text-brand-night transition-colors"><MoreVertical size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-8 bg-zinc-50/50 border-t border-zinc-100 flex justify-between items-center">
              <span className="text-xs text-zinc-400 font-medium">Showing 2 of {MOCK_PRODUCTS.length} products</span>
              <div className="flex gap-4 items-center">
                 <button className="text-zinc-300 pointer-events-none text-xs font-bold uppercase tracking-widest leading-none">Prev</button>
                 <div className="flex gap-2">
                   <button className="w-8 h-8 bg-brand-night text-white rounded-lg text-xs font-bold">1</button>
                   <button className="w-8 h-8 hover:bg-zinc-200 rounded-lg text-xs font-bold text-zinc-400">2</button>
                 </div>
                 <button className="text-brand-night text-xs font-bold uppercase tracking-widest leading-none">Next</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

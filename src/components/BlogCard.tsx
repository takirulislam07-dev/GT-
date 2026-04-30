import { motion } from 'motion/react';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden flex items-end p-8 md:p-16 mb-12"
      >
        <div className="absolute inset-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-linear-to-t from-brand-night via-brand-night/40 to-transparent" />
        </div>
        
        <div className="relative max-w-2xl space-y-4">
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-brand-leaf bg-brand-leaf/10 backdrop-blur-md px-3 py-1 rounded-full border border-brand-leaf/20">
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
            {post.title}
          </h2>
          <p className="text-zinc-300 text-sm md:text-base line-clamp-2 max-w-xl">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-6 pt-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-2"><User size={14} className="text-brand-teal" /> {post.author}</span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-brand-teal" /> 8 min read</span>
            <Link to={`/blog/${post.id}`} className="flex items-center gap-2 text-white font-bold group-hover:translate-x-2 transition-transform">
              Read Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group space-y-6"
    >
      <div className="aspect-16/10 rounded-3xl overflow-hidden border border-zinc-100 shadow-sm">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="space-y-3 px-2">
        <div className="flex items-center gap-3 text-[10px] font-bold text-brand-teal uppercase tracking-widest">
          <span>{post.type}</span>
          <span className="w-1 h-1 bg-zinc-300 rounded-full" />
          <span>8 min read</span>
        </div>
        <h3 className="text-xl font-display font-bold text-brand-night group-hover:text-brand-teal transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
        <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-sm font-bold text-brand-night hover:gap-4 transition-all">
          Explore Tutorial <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

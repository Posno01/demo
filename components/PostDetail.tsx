
import React from 'react';
import { X, Calendar, Hash } from 'lucide-react';
import { Post } from '../types';

interface PostDetailProps {
  post: Post | null;
  onClose: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-stone-100/95 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-stone-900 hover:bg-stone-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex-1 overflow-y-auto bg-stone-50">
          <img 
            src={post.imageUrl} 
            alt={post.caption}
            className="w-full h-full object-contain md:object-cover"
          />
        </div>

        <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-stone-400">
              <Calendar size={12} />
              {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="h-1 w-1 bg-stone-300 rounded-full"></div>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-stone-400">
              <Hash size={12} />
              {post.category}
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl font-serif italic text-stone-800 leading-relaxed mb-8">
            "{post.caption}"
          </blockquote>

          <div className="pt-8 border-t border-stone-100">
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              This fragment was recorded as part of a series of observations on the intersection of light, space, and the everyday.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

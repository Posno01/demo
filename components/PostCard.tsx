
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      className="masonry-item group cursor-pointer overflow-hidden bg-white border border-stone-200"
      onClick={() => onClick(post)}
    >
      <div className="relative overflow-hidden aspect-auto">
        <img 
          src={post.imageUrl} 
          alt={post.caption}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
      </div>
      
      <div className="p-4 md:p-6">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2 block">
          {post.category}
        </span>
        <p className="text-stone-700 font-serif leading-relaxed line-clamp-2 italic">
          "{post.caption}"
        </p>
        <div className="mt-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-[10px] text-stone-400">
            {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

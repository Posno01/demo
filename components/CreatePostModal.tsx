
import React, { useState, useRef } from 'react';
import { X, Upload, Wand2, Loader2 } from 'lucide-react';
import { Post, CATEGORIES, Category } from '../types';
import { refineCaption } from '../services/gemini';

interface CreatePostModalProps {
  onClose: () => void;
  onSave: (post: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onSave }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<Category>('Atmosphere');
  const [isRefining, setIsRefining] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRefine = async () => {
    if (!caption.trim()) return;
    setIsRefining(true);
    const refined = await refineCaption(caption);
    setCaption(refined);
    setIsRefining(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl || !caption) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      caption: caption.slice(0, 300),
      category,
      createdAt: Date.now(),
    };

    onSave(newPost);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white p-8 md:p-12 shadow-xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-stone-900 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-serif mb-8 text-stone-900">Add New Fragment</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`group relative aspect-video flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all cursor-pointer overflow-hidden
              ${imageUrl ? 'border-transparent' : 'border-stone-200 hover:border-stone-400'}`}
          >
            {imageUrl ? (
              <>
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Change Image</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-stone-100 rounded-full text-stone-400 group-hover:text-stone-600 transition-colors">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-stone-600">Click to upload image</p>
                  <p className="text-xs text-stone-400 mt-1">Prefer aesthetic, high-quality shots</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-500">Caption / Observation</label>
              <button
                type="button"
                onClick={handleRefine}
                disabled={!caption || isRefining}
                className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-50"
              >
                {isRefining ? <Loader2 size={10} className="animate-spin" /> : <Wand2 size={10} />}
                {isRefining ? 'Refining...' : 'Refine with AI'}
              </button>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What did you observe in this moment?"
              maxLength={300}
              rows={3}
              className="w-full p-4 bg-stone-50 border border-stone-200 focus:outline-none focus:border-stone-400 transition-colors font-serif resize-none italic"
            />
            <div className="mt-1 text-right text-[10px] text-stone-400">
              {caption.length} / 300
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest text-stone-500 block mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    category === cat 
                      ? 'bg-stone-900 text-stone-50 border-stone-900' 
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!imageUrl || !caption}
            className="w-full py-4 bg-stone-900 text-stone-50 font-medium rounded-sm hover:bg-stone-800 disabled:bg-stone-200 transition-all"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;

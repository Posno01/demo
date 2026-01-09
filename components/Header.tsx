
import React from 'react';
import { Plus, Archive } from 'lucide-react';
import { Category, CATEGORIES } from '../types';

interface HeaderProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  onOpenCreate: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeCategory, setActiveCategory, onOpenCreate }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-100/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-900">
            Æsthetic Journal
          </h1>
          <p className="mt-4 text-stone-500 font-light max-w-sm">
            A quiet space for visual fragments and slow observations.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-wide transition-colors ${
                activeCategory === cat 
                  ? 'text-stone-900 font-medium underline underline-offset-8 decoration-stone-300' 
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {cat}
            </button>
          ))}
          
          <div className="h-4 w-[1px] bg-stone-300 mx-2 hidden md:block"></div>

          <button 
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-stone-50 text-sm rounded-full hover:bg-stone-800 transition-all shadow-sm"
          >
            <Plus size={16} />
            <span>New Entry</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

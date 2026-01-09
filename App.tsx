import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import CreatePostModal from './components/CreatePostModal';
import { Post, Category } from './types';

/** ===============================
 * DEMO MODE 설정
 * =============================== */
const IS_DEMO = true;

/** ===============================
 * 초기 체험용 데이터 (90일 전체 체험 가능)
 * =============================== */
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/10/800/1200',
    caption: 'The morning light hitting the linen curtains in a way that feels like a slow breath.',
    category: 'Atmosphere',
    createdAt: Date.now() - 10000000,
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/11/800/600',
    caption: 'A collection of smooth stones found at the shoreline, each carrying its own silent history.',
    category: 'Objects',
    createdAt: Date.now() - 20000000,
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/12/800/1000',
    caption: 'Distant mountains fading into a hazy gradient of blues and soft greys.',
    category: 'Places',
    createdAt: Date.now() - 30000000,
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/13/800/1300',
    caption: 'Fresh basil from the garden, its scent filling the kitchen as the sun begins to set.',
    category: 'Nature',
    createdAt: Date.now() - 40000000,
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/14/800/1100',
    caption: 'The geometric rhythm of old brickwork in the quiet alleys of the old town.',
    category: 'Places',
    createdAt: Date.now() - 50000000,
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/id/15/800/900',
    caption: 'Shadows of leaves dancing across a blank wall, a monochromatic performance.',
    category: 'Atmosphere',
    createdAt: Date.now() - 60000000,
  }
];

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /** ===============================
   * DEMO MODE: 항상 초기 데이터로 시작
   * (localStorage 사용 ❌)
   * =============================== */
  useEffect(() => {
    setPosts(INITIAL_POSTS);
  }, []);

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter(p => p.category === activeCategory);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => b.createdAt - a.createdAt
  );

  const handleSavePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ===============================
          DEMO MODE 배너
      =============================== */}
      {IS_DEMO && (
        <div className="fixed top-0 left-0 w-full bg-stone-200 text-stone-700 text-[11px] text-center py-2 z-50 tracking-widest">
          DEMO MODE · 로그인 없이 90일 전체를 자유롭게 체험할 수 있습니다
        </div>
      )}

      <Header
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onOpenCreate={() => setIsCreateModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20">
        {sortedPosts.length > 0 ? (
          <div className="masonry-grid columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {sortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={setSelectedPost}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 text-stone-400">
            <p className="font-serif italic text-xl">The journal is empty.</p>
            <p className="mt-2 text-sm">Begin by capturing a moment.</p>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-stone-400">
            &copy; {new Date().getFullYear()} Aura Journal — Demo Experience
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-stone-400">
            <a href="#" className="hover:text-stone-900 transition-colors">About</a>
            <a href="#" className="hover:text-stone-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {selectedPost && (
        <PostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {isCreateModalOpen && (
        <CreatePostModal
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSavePost}
        />
      )}
    </div>
  );
};

export default App;

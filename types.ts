
export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  category: string;
  createdAt: number;
}

export type Category = 'All' | 'Atmosphere' | 'Objects' | 'Nature' | 'Places' | 'Notes';

export const CATEGORIES: Category[] = ['All', 'Atmosphere', 'Objects', 'Nature', 'Places', 'Notes'];

'use client';

import {createContext, useState, useContext} from 'react';
import {PostData} from '@/app/lib/types';

type SearchContextType = {
  posts: PostData[];
  setPosts: (posts: PostData[]) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({children}: {children: React.ReactNode}) => {
  const [posts, setPosts] = useState<PostData[]>([]);
  return (
    <SearchContext.Provider value={{posts, setPosts}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
'use client';

import { createContext, ReactNode, useState } from 'react';
import { TodoContextType } from './TodoProvider.types';

const initialTodos = {
  items: [],
  setItems: () => {},
  announcement: '',
  setAnnouncement: () => {},
};

export const TodoContext = createContext<TodoContextType>(initialTodos);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [announcement, setAnnouncement] = useState('');

  return (
    <TodoContext.Provider
      value={{
        items,
        setItems,
        announcement,
        setAnnouncement,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

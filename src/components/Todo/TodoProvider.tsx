'use client';

import { createContext, ReactNode, useReducer } from 'react';
import { TodoContextType } from './TodoProvider.types';
import { todoReducer } from './utils/todoReducer';

const initialTodos = {
  items: [],
  setItems: () => {},
  announcement: '',
  setAnnouncement: () => {},
};

const initialContext = {
    state: initialTodos,
    dispatch: ()=>{}
}

export const TodoContext = createContext<TodoContextType>(initialContext);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [ state, dispatch] = useReducer(todoReducer, initialTodos)

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

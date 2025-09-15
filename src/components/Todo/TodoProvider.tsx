'use client';

import { createContext, ReactNode, useReducer } from 'react';
import { TodoContextType } from './Todo/Todo.types';
import { initialTodos, todoReducer } from './reducer';

const initialContext = {
  todo: initialTodos,
  dispatch: () => {},
};

export const TodoContext = createContext<TodoContextType>(initialContext);

// just a simple, boilerplate context provider. works with a useReducer hook
export function TodoProvider({ children }: { children: ReactNode }) {
  const [todo, dispatch] = useReducer(todoReducer, initialTodos);
  
  return (
    <TodoContext.Provider value={{ todo, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

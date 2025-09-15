import { Dispatch, SetStateAction } from 'react';

export interface TodoStateType {
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
  announcement: string;
  setAnnouncement: Dispatch<SetStateAction<string>>;
}

export interface TodoContextType {
  state: TodoStateType;
  dispatch: Dispatch<TodoAction>;
}

export enum ActionTypes {
  SET_ITEMS = 'SET_ITEMS',
  DELETE_ITEM = 'DELETE_ITEM',
  SET_ANNOUNCEMENT = 'SET_ANNOUNCEMENT',
}

export type TodoAction =
  | { type: 'SET_ITEMS'; payload: string[] }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'SET_ANNOUNCEMENT'; payload: string };

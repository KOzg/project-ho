import { Dispatch } from 'react';

export enum ItemStatus {
  IN_PROGRESS = 'In Progress',
  TO_DO = 'To Do',
  DONE = 'Done',
}

export type ItemList = {
  head: string;
  tail: string;
};

export type TodoItemType = {
  id: string;
  title: string;
  status: ItemStatus;
  next: string | null;
  prev: string | null;
};

export type TodoContextType = {
  todo: TodoType;
  dispatch: Dispatch<TodoAction>;
};

export enum ActionTypes {
  ADD_ITEM = 'ADD_ITEM',
  DELETE_ITEM = 'DELETE_ITEM',
  RESET_TODOS = 'RESET_TODOS',
  SET_TODOS = 'SET_TODOS',
}

export type TodoAction =
  | {
      type: ActionTypes.ADD_ITEM;
      payload: { title: string; status: ItemStatus };
    }
  | {
      type: ActionTypes.DELETE_ITEM;
      payload: { item: TodoItemType; isUpdate: boolean };
    }
  | {
      type: ActionTypes.RESET_TODOS;
    }
  | {
      type: ActionTypes.SET_TODOS;
      payload: TodoType;
    };

export type TodoType = {
  idLookup: Record<string, TodoItemType>;
  lists: {
    inProgress: ItemList;
    todos: ItemList;
    done: ItemList;
  };
};

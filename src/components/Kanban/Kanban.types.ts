export type Item = {
  id: string;
  title: string;
  status: ItemStatusEnum;
  next: string | null;
  prev: string | null;
};

export type KanbanBoard = {
  idLookup: {
    byId: Record<string, Item>;
    idsByStatus: Record<ItemStatusEnum, string[]>;
  };
  lists: {
    inProgress: ItemList;
    todo: ItemList;
    done: ItemList;
  };
};

export type ItemList = {
  head: string;
  tail: string;
};

export enum ItemStatusEnum {
  TO_DO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export type KanbanAction =
  | { type: 'SET_BOARD'; payload: KanbanBoard }
  | { type: 'ADD_ITEM'; payload: string }
  | {
      type: 'UPDATE_ITEM_STATUS';
      payload: { id: string; status: ItemStatusEnum };
    }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'RESET_BOARD' };

export enum ActionTypes {
  SET_BOARD = 'SET_BOARD',
  ADD_ITEM = 'ADD_ITEM',
  UPDATE_ITEM_STATUS = 'UPDATE_ITEM_STATUS',
  DELETE_ITEM = 'DELETE_ITEM',
  RESET_BOARD = 'RESET_BOARD',
}

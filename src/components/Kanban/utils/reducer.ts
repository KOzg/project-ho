import { produce, Draft, enableMapSet } from 'immer';

import {
  KanbanBoard,
  KanbanAction,
  ActionTypes,
  ItemStatusEnum,
} from '../Kanban.types';
import { addItem, deleteItem } from './helpers';

enableMapSet();

export const initialBoard = {
  idLookup: {
    byId: {},
    idsByStatus: {
      [ItemStatusEnum.TO_DO]: [],
      [ItemStatusEnum.IN_PROGRESS]: [],
      [ItemStatusEnum.DONE]: [],
    },
  },
  lists: {
    inProgress: {
      head: '',
      tail: '',
      items: [],
    },
    todo: { head: '', tail: '', items: [] },
    done: { head: '', tail: '', items: [] },
  },
};

// using immer for simplicity and 'mutate' state
// right now i'm just keeping a couple of hashes maintained to have O(1) lookup
export const kanbanReducer = produce(
  (draft: Draft<KanbanBoard>, action: KanbanAction) => {
    switch (action.type) {
      case ActionTypes.SET_BOARD:
        Object.assign(draft, action.payload)
        break;
      case ActionTypes.RESET_BOARD:
        Object.assign(draft, initialBoard)
        break;
      case ActionTypes.ADD_ITEM:
        addItem(action.payload as string, draft);
        break;
      case 'DELETE_ITEM':
        const itemToDelete = draft.idLookup.byId[action.payload];
        if (itemToDelete) {
          deleteItem(itemToDelete, draft);
        }
        break;
      default:
        break;
    }
  }
);

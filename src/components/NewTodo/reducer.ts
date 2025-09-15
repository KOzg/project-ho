// using immer here because i just didn't wanna deal with not mutating the state
// immer is pretty awesome, gives you a 'draft' which you can 'fake' mutate
// dealing with linked lists is so much easier thanks to this
import { produce, Draft } from 'immer';

import {
  ActionTypes,
  ItemList,
  TodoAction,
  TodoItemType,
  TodoType,
} from './Todo/Todo.types';
import { addItem, deleteItem, getListByStatus } from './helpers';

// here's the data structure
export const initialTodos = {
  // idLookup: title as id -> TodoItem which is a Double Linked List node
  idLookup: {},
  // lists are just holding the head and tail
  lists: {
    inProgress: {
      head: '',
      tail: '',
    },
    todos: {
      head: '',
      tail: '',
    },
    done: {
      head: '',
      tail: '',
    },
  },
};

export const todoReducer = produce(
  (draft: Draft<TodoType>, action: TodoAction) => {
    switch (action.type) {
      case ActionTypes.ADD_ITEM:
        const { title, status } = action.payload;
        const newItem: TodoItemType = {
          // todo-God says "title for id is A-okay"
          id: title,
          title: title,
          status: status,
          next: null,
          prev: null,
        };
        const listToAddTo: ItemList = getListByStatus({
          status: status,
          todo: draft,
        });
        // helper function here and below because this reducer was getting a bit hard to read
        addItem({ newItem: newItem, listToAddTo: listToAddTo, draft: draft });
        break;
      case ActionTypes.DELETE_ITEM:
        const { item, isUpdate } = action.payload;
        const listToDeleteFrom = getListByStatus({
          status: item?.status,
          todo: draft,
        });
        deleteItem({
          item: item,
          listToDeleteFrom: listToDeleteFrom,
          draft: draft,
          isUpdate: isUpdate,
        });
        break;
      case ActionTypes.RESET_TODOS:
        // draft = initialTodos just wasn't working
        // Object.assign creates a deep copy i think
        Object.assign(draft, initialTodos);
        break;
      case ActionTypes.SET_TODOS:
        Object.assign(draft, action.payload);
        break;
      default:
        break;
    }
  }
);

import { nanoid } from 'nanoid';
import { Item, ItemStatusEnum, KanbanBoard } from '../Kanban.types';

export const getListByStatus = (status: ItemStatusEnum, draft: KanbanBoard) => {
  switch (status) {
    case ItemStatusEnum.TO_DO:
      return draft.lists.todo;
    case ItemStatusEnum.IN_PROGRESS:
      return draft.lists.inProgress;
    case ItemStatusEnum.DONE:
      return draft.lists.done;
  }
};

export const addItem = (title: string, draft: KanbanBoard) => {
  // create newItem
  const newItem: Item = {
    id: nanoid(),
    next: null,
    prev: null,
    title: title,
    status: ItemStatusEnum.TO_DO,
  };

  const todos = draft.lists.todo;
  const head = draft.idLookup.byId[todos.head];

  //newItem.next should be head
  newItem.next = head ? head.id : null;
  if (head?.id) {
    head.prev = newItem.id;
  }

  // head should be newItem's id
  todos.head = newItem.id;

  // add to hash lookupss
  draft.idLookup.byId[newItem.id] = newItem;
  draft.idLookup.idsByStatus[ItemStatusEnum.TO_DO].push(newItem.id);
};

export const deleteItem = (item: Item, draft: KanbanBoard) => {
  const list = getListByStatus(item.status, draft);
  // disconnect the node and reconnect the list
  let prevItem, nextItem;

  if (item.prev) {
    prevItem = draft.idLookup.byId[item.prev];
    prevItem.next = item.next;
  }

  if (item.next) {
    nextItem = draft.idLookup.byId[item.next];
    nextItem.prev = item.prev;
  }

  // update head/tail if necessary
  if (list.head === item.id && item.next) {
    list.head = item.next;
  }

  // delete from idByStatusArray
  // @TODO - had to do array cause JSON.stringify() kept messing with nested sets
  draft.idLookup.idsByStatus[item.status] = draft.idLookup.idsByStatus[
    item.status
  ].filter(id => id !== item.id);
  // delete from byId hash
  delete draft.idLookup.byId[item.id];
};

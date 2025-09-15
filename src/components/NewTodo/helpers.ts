import {
  ItemList,
  ItemStatus,
  TodoItemType,
  TodoType,
} from './Todo/Todo.types';

// got a bunch of helpers here. for ease of read, here's a breakdown:
// validateInput() - just validates input and returns the error string. todo.tsx has an error state, gets triggered in form onSubmit
// getListByStatus() - pass your status and the context and this little helper guy will get the corresponding item list for you
// addItem()/deleteItem() - this is where the juice is - double linked list baby! the logic is a bit complicated so added lots of comments
// thanks to immer, the add/delete functions are a bit more readable with fake 'mutating' state

const validateInput = ({
  input,
  existingItems,
}: {
  input: string;
  existingItems: string[];
}): string | null => {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return 'Please enter a todo item';
  }

  if (trimmedInput.length <= 2) {
    return 'Item should be longer than 2 characters';
  }

  if (trimmedInput.length > 100) {
    return 'Item should be less than 100 characters long';
  }

  if (existingItems.some(item => item === trimmedInput)) {
    return 'Item already exists';
  }

  return null;
};

const getListByStatus = ({
  status,
  todo,
}: {
  status: ItemStatus;
  todo: TodoType;
}): ItemList => {
  switch (status) {
    case ItemStatus.TO_DO:
      return todo.lists.todos;
    case ItemStatus.IN_PROGRESS:
      return todo.lists.inProgress;
    case ItemStatus.DONE:
      return todo.lists.done;
    default:
      // my typecheck is messed up a bit i think, had to explicitly return empty string head/tail
      return { head: '', tail: '' };
  }
};

const addItem = ({
  newItem,
  listToAddTo,
  draft,
}: {
  newItem: TodoItemType;
  listToAddTo: ItemList;
  draft: TodoType;
}): void => {
  // gotta be able to differentiate between creating a new item or updating the item
  // so let's check if the lookup already exists
  const isUpdatingStatus = !!draft.idLookup[newItem.title];

  if (isUpdatingStatus) {
    // if it's just an update, add to the tail
    if (listToAddTo.tail) {
      const tail = draft.idLookup[listToAddTo.tail];
      // hook up the tail and the new item
      tail.next = newItem.id;
      newItem.prev = tail.id;
    }
    // make new item the new tail
    listToAddTo.tail = newItem.id;
    // if there was no head, update the head too
    if (!listToAddTo.head) {
      listToAddTo.head = listToAddTo.tail;
    }
  } else {
    //if we're just creating a new todo, newItem.next should be head
    // grab the head of the list we're adding to
    const head = draft.idLookup[listToAddTo.head];
    // if head legit exists, hook it up to the new item
    if (head) {
      newItem.next = head.id;
      head.prev = newItem.id;
    }
    // either way, head should be newItem's id
    listToAddTo.head = newItem.id;
    // if no tail, head should also be tail
    if (!listToAddTo.tail.length) {
      listToAddTo.tail = listToAddTo.head;
    }
  }
  // add to or update hash lookup
  draft.idLookup[newItem.id] = newItem;
};

const deleteItem = ({
  item,
  listToDeleteFrom,
  draft,
  isUpdate,
}: {
  item: TodoItemType;
  listToDeleteFrom: ItemList;
  draft: TodoType;
  isUpdate: boolean;
}): void => {
  let prevItem, nextItem;

  // 2 possibilities here:
  // 1. is the deleted item head or tail?
  if (listToDeleteFrom.head === item.id || listToDeleteFrom.tail === item.id) {
    // if it's the head
    if (listToDeleteFrom.head === item.id) {
      // is there's another item?
      if (item.next) {
        listToDeleteFrom.head = item.next;
        // also make sure the new head doesn't have a prev
        draft.idLookup[listToDeleteFrom.head].prev = null;
      }
      // if deleting only item, no more head/tail
      else {
        listToDeleteFrom.head = '';
        listToDeleteFrom.tail = '';
      }
    }
    // is the deleted item the tail?
    else if (listToDeleteFrom.tail === item.id) {
      // is there another item?
      if (item.prev) {
        listToDeleteFrom.tail = item.prev;
        // also make sure the tail doesn't have a next
        draft.idLookup[listToDeleteFrom.tail].next = null;
      }
      // if not, no more head/tail
      else {
        listToDeleteFrom.head = '';
        listToDeleteFrom.tail = '';
      }
    }
  } else {
    // 2. is the deleted item some random item in list
    //disconnect node.prev and reconnnect the list's next item
    if (item?.prev) {
      prevItem = draft.idLookup[item.prev];
      prevItem.next = item.next;
    }
    //disconnect node.next and reconnnect the list's previous item
    if (item?.next) {
      nextItem = draft.idLookup[item.next];
      nextItem.prev = item.prev;
    }
  }

  //delete from hash lookup
  // i'm re-using this delete as a 1-2 punch for add-delete for update status operations
  // this isUpdate boolean makes sure i don't delete from hash lookup if i'm just updating status
  if (!isUpdate) {
    delete draft.idLookup[item.id];
  }
};

export { validateInput, getListByStatus, addItem, deleteItem };

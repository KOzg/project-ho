import { use, useCallback } from 'react';
import { TodoContext } from '../TodoProvider';

export default function useDeleteTodo() {
  const { items, setItems, setAnnouncement } = use(TodoContext);

  const deleteHandler = useCallback(
    (item: string) => {
      const newItems = items.filter(i => i !== item);
      setItems(newItems);
      setAnnouncement(`Deleted: ${item}`);
    },
    [items, setAnnouncement, setItems]
  );

  return deleteHandler;
}

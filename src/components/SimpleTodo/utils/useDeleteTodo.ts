import { use, useCallback } from 'react';
import { TodoContext } from '../SimpleTodoProvider';

export default function useDeleteTodo() {
  const { state, dispatch } = use(TodoContext);

  const deleteHandler = useCallback(
    (item: string) => {
      const newItems = state.items.filter(i => i !== item);
      dispatch({type: 'SET_ITEMS', payload: newItems})
    //   setAnnouncement(`Deleted: ${item}`);
    },
    [state.items, dispatch]
  );

  return deleteHandler;
}

import { useContext } from 'react';
import { ActionTypes, ItemStatus } from '../Todo/Todo.types';
import { TodoContext } from '../TodoProvider';
import { ListItemProps } from './ListeItem.types';

function ListItem({ title }: ListItemProps) {
  const { todo, dispatch } = useContext(TodoContext);
  return (
    <>
      <span>{title}</span>
      <button
        onClick={() => {
          dispatch({
            type: ActionTypes.DELETE_ITEM,
            // isUpdate boolean explained below
            payload: { item: todo.idLookup[title], isUpdate: false },
          });
        }}
      >
        Delete
      </button>
      <select
        onChange={e => {
          // instead of UPDATE_ITEM action, i'm adding the item to the new list directly
          // my addItem() logic handles the use-case where the item already exists meaning it's an update
          dispatch({
            type: ActionTypes.ADD_ITEM,
            payload: { title: title, status: e.target.value as ItemStatus },
          });
          // and then removing from the old list
          // isUpdate makes sure i don't delete item from lookup hash since we just moving the item
          dispatch({
            type: ActionTypes.DELETE_ITEM,
            payload: { item: todo.idLookup[title], isUpdate: true },
          });
        }}
        // this guy makes sure the current item status is pre-selected
        value={todo.idLookup[title]?.status}
      >
        <option value={ItemStatus.TO_DO}>{ItemStatus.TO_DO}</option>
        <option value={ItemStatus.IN_PROGRESS}>{ItemStatus.IN_PROGRESS}</option>
        <option value={ItemStatus.DONE}>{ItemStatus.DONE}</option>
      </select>
    </>
  );
}

export default ListItem;

import { ActionDispatch } from 'react';
import { ActionTypes, KanbanAction } from '../Kanban.types';

function BoardItem({
  id,
  title,
  dispatch,
}: {
  id: string;
  title: string;
  dispatch: ActionDispatch<[action: KanbanAction]>;
}) {
  return (
    <li>
      <span>{title}</span>
      <button
        onClick={() =>
          dispatch({
            type: ActionTypes.DELETE_ITEM,
            payload: id,
          })
        }
      >
        Delete
      </button>
    </li>
  );
}

export default BoardItem;

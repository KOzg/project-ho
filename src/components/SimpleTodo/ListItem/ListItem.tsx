import React from 'react';
import useDeleteTodo from '../utils/useDeleteTodo';
import { ListItemProps } from './ListItem.types';

function ListItem({ items }: ListItemProps) {
  const deleteHandler = useDeleteTodo();
  return (
    <ul aria-label="todo list">
      {items.map(item => {
        return (
          <li key={item} aria-label={item}>
            <span>{item}</span>
            {deleteHandler && (
              <button
                aria-label={`click to delete item:${item}`}
                aria-describedby={`item-${item}`}
                onClick={() => deleteHandler(item)}
              >
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default React.memo(ListItem);

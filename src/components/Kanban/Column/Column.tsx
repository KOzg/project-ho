import { ActionDispatch, JSX, useCallback, useMemo } from 'react';

import BoardItem from '../Item/BoardItem';

import {
  ActionTypes,
  Item,
  ItemStatusEnum,
  KanbanAction,
  KanbanBoard,
} from '../Kanban.types';

function Column({
  // @TODO - ContextProdiver time
  // - the delete handler can go one level deep
  // - no need to pass kanban or dispatch
  kanban,
  dispatch,
}: {
  kanban: KanbanBoard;
  dispatch: ActionDispatch<[action: KanbanAction]>;
}) {
  // @TODO - check the performance of these useCallback/useMemo hooks
  const onDeleteHandler = useCallback((id: string) => {
    dispatch({
      type: ActionTypes.DELETE_ITEM,
      payload: id,
    });
  }, []);

  // @TODO - React.Compiler instead???
  const renderTodoColumn = useMemo(() => {
    return (node: Item) => {
      const column: JSX.Element[] = [];
      while (node) {
        const nodeID = node.id;
        column.push(
          <li key={node.id}>
            <BoardItem title={node.title} />
            <button onClick={() => onDeleteHandler(nodeID)}>Delete</button>
          </li>
        );
        if (!node.next) {
          break;
        }
        node = kanban.idLookup.byId[node.next];
      }
      return column;
    };
  }, [kanban.idLookup.idsByStatus[ItemStatusEnum.TO_DO]]);

  return (
    <ul>{renderTodoColumn(kanban.idLookup.byId[kanban.lists.todo.head])}</ul>
  );
}

export default Column;

'use client';

import {
  useState,
  useEffect,
  useReducer,
  JSX,
  useCallback,
  useMemo,
} from 'react';

import { kanbanReducer, initialBoard } from './utils/reducer';

import BoardItem from './Item/BoardItem';

import { KanbanBoard, ActionTypes, Item, ItemStatusEnum } from './Kanban.types';

function Kanban() {
  const [title, setTitle] = useState<string>('');
  const [kanban, dispatch] = useReducer(kanbanReducer, initialBoard);

  // get board from local storage, if not set fresh board
  useEffect(() => {
    let currentBoard: KanbanBoard = initialBoard;
    const savedBoard = localStorage.getItem('board');
    if (savedBoard) {
      currentBoard = JSON.parse(savedBoard);
      dispatch({ type: ActionTypes.SET_BOARD, payload: currentBoard });
    }
  }, []);

  const onSubmitHandler = () => {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: title });
    setTitle('');
  };

  // @TODO - check the performance of these useCallback/useMemo hooks
  const onDeleteHandler = useCallback((id: string) => {
    dispatch({
      type: ActionTypes.DELETE_ITEM,
      payload: id,
    });
  }, []);

  // @TODO - React.Compiler instead???
  const renderTodoColumn = useMemo(() => {
    return (head: Item) => {
      const column: JSX.Element[] = [];
      let node: Item | null = head || null;
      while (node) {
        column.push(
          <BoardItem
            key={node.id}
            id={node.id}
            title={node.title}
            onDeleteHandler={onDeleteHandler}
          />
        );
        node = node.next ? kanban.idLookup.byId[node.next] : null;
      }
      return column;
    };
  }, [kanban.idLookup.idsByStatus[ItemStatusEnum.TO_DO]]);

  return (
    <>
      <div>Kanban Board</div>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <input
          value={title}
          type="text"
          onChange={e => {
            setTitle(e.target.value);
          }}
        ></input>
        <button type="submit">Add Item</button>
      </form>
      <button
        onClick={() => {
          dispatch({ type: ActionTypes.RESET_BOARD });
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          localStorage.setItem('board', JSON.stringify(kanban));
        }}
      >
        Save
      </button>
      <ul>{renderTodoColumn(kanban.idLookup.byId[kanban.lists.todo.head])}</ul>
    </>
  );
}

export default Kanban;

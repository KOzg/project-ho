'use client';

import { useState, useEffect, useReducer, JSX } from 'react';

import { kanbanReducer, initialBoard } from './utils/reducer';

import BoardItem from './Item/BoardItem';

import { KanbanBoard, ActionTypes, Item } from './Kanban.types';

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

  // set board on local storage if they update
  useEffect(() => {
    localStorage.setItem('board', JSON.stringify(kanban));
  }, [kanban]);

  const onSubmitHandler = () => {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: title });
    setTitle('');
  };

  // @TODO - useMemo()?? or React.Compiler??
  const renderColumn = (head: Item) => {
    const column: JSX.Element[] = [];
    let node: Item | null = head || null;
    while (node) {
      column.push(
        <BoardItem key={node.id} id={node.id} title={node.title} dispatch={dispatch} />
      );
      node = node.next ? kanban.idLookup.byId[node.next] : null;
    }
    return column;
  };

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
      <ul>{renderColumn(kanban.idLookup.byId[kanban.lists.todo.head])}</ul>
    </>
  );
}

export default Kanban;

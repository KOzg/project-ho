'use client';

import { useState, useEffect, useReducer } from 'react';

import { kanbanReducer, initialBoard } from './utils/reducer';

import Column from './Column/Column';

import { KanbanBoard, ActionTypes } from './Kanban.types';

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

  // handlers
  const onSubmitHandler = () => {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: title });
    setTitle('');
  };

  const saveBoard = () => {
    dispatch({ type: ActionTypes.SAVE_BOARD, payload: kanban });
  };

  const resetBoard = () => {
    dispatch({ type: ActionTypes.RESET_BOARD });
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
      <button onClick={resetBoard}>Reset</button>
      <button onClick={saveBoard}>Save</button>
      <ul>
        <Column kanban={kanban} dispatch={dispatch} />
      </ul>
    </>
  );
}

export default Kanban;

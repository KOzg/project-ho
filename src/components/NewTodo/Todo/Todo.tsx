'use client';

import { useContext, useEffect, useState } from 'react';

import Column from '../Column/Column';
import { TodoContext } from '../TodoProvider';

import { validateInput } from '../helpers';

import { ActionTypes, ItemStatus } from './Todo.types';

export default function Todo() {
  const [itemName, setItemName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { todo, dispatch } = useContext(TodoContext);

  const onSubmitHandler = () => {
    const validationError = validateInput({
      input: itemName,
      existingItems: Object.keys(todo.idLookup),
    });
    if (validationError) {
      setError(validationError);
      return;
    }
    dispatch({
      type: ActionTypes.ADD_ITEM,
      payload: { title: itemName.trim(), status: ItemStatus.TO_DO },
    });
    // clean-up input field and error state on submit
    setItemName('');
    setError('');
  };

  // crazy but this is the only useEffect i have
  // sets the board if you've saved it on browser local storage
  // only tested on Chrome but should work anywhere
  useEffect(() => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      dispatch({ type: ActionTypes.SET_TODOS, payload: JSON.parse(todos) });
    }
  }, [dispatch]);

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: ActionTypes.RESET_TODOS });
        }}
      >
        Reset
      </button>
      <button
        // save your todo list to local storage
        onClick={() => localStorage.setItem('todos', JSON.stringify(todo))}
      >
        Save
      </button>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmitHandler();
        }}
      >
        <input
          type="text"
          value={itemName}
          placeholder="Add a Todo!"
          onChange={e => {
            setItemName(e.target.value);
          }}
        />
        <button type="submit">Add</button>
        <br />
        {/* lets give it up to the only styling in the entire app. good job little bud. */}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
      <br />
      <Column status={ItemStatus.TO_DO} />
      <br />
      <Column status={ItemStatus.IN_PROGRESS} />
      <br />
      <Column status={ItemStatus.DONE} />
    </>
  );
}

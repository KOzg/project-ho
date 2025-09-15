'use client';

import { useState, useEffect, use } from 'react';
import ListItem from '@/components/SimpleTodo/ListItem/ListItem';

import useSearch from '../utils/useSearch';
import { TodoContext } from '../SimpleTodoProvider';
import useAddTodo from '../utils/useAddTodo';

export function TodoList() {
  const { state } = use(TodoContext);

  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useSearch(searchTerm);

  const {
    item,
    handleInputChange,
    handleSubmit,
    error,
    inputRef,
  } = useAddTodo();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const itemsToShow = searchTerm ? searchResults : state.items;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state.announcement}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          aria-label="Enter a new todo item"
          value={item}
          type="text"
          onChange={handleInputChange}
        />
        <button type="submit" aria-label="add item to list">
          Add
        </button>
        {error && <span>{error}</span>}
      </form>
      <form>
        <input
          type="text"
          placeholder={'enter search term'}
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </form>
      {itemsToShow?.length ? (
        <ListItem items={itemsToShow} />
      ) : searchTerm ? (
        <p>No Results!</p>
      ) : (
        <p role="status" aria-live="polite">
          Nothing to-do!
        </p>
      )}
    </>
  );
}

export default TodoList;

'use client';

import { useState, useEffect } from 'react';

import { ToDoType, TodoItem, ItemStatusEnum } from './ToDoList.types';

function ToDoList() {
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<ToDoType>({ items: [] });

  const initialTodos = (): ToDoType => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return { items: [] };
  };

  useEffect(() => {
    if (initialTodos()) {
      setTodos(initialTodos());
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const onSubmitHandler = () => {
    const newItem = {
      id: Date.now(),
      title: title,
      status: ItemStatusEnum.TO_DO,
    };

    const newTodos: ToDoType = {
      items: [newItem, ...todos?.items],
    };
    setTodos(newTodos);
    setTitle('');
  };

  //@TODO - if marking item as To-Do, it should put it right before all the DONE items
  // OOOOR!! - we can maintain three separate lists: 1.To-Do 2.In-Progress 3.Done - this is probably the way to go if Kanban style
  const updateStatus = (id: number, status: ItemStatusEnum) => {
    if (
      status === ItemStatusEnum.DONE ||
      status === ItemStatusEnum.IN_PROGRESS
    ) {
      const itemToUpdate = todos.items.splice(
        todos.items.findIndex(item => item.id === id),
        1
      );
      if (!itemToUpdate.length) {
        return;
      }

      const updatedItem = {
        status: status,
        id: id,
        title: itemToUpdate[0].title,
      };
      if (status === ItemStatusEnum.DONE) {
        setTodos({ items: [...todos.items, updatedItem] });
      } else if (status === ItemStatusEnum.IN_PROGRESS) {
        setTodos({ items: [updatedItem, ...todos.items] });
      }
    } else {
      const updatedItems = todos.items.map(item => {
        if (item.id === id) {
          return { ...item, status: status };
        } else {
          return item;
        }
      });
      setTodos({ items: updatedItems });
    }
  };

  const deleteItem = (id: number) => {
    const itemToDelete = todos.items.splice(
      todos.items.findIndex(item => item.id === id),
      1
    );
    if (!itemToDelete.length) {
      return;
    }
    setTodos({ items: todos.items });
  };

  const renderToDos = () => {
    return (
      <ul>
        {todos?.items.map((item: TodoItem) => {
          return (
            <li key={item.id}>
              <span>
                {item.title} - {item.status}
              </span>
              {item.status !== ItemStatusEnum.TO_DO && (
                <button
                  onClick={() => {
                    updateStatus(item.id, ItemStatusEnum.TO_DO);
                  }}
                >
                  Mark as To-Do
                </button>
              )}
              {item.status !== ItemStatusEnum.IN_PROGRESS && (
                <button
                  onClick={() => {
                    updateStatus(item.id, ItemStatusEnum.IN_PROGRESS);
                  }}
                >
                  Mark as In Progress
                </button>
              )}
              {item.status !== ItemStatusEnum.DONE && (
                <button
                  onClick={() => {
                    updateStatus(item.id, ItemStatusEnum.DONE);
                  }}
                >
                  Mark as Done
                </button>
              )}
              <button
                onClick={() => {
                  deleteItem(item.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <div>ToDo List</div>
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
          setTodos({ items: [] });
        }}
      >
        Reset
      </button>
      {renderToDos()}
    </>
  );
}

export default ToDoList;

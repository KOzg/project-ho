import TodoList from '@/components/SimpleTodo/TodoList/TodoList';
import Clock from '@/components/Clock/Clock';
import Kanban from '@/components/Kanban/Kanban';
import { SimpleTodoProvider } from '@/components/SimpleTodo/SimpleTodoProvider';
import { TodoProvider } from '@/components/NewTodo/TodoProvider';
import Todo from '@/components/NewTodo/Todo/Todo';

// import { getAlbums } from './api';

export default async function Lab() {
  // const albums = await getAlbums();
  return (
    <>
      <Clock />
      <Kanban />
      <SimpleTodoProvider>
        <TodoList />
      </SimpleTodoProvider>
      <TodoProvider>
        <Todo />
      </TodoProvider>

      {/*<AlbumCarousel/>*/}
    </>
  );
}

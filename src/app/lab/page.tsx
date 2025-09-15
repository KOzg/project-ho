import TodoList from '@/components/SimpleTodo/TodoList/TodoList';
import Todo from '@/components/ToDo/Todo/Todo'
import Clock from '@/components/Clock/Clock';
import Kanban from '@/components/Kanban/Kanban';
import { SimpleTodoProvider } from '@/components/SimpleTodo/SimpleTodoProvider';
import { TodoProvider } from '@/components/ToDo/TodoProvider';

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

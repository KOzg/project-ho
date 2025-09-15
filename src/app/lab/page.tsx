import TodoList from '@/components/SimpleTodo/TodoList/TodoList';
import Clock from '@/components/Clock/Clock';
import Kanban from '@/components/Kanban/Kanban';
import { SimpleTodoProvider } from '@/components/SimpleTodo/SimpleTodoProvider';

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

      {/*<AlbumCarousel/>*/}
    </>
  );
}

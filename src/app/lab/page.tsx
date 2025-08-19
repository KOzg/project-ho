import TodoList from '@components/Todo/TodoList/TodoList';
import Clock from '@components/Clock/Clock';
import Kanban from '@components/Kanban/Kanban';
import { TodoProvider } from '@/components/Todo/TodoProvider';
// import { getAlbums } from './api';

export default async function Lab() {
  // const albums = await getAlbums();
  // console.log(albums);
  return (
    <>
      <Clock />
      <Kanban />
      <TodoProvider>
        <TodoList />
      </TodoProvider>

      {/*<AlbumCarousel/>*/}
    </>
  );
}

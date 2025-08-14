import Clock from '@components/Clock/Clock';
import ToDoList from '@components/ToDoList/ToDoList';
// import { getAlbums } from './api';

export default async function Lab() {
  // const albums = await getAlbums();
  // console.log(albums);
  return (
    <>
      <Clock />
      <ToDoList />
      {/*<AlbumCarousel/>*/}
    </>
  );
}

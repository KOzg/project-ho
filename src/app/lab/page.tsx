import Clock from '@components/Clock/Clock';
import Kanban from '@components/Kanban/Kanban';
// import { getAlbums } from './api';

export default async function Lab() {
  // const albums = await getAlbums();
  // console.log(albums);
  return (
    <>
      <Clock />
      <Kanban />
      {/*<AlbumCarousel/>*/}
    </>
  );
}

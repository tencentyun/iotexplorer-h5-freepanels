import { useLocation } from 'react-router-dom';

interface PageParams {
  type: 'playlist' | 'album' | 'newSongs';
  id: string;
  img: string;
  title: string;
  intro: string;
}

export const useSongsPageParams = () => {
  const location = useLocation();
  let pageParams = location.params as PageParams;
  if (pageParams) {
    sessionStorage.setItem('songsPageParams', JSON.stringify(pageParams));
  } else {
    pageParams = JSON.parse(sessionStorage.getItem('songsPageParams') as string);
    location.params = pageParams;
  }
  return pageParams;
};

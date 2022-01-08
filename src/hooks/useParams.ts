import { useEffect } from 'react';
import { parseUrl } from '@utillib';

export const useParams = () => {
  const { query } = parseUrl(window.location);
  useEffect(() => {
    console.log(`${window.location} on Load width params`, query);
  }, [query]);
  return query;
};

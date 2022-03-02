import { useEffect, useState } from 'react';

const setTitle = (title: string) => window.document.title = title;
const getTitle = (): string => window.document.title;
export const useTitle = (title) => {
  const [oldTitle] = useState(getTitle());
  useEffect(() => {
    setTitle(title);
    return () => {
      setTitle(oldTitle);
    };
  }, []);
};

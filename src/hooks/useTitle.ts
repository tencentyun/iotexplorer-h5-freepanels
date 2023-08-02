import { useEffect, useState } from 'react';

export const setTitle = (title: string) => window.document.title = title;
export const getTitle = (): string => window.document.title;
export const useTitle = (title) => {
  const [oldTitle] = useState(getTitle());
  useEffect(() => {
    setTitle(title);
    return () => {
      setTitle(oldTitle);
    };
  }, []);
};

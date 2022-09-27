import { useState } from 'react';
export function useLoadMore(request) {
  const [hasMore, setHasMore] = useState(true);
  const [context, setContext] = useState(undefined);
  const loadMore = async () => {
    console.log(context);
    try {
      const { hasMore, context: label } = await request(context);
      setHasMore(hasMore);
      setContext(label);
    } catch (err) {
      setHasMore(false);
    }
  };
  const reset = () => {
    setContext(undefined);
    setHasMore(true);
  };
  return {
    hasMore,
    loadMore,
    reset,
  };
}

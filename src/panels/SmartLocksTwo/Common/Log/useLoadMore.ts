import { useState } from 'react';
export function useLoadMore(request) {
  const [hasMore, setHasMore] = useState(true);
  const [context, setContext] = useState(undefined);
  const loadMore = async () => {
    console.log(context);
    const { hasMore, context: label } = await request(context);
    setHasMore(hasMore);
    setContext(label);
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

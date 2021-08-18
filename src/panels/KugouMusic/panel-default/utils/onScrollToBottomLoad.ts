export const onScrollToBottomLoad = (callback?: () => any) => {
  const bufferDistance = 100;
  let isReachBottom = false;
  return function (e) {
    const { scrollTop } = e.target;
    const { scrollHeight } = e.target;
    const offsetHeight = Math.ceil(e.target.offsetHeight);
    const currentHeight = scrollTop + offsetHeight + bufferDistance;
    if (currentHeight < scrollHeight && isReachBottom) {
      isReachBottom = false;
    }
    if (isReachBottom) return;
    if (currentHeight >= scrollHeight) {
      isReachBottom = true;
      // 触底回调
      callback ? callback() : console.log('触底');
    }
  };
};

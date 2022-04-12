export const getTimeArr = (time: string) => {
  if (!time) return null;
  return time.split(':');
};


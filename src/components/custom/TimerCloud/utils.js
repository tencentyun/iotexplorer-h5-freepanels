const getWeeks = (weeks: number[]) => {
  if (!weeks) return [];
  const res = [] as number[];
  for (let i = 0; i < weeks.length; i++) {
    if (weeks[i]) {
      res.push(i);
    }
  }
  return res;
};

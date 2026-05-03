export const getPagination = (page: number, limit: number) => {
  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 ? limit : 10;

  const skip = (safePage - 1) * safeLimit;

  return {
    skip,
    limit: safeLimit,
    page: safePage,
  };
};

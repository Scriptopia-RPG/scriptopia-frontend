export const parseTagIds = (csv: string | null) => {
  if (!csv) {
    return undefined;
  }

  const ids = csv
    .split(',')
    .map((x) => Number(x.trim()))
    .filter(Number.isFinite);

  return ids.length ? ids : undefined;
};

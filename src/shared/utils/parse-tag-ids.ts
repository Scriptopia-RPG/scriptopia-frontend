export const parseTagIds = (csv: string | null): number[] => {
  if (!csv) {
    return [];
  }

  const ids = csv
    .split(',')
    .map((x) => x.trim())
    .filter((x) => x !== '')
    .map(Number)
    .filter((n) => Number.isInteger(n) && n >= 0);

  return Array.from(new Set(ids));
};

export const parseTagIds = (csv: string | null) => {
  if (!csv) {
    return undefined;
  }

  const ids = csv
    .split(',')
    .map((x) => x.trim())
    .filter((x) => x !== '')
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0);

  const unique = Array.from(new Set(ids));
  return unique.length ? unique : undefined;
};

// Replace spaces with dashes and make lowercase
export const slugify = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, "-");
};

export const getRandomId = (): string => {
  return crypto.randomUUID();
};

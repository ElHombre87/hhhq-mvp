export function trimString(str: string, init: number, end: number) {
  if (!str) return '';
  const l = str.length;
  return `${str.substring(0, init)}...${str.substring(l - end, l)}`;
}

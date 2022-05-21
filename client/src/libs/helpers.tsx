export function truncate(str: string, lenght: number): string {
  return lenght >= str.length ? str : str.substring(0, lenght).trim() + "...";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export function getMonth(monthStr: string): string {
  const month = new Date(monthStr).toLocaleDateString("pt-BR", {
    month: "long",
  });
  return month.charAt(0).toUpperCase() + month.slice(1);
}

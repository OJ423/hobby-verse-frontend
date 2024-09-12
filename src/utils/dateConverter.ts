export function dateConverter(stringDate: string) {
  const date = new Date(stringDate);

  const formattedDate = date.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  });

  return formattedDate;
}

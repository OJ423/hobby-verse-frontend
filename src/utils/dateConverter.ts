export function dateConverter(stringDate: string) {  
  const date = new Date(stringDate);
  
  const formattedDate = date.toLocaleString('en-GB', {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });

  return formattedDate

}

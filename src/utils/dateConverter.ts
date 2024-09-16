import { DateTime } from 'luxon';

export function dateConverter(stringDate: string) {

  const localDate = DateTime.fromISO(stringDate, { zone: 'utc' })
  .setZone('Europe/London')
  .toFormat('dd/MM/yyyy HH:mm');

  return localDate;
}

export function dateToTimeConverter(stringDate: string) {

  const localDate = DateTime.fromISO(stringDate, { zone: 'utc' })
  .setZone('Europe/London')
  .toFormat('HH:mm');

  return localDate;
}

export function formDateConverter(stringDate:string) {
  const localDate = DateTime.fromISO(stringDate, {zone: 'utc'})
  .setZone('Europe/London')
  .toFormat("yyyy-MM-dd'T'HH:mm");
  
  return localDate
}

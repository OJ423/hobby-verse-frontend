import { DateTime } from 'luxon';

export function dateConverter(stringDate: string) {

  const localDate = DateTime.fromISO(stringDate, { zone: 'utc' })
  .setZone('Europe/London')
  .toFormat('dd/MM/yyyy HH:mm');

  return localDate;
}

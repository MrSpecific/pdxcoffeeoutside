import { DateTime } from 'luxon';

export default function expDateToNum(dateStr) {
  const expDate = DateTime.fromISO(dateStr);
  const currDate = DateTime.now();
  const diff = expDate.diff(currDate, 'days');
  return Math.floor(diff.values.days);
}

import { default as baseFormat } from 'date-fns/format';

export const formatFullDate = (date: Date) =>
  baseFormat(date, 'eeee, dd MMMM yyyy');

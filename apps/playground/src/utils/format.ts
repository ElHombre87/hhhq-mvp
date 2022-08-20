import dayjs from 'dayjs';

export namespace time {
  export const utcToString = (utc: number | undefined, template = 'DD/MM/YYYY HH:mm'): string =>
    dayjs
      .unix(utc || 0)
      .utc()
      .format(template);
}

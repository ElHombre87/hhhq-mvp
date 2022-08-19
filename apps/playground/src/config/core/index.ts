import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export { default as themes } from './theme';
export { default as hotkeys } from './hotkeys';

dayjs.extend(utc);

import { registerHotkeys } from 'utils/hotkeys.utils';

export const hotkeys = registerHotkeys({
  showHelp: {
    key: 'mod+h',
    description: 'Show Help window',
  },
  toggleTheme: {
    key: 'mod+j',
    description: 'Toggle App Theme',
  },
  openSpotlight: {
    key: '/',
    description: 'Open the spolight launcher',
  },
});

export default hotkeys;

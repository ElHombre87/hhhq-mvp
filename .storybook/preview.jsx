import {
  withTheme,
  withModals,
  withNotifications,
} from './decorators'

export const parameters = { layout: 'fullscreen' };

export const decorators = [
  withTheme(),
  withModals(),
  withNotifications(),
];

import { CLOSE, SHOW } from './constantsRedux';

export const NOTIFICATION = 'NOTIFICATION';
export const NOTIFICATION_SHOW = `${NOTIFICATION}_${SHOW}`;
export const NOTIFICATION_CLOSE = `${NOTIFICATION}_${CLOSE}`;
export const NOTIFICATION_TIME = 2000;

export const NOTIFICATION_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  LIGHT: 'light',
  DARK: 'dark',
};

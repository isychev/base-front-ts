import { ColorTypes, IAction } from './types';
import { ITempPayload } from './typesTemp';

export interface NotificationOptions {
  delay?: number;
}

export interface NotificationMessage extends NotificationOptions {
  id?: string | number;
  lock?: boolean;
  loading?: boolean;
  text?: string;
  type?: ColorTypes;
}

export type NotificationPayload = NotificationMessage & ITempPayload;

export type NotificationAction = IAction<NotificationPayload>;

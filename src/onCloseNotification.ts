import { NOTIFICATION, NOTIFICATION_CLOSE } from './constantsNotification';
import actionCreator from './actionCreator';
import { NotificationMessage } from './typesNotification';

const onCloseNotification = actionCreator<NotificationMessage>(
  NOTIFICATION_CLOSE,
  {
    tempAlias: NOTIFICATION,
  },
);

export default onCloseNotification;

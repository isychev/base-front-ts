import { NOTIFICATION, NOTIFICATION_SHOW } from './constantsNotification';
import actionCreator from './actionCreator';
import { NotificationMessage } from './typesNotification';

const onShowNotification = actionCreator<NotificationMessage>(
  NOTIFICATION_SHOW,
  {
    tempAlias: NOTIFICATION,
    hold: true,
  },
);

export default onShowNotification;

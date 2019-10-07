import {
  all,
  delay,
  put,
  race,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import {
  NOTIFICATION,
  NOTIFICATION_CLOSE,
  NOTIFICATION_SHOW,
  NOTIFICATION_TIME,
  NOTIFICATION_TYPES,
} from './constantsNotification';
import onCloseNotification from './onCloseNotification';
import onCreateTemp from './onCreateTemp';
import selectorTemp from './selectorTemp';
import { IAction } from './types';
import { NotificationMessage, NotificationOptions } from './typesNotification';
import { generateId } from './utils';

export function* sagaCloseNotification(action: IAction): Iterable<any> {
  const { payload } = action;
  if (payload) {
    const { id } = payload;

    const notifications: NotificationMessage[] = yield select(selectorTemp, {
      tempAlias: NOTIFICATION,
    }) || [];

    const filterNotification: NotificationMessage[] = notifications.filter(
      (notification: NotificationMessage) => notification.id !== id,
    );

    yield put(
      onCreateTemp({
        tempAlias: NOTIFICATION,
        data: filterNotification,
      }),
    );
  }
}

export function* sagaShowNotification(
  options: NotificationOptions,
  action: IAction,
): Iterable<any> {
  const { payload } = action;
  if (payload) {
    const {
      id,
      lock,
      loading,
      text,
      type = NOTIFICATION_TYPES.SUCCESS,
      delay: notificationDelay = NOTIFICATION_TIME,
      hold,
    } = payload;

    const { delay: delayTime = notificationDelay } = options;

    const newNotification: NotificationMessage = {
      lock,
      loading,
      text,
      type,
      id,
      delay: delayTime,
    };
    if (!id) {
      newNotification.id = generateId();
    }
    const stateNotifications: NotificationMessage[] = yield select(
      selectorTemp,
      {
        tempAlias: NOTIFICATION,
      },
    );
    const currentNotifications = stateNotifications || [];
    let newNotifications = [];

    // if notification exist - edit notification
    if (
      currentNotifications.some(
        notification => notification.id === newNotification.id,
      )
    ) {
      newNotifications = currentNotifications.map(notification => {
        if (notification.id === newNotification.id) {
          return newNotification;
        }
        return notification;
      });
    } else {
      newNotifications = [...(currentNotifications || []), newNotification];
    }
    yield put(
      onCreateTemp({
        hold,
        tempAlias: NOTIFICATION,
        data: newNotifications,
      }),
    );
    if (!lock) {
      const result = yield race({
        timeout: delay(delayTime),
        wasRemove: take(
          (act: IAction): any =>
            Boolean(
              act.type === NOTIFICATION_CLOSE &&
                act.payload &&
                act.payload.id === newNotification.id,
            ),
        ),
      });
      if (result.timeout) {
        yield put(
          onCloseNotification({
            id: newNotification.id,
          }),
        );
      }
    }
  }
}

function* mainSaga(options: NotificationOptions): Iterable<any> {
  yield all([
    takeEvery(NOTIFICATION_SHOW, sagaShowNotification, options),
    takeEvery(NOTIFICATION_CLOSE, sagaCloseNotification),
  ]);
}

export default mainSaga;

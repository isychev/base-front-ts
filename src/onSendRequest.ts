import actionCreator from './actionCreator';
import { SEND_REQUEST } from './constantsRequest';
import { IRequestAsyncPayload } from './typesRequest';

const onSendRequest = actionCreator<IRequestAsyncPayload>(
  SEND_REQUEST,
  {},
  {
    callApi: true,
  },
);

export default onSendRequest;

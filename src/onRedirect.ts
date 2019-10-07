import actionCreator from './actionCreator';
import { REDIRECT } from './constantsRouting';
import { IRedirectParams } from './typesRouting';

const onRedirect = actionCreator<IRedirectParams>(REDIRECT);

export default onRedirect;

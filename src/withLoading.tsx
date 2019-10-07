import * as React from 'react';
import { IStatusObject } from './types';

const Loading: React.FC<IStatusObject> = () => (
  <div className="loading">loading...</div>
);

type withLoadingType = <P extends IStatusObject = IStatusObject>(
  LoadingComponent?: React.ComponentType<P>,
  ErrorComponent?: React.ComponentType<P>,
) => (
  Component: React.ComponentType<P>,
) => React.ComponentType<P & IStatusObject>;

const withLoading: withLoadingType = <P extends IStatusObject>(
  LoadingComponent?: React.ComponentType<P>,
  ErrorComponent?: React.ComponentType<P>,
) => (Component: React.ComponentType<P>): React.ComponentType<P> => (
  props: P & IStatusObject,
) => {
  const { loaded, loading, error } = props;
  if (error) {
    return ErrorComponent ? <ErrorComponent {...props} /> : null;
  }
  if (loading) {
    if (LoadingComponent) {
      return <LoadingComponent {...props as any} />;
    }
    return <Loading {...props as any} />;
  }
  if (loaded) {
    return <Component {...props} />;
  }
  return null;
};

export default withLoading;

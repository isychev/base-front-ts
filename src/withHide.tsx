import * as React from 'react';

export interface IWithHideProps {
  hide?: boolean;
  ErrorRender?: React.ComponentType;
}

const withHide: <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
) => React.ComponentType<P & IWithHideProps> = <P extends {}>(
  Component: React.ComponentType<P>,
): React.ComponentType<P & IWithHideProps> => (props: P & IWithHideProps) => {
  const { hide, ErrorRender = null, ...otherProps } = props;
  if (!hide) {
    return <Component {...otherProps as P} />;
  }
  if (ErrorRender) {
    return <ErrorRender {...otherProps} />;
  }
  return null;
};

export default withHide;

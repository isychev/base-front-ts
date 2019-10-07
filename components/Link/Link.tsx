import * as React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export interface ILink extends NavLinkProps {
  to: string;
  sync?: boolean;
  disabled?: boolean;
}

class Link extends React.Component<ILink> {
  public static defaultProps: {
    sync: false;
    disabled: false;
  };

  public handleClick = (e: React.SyntheticEvent) => {
    const { sync, to, disabled } = this.props;
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (sync) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = to;
    }
  };

  public render() {
    const { sync, ...otherProps } = this.props;
    return <NavLink {...otherProps} onClick={this.handleClick} />;
  }
}

export default Link;

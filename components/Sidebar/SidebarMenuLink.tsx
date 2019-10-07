import * as React from 'react';
import CustomLink from '../Link';

export interface ISidebarMenuLinkProps {
  menuItem: any;
}

class SidebarMenuLink extends React.Component<ISidebarMenuLinkProps> {
  public isActive = (match: any) => match && match.isExact;

  public render() {
    const { menuItem } = this.props;
    return (
      <li className="nav-item">
        <CustomLink
          isActive={this.isActive}
          to={menuItem.path}
          className="nav-link text-center"
        >
          <div className={`icon-center ${menuItem.icon} p-2 mb-1`} />
          <div className="small line-height-1">{menuItem.title}</div>
        </CustomLink>
      </li>
    );
  }
}

export default SidebarMenuLink;

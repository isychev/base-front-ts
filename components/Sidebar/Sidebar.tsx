import * as React from 'react';
import StickyContent from '../StickyContent';
import { LogoImage } from '../Logo';

import SidebarMenuLink from './SidebarMenuLink';
import './sidebar.scss';

export interface ISidebarProps {
  className: string;
  style?: any;
  toggleSidebar?: any;
  toggleSidebarItem?: any;
  menu?: object[];
}

const Sidebar: React.FC<ISidebarProps> = (props: ISidebarProps) => {
  const { className = '', style = {}, menu = [] } = props;
  const toggleButton = <LogoImage size="sm" />;
  return (
    <div
      className={`bg-dark d-flex align-items-start flex-column ${className}`}
      style={style}
    >
      <StickyContent className="w-100" additionalBodyClassName="px-0">
        <div className="border-b d-flex align-items-center border-secondary justify-content-center py-1">
          {toggleButton}
        </div>
        <div className="mb-auto w-100">
          <ul className="nav nav-pills flex-column">
            {menu.map((item: any) => (
              <SidebarMenuLink
                menuItem={item}
                key={`${item.title}${item.path}${item.loginRoles}`}
              />
            ))}
          </ul>
        </div>
      </StickyContent>
    </div>
  );
};
export default Sidebar;

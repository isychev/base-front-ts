import * as React from 'react';

export interface IPageTitleProps {
  children?: React.ReactNode;
  className?: string;
  component?: string;
  title?: React.ReactNode;
}
const PageTitle: React.FC<IPageTitleProps> = ({
  children,
  className,
  title,
  component,
}: IPageTitleProps) => {
  const RenderComponent: any = component;
  return (
    <div className={`bg-block px-4 py-4 border-b border-primary ${className}`}>
      <RenderComponent>{title || children}</RenderComponent>
      {title ? children : null}
    </div>
  );
};

PageTitle.defaultProps = {
  children: null,
  className: '',
  component: 'h3',
  title: null,
};

export default PageTitle;

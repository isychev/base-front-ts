import * as React from 'react';

export interface IPageProps {
  children?: React.ReactNode;
  className?: string;
}
const Page: React.FC<IPageProps> = ({ children, className }: IPageProps) => (
  <div className={`card ${className}`}>{children}</div>
);

Page.defaultProps = {
  children: null,
  className: '',
};

export default Page;

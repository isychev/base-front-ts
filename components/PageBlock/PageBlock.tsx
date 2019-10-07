import * as React from 'react';

export interface IPageBlockProps {
  children?: React.ReactNode;
  className?: string;
}
const PageBlock: React.FC<IPageBlockProps> = ({
  children,
  className,
}: IPageBlockProps) => (
  <div className={`bg-block ${className}`}>{children}</div>
);

PageBlock.defaultProps = {
  children: null,
  className: '',
};

export default PageBlock;

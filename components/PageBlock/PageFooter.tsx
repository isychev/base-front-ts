import * as React from 'react';

export interface IPageFooterProps {
  children?: React.ReactNode;
  className?: string;
}
const PageFooter: React.FC<IPageFooterProps> = ({
  children,
  className,
}: IPageFooterProps) => (
  <div className={`card-footer ${className}`}>{children}</div>
);

PageFooter.defaultProps = {
  children: null,
  className: '',
};

export default PageFooter;

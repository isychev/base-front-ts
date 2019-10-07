import * as React from 'react';
// import './StickyContent.scss';

export interface IStickyContent {
  children: React.ReactNode[];
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  additionalBodyClassName?: string;
  additionalHeaderClassName?: string;
}
const StickyContent: React.FC<IStickyContent> = (props: IStickyContent) => {
  const {
    children = [],
    className = '',
    bodyClassName = '',
    footerClassName = '',
    additionalBodyClassName = '',
  } = props;

  return children.length ? (
    <main
      className={`'d-md-flex flex-column h-100 align-items-start sticky-content  ${className}`}
    >
      <div>{children[0]}</div>
      {children.length >= 1 && children[1] ? (
        <div
          className={`sticky-content__body ${bodyClassName} ${additionalBodyClassName}`}
        >
          {children[1]}
        </div>
      ) : null}
      {children.length >= 2 && children[2] ? (
        <div className={`sticky-content__footer ${footerClassName}`}>
          {children[2]}
        </div>
      ) : null}
    </main>
  ) : null;
};

export default StickyContent;

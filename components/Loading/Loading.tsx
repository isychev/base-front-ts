import * as React from 'react';

const loadingSvg = `<svg style='vertical-align: super' xmlns="http://www.w3.org/2000/svg" width="16" height="16">
  <g fill="none" fill-rule="evenodd" stroke-width="2">
    <path stroke="#000" stroke-opacity=".87" d="M3.05 12.95a7 7 0 0 1 9.9-9.9"/>
    <path stroke="#FFED00" d="M3.05 12.95a7 7 0 0 0 9.9-9.9"/>
  </g>
</svg>`;

interface ILoadingProps {
  className?: string;
  size?: string;
  [key: string]: any;
}

const Loading: React.FC<ILoadingProps> = (props: ILoadingProps) => {
  const { className = '' } = props;
  return (
    <div
      className={`d-flex flex-nowrap align-items-center justify-content-center h-100 ${className}`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: loadingSvg }}
        className="rotate"
        style={{ width: '16px', height: '16px' }}
      />
      {/* <img */}
      {/* className="rotate" */}
      {/* src={loadingSvg} */}
      {/* style={{ height: '50%' }} */}
      {/* alt="loading" */}
      {/* /> */}
    </div>
  );
};

Loading.defaultProps = {
  className: '',
  size: '',
};

export default Loading;

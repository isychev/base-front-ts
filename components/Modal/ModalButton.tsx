import * as React from 'react';
import { compose } from 'recompose';
import { MODAL_KEY_NAME, MODAL_KEY_PARAMS } from '../../constantsModal';
import { getUrlWithParameters, ILocation } from '../../utils';
import withLocation from '../../withLocation';
import Link from '../Link';

type StrNum = string | number;

export interface IModalButtonFinal {
  modalName: string;
  modalParams?: StrNum | StrNum[] | null;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
export interface IModalButtonStart extends IModalButtonFinal {
  location: ILocation;
}
const ModalButton: React.FC<IModalButtonStart> = (props: IModalButtonStart) => {
  const {
    location,
    modalName,
    modalParams,
    className,
    disabled,
    children,
    style,
  } = props;
  const path = getUrlWithParameters(location, {
    [MODAL_KEY_NAME]: modalName,
    [MODAL_KEY_PARAMS]: modalParams,
  });
  const cleanProps = {
    children,
    className,
    disabled,
    style,
    to: path,
  };
  return <Link {...cleanProps} />;
};

ModalButton.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  modalParams: null,
  style: {},
};

export default compose<IModalButtonStart, IModalButtonFinal>(withLocation)(
  ModalButton,
);

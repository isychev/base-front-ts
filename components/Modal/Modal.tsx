import * as React from 'react';
// import PropTypes from 'prop-types';
import ModalBootstrap, { ModalProps } from 'reactstrap/lib/Modal';
import ModalBodyBootstrap from 'reactstrap/lib/ModalBody';
import ModalFooterBootstrap from 'reactstrap/lib/ModalFooter';

export type NodeORComp = React.ReactNode | React.ComponentType;

export interface IModalProps extends ModalProps {
  modalName: string;
  header?: NodeORComp;
  children?: NodeORComp;
  footer?: NodeORComp;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  toggle?: () => void;
}
class Modal extends React.Component<IModalProps> {
  public static defaultProps: any;

  public safeRender = (RenderComponent: any): React.ReactNode | null =>
    typeof RenderComponent === 'function' ? (
      <RenderComponent {...this.props} />
    ) : (
      RenderComponent
    );

  public renderTitle = () => {
    const { header: RenderComponent, headerClass, toggle } = this.props;
    return RenderComponent ? (
      <div className={`modal-header border-b ${headerClass}`}>
        <div className="modal-title d-flex justify-content-between w-100 align-items-center">
          <span className="h5">{this.safeRender(RenderComponent)}</span>
          <button
            type="button"
            style={{ fontSize: '1.5rem' }}
            className="icon-base icon-close-gray btn-reset px-2 py-2"
            onClick={toggle}
          />
        </div>
      </div>
    ) : null;
  };

  public renderBody = () => {
    const { bodyClass, children: RenderComponent } = this.props;
    return (
      <ModalBodyBootstrap className={bodyClass}>
        {this.safeRender(RenderComponent)}
      </ModalBodyBootstrap>
    );
  };

  public renderFooter = () => {
    const { footer: RenderComponent } = this.props;
    return RenderComponent ? (
      <ModalFooterBootstrap>
        {this.safeRender(RenderComponent)}
      </ModalFooterBootstrap>
    ) : null;
  };

  public render() {
    const { isOpen, toggle, size } = this.props;
    return (
      <ModalBootstrap isOpen={isOpen} toggle={toggle} size={size}>
        {this.renderTitle()}
        {this.renderBody()}
        {this.renderFooter()}
      </ModalBootstrap>
    );
  }
}

Modal.defaultProps = {
  bodyClass: '',
  children: null,
  footer: null,
  footerClass: '',
  headerClass: '',
  header: null,
  size: 'lg',
};

export default Modal;

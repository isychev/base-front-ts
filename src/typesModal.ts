export interface IModalProps {
  modalName: string;
}
export interface ISelectorModalParams {
  hide?: boolean;
  isOpen?: boolean;
  urlModalParams?: string | string[] | undefined;
}

export type IModalHOCProps = ISelectorModalParams;

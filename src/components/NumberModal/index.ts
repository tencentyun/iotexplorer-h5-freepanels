import { BtnOptions } from '@components/Btn/Btn';

export interface DeviceDataModalProps {
  visible: boolean;
  templateId: string;
  templateConfig: any;
  value: number;
  onChange: (templateId: string, value: number) => any;
  onClose: () => any;
  showBackBtn?: boolean;
  confirmText?: string;
  cancelText?: string;
  cancelBtnType?: BtnOptions['type'];
}

export * from './NumberModal';

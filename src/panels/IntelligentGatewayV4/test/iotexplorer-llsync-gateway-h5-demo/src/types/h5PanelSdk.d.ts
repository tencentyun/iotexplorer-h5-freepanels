type ListenerCallback = (...args: any[]) => any;

interface DeviceInfo {
  ProductId: string;
  DeviceName: string;
  DeviceId: string;
  AliasName: string;
  IconUrl: string;
}

declare module 'qcloud-iotexplorer-h5-panel-sdk' {
  class H5PanelSdk {
    deviceDisplayName: string;
    productId: string;
    deviceName: string;
    deviceId: string;
    productInfo: {
      AppTemplate: string;
      CategoryId: number;
      CategoryKey: string;
      DataTemplate: string;
      Description: string;
      DevStatus: string;
      IconUrl: string;
      IconUrlGrid: string;
      Name: string;
      NetType: string;
      ProductId: string;
      ProductType: number;
      State: string;
      UpdateTime: number;
    };
    goDeviceDetailPage: (params?: {
      reload?: boolean;
      deviceId?: string;
      isShareDevice?: string;
      shareParams?: Record<string, unknown> | string;
    }) => Promise<unknown>;

    deviceStatus: number;
    getDeviceStatus: (options?: { deviceId?: string }) => Promise<number>;

    getSubDeviceList: () => Promise<{
      subDeviceList: DeviceInfo[];
      syncFailList: DeviceInfo[];
    }>;

    goDevicePanelPage: (deviceId: string, customParams?: { passThroughParams: Record<string, string> }) => Promise<any>;

    callDeviceAction: (
      actionPayload: Record<string, unknown>,
      actionId: string,
      deviceId?: string,
    ) => Promise<Record<string, unknown>>;

    getProductInfo: (options?: { productId?: string }) => Promise<Array<{
      ProductId: string,
      Name: string,
      Description: string,
      DataTemplate: string,
      NetType: string,
      CategoryId: number,
      ProductType: number,
      UpdateTime: number,
      IconUrl: string,
    }>>;

    on(type: string, listener: ListenerCallback): EventEmitter;
    once(type: string, listener: ListenerCallback): EventEmitter;
    off(type: string, listener?: ListenerCallback): EventEmitter;
    emit(...args: any[]): Promise<any>;
  }

  export = new H5PanelSdk();
}

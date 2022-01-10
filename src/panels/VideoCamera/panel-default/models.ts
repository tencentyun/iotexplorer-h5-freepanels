import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const describeCloudStorageEvents = async ({
  StartTime = 0,
  EndTime = 0,
  EventId = '',
  Context = '',
  Size = 10,
}: {
    StartTime: number;
    EndTime: number;
    EventId: string;
    Context: string;
    Size: number;
  }) => {
  const DeviceName = sdk.deviceName;
  const ProductId = sdk.productId;
  const params: any = {
    ProductId,
    DeviceName,
  };
  if (StartTime) {
    params.StartTime = StartTime;
  }
  if (EndTime) {
    params.EndTime = EndTime;
  }
  if (EventId) {
    params.EventId = EventId;
  }
  if (Context) {
    params.Context = Context;
  }
  if (Size) {
    params.Size = Size;
  }
  const { Events, Total, Context: NewContext, Listover } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageEvents', params);
  if (Events) {
    for (let i = 0; i < Events.length; i++) {
      if (Events[i].Thumbnail) {
        Events[i].ThumbnailURL = await describeCloudStorageThumbnail({
          Thumbnail: Events[i].Thumbnail,
          ProductId,
          DeviceName,
        });
      }
    }
  }
  return { list: Events ? Events : [], total: Total, context: NewContext, listOver: Listover };
};

export const describeCloudStorageThumbnail = async ({ Thumbnail = '', ProductId, DeviceName }) => {
  const { ThumbnailURL } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageThumbnail', {
    ProductId,
    DeviceName,
    Thumbnail,
  });
  return ThumbnailURL;
};

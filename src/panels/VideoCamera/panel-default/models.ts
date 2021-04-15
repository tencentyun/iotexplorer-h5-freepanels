import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const describeCloudStorageEvents = async (
  {
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
  }
) => {
  // const ProductId = 'WG0I4BTQ6H'
  // const DeviceName = 'cs_38049795_1'
  const DeviceName = sdk.DeviceName
  const ProductId = sdk.ProductId
  const params = {
    ProductId,
    DeviceName
  }
  if (StartTime) {
    params['StartTime'] = StartTime
  }
  if (EndTime) {
    params['EndTime'] = EndTime
  }
  if (EventId) {
    params['EventId'] = EventId
  }
  if (Context) {
    params['Context'] = Context
  }
  if (Size) {
    params['Size'] = Size
  }
  const { Events, Total, Context: NewContext, ListOver } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageEvents', params);
  if (Events) {
    for (let i = 0; i < Events.length; i++) {
      if (Events[i].Thumbnail) {
        Events[i]['ThumbnailURL'] = await describeCloudStorageThumbnail({ Thumbnail: Events[i].Thumbnail, ProductId, DeviceName })
      }
    }
  }
  return { list: Events ? Events : [], total: Total, context: NewContext, listOver: ListOver };
};

export const describeCloudStorageThumbnail = async ({ Thumbnail = '', ProductId, DeviceName }) => {
  const { ThumbnailURL } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageThumbnail', {
    // DeviceName: sdk.DeviceName,
    // ProductId: sdk.ProductId,
    // ProductId: 'WG0I4BTQ6H',
    // DeviceName: 'cs_38049795_1',
    ProductId,
    DeviceName,
    Thumbnail,
  });
  return ThumbnailURL
}

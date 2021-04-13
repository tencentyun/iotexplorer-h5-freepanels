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
  //     ProductId,
  //     DeviceName,
) => {
  const ProductId = 'WG0I4BTQ6H'
  const DeviceName = 'cs_38049795_1'
  //    DeviceName: sdk.DeviceName,
  //    ProductId: sdk.ProductId,
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
  // await Events.map(async (item) => {
  //   item.ThumbnailURL = await describeCloudStorageThumbnail({ Thumbnail: item.Thumbnail, ProductId, DeviceName })
  // })
  // console.log(Events)
  for (let i = 0; i < Events.length; i++) {
    Events[i]['ThumbnailURL'] = await describeCloudStorageThumbnail({ Thumbnail: Events[i].Thumbnail, ProductId, DeviceName })
  }
  return { list: Events, total: Total, context: NewContext, listOver: ListOver };
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

import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const describeCloudStorageEvents = async (
  //   {
  //     ProductId,
  //     DeviceName,
  //     // StartTime = '',
  //     // EndTime = '' ,
  //     // EventId = '',
  // }:{
  //   ProductId: string;
  //   DeviceName: string;
  // }
) => {
  const { Events, Total } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageEvents', {
    ProductId: 'WG0I4BTQ6H',
    DeviceName: 'cs_38049795_1',
  });
  // for(let i =0;i<Events.length;)
  // await Events.map(async (item) => {
  //   item.Thumbnail = await describeCloudStorageThumbnail({ Thumbnail: item.Thumbnail })
  //   console.log(item.Thumbnail)
  // })
  return { list: Events, total: Total };
};

export const describeCloudStorageThumbnail = async ({ Thumbnail = '' }) => {
  const { ThumbnailURL } = await sdk.requestTokenApi('IotVideoDescribeCloudStorageThumbnail', {
    // DeviceName: sdk.DeviceName,
    // ProductId: sdk.ProductId,
    ProductId: 'WG0I4BTQ6H',
    DeviceName: 'cs_38049795_1',
    Thumbnail: "/100008401725/WG0I4BTQ6H/cs_38049795_1/events/1617689796.jpg"
  });
  return ThumbnailURL
}

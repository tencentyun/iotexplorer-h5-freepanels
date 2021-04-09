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
  const { Data } = await sdk.requestTokenApi('DescribeCloudStorageEvents', {
    DeviceName: sdk.DeviceName,
    ProductId: sdk.ProductId,
    uin: 'mmtest',
    AccessToken: '4a08e3aaf9ce4a60aa4620becc0ee0aa'
  },
    {
      url: 'https://iot.cloud.tencent.com/api/videotokenapi/'
    });
  return Data;
};

export const describeCloudStorageThumbnail = async ({ }) => {
  const { Data } = await sdk.requestTokenApi('DescribeCloudStorageEvents', {
    DeviceName: sdk.DeviceName,
    ProductId: sdk.ProductId,
  });
}

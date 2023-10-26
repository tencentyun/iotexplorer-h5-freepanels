import useSWR from 'swr';
import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';

export interface IControlCommandPreset {
  CategoryId: number;
  CategoryName: string;
  CategoryIcon: string;
  CommandConfig: {
    MainCommand: string;
    SubCommand: Array<{
      Property: string;
      Commands: Array<{
        Text: string;
        Desc: string;
      }>
    }>;
  };
}

export async function getDeviceListByFamilyId({
  FamilyId,
  RoomId = '',
  Offset = 0,
  Limit = 50,
  DisableDeviceStatus = true,
}) {
  const { DeviceList, Total } = await h5PanelSdk.requestTokenApi('AppGetFamilyDeviceList', {
    Offset,
    Limit,
    FamilyId,
    RoomId,
    DisableDeviceStatus,
  });

  return { list: DeviceList, total: Total };
}

export async function getAllDeviceListByFamilyId({ FamilyId }) {
  const limit = 50;
  let offset = 0;
  let total = limit;
  let list = [];
  const resp = await getDeviceListByFamilyId({ FamilyId, Offset: offset, Limit: limit });
  list = list.concat(resp.list);
  total = resp.total;

  const isListEnd = () => offset + limit >= total;

  if (isListEnd()) {
    return list;
  }

  // 批量拉取剩余分页数据 [offset, limit]
  const pages: Array<{ offset: number; limit: number }> = [];
  while (!isListEnd()) {
    offset = offset + limit;
    pages.push({ offset, limit });
  }
  const allListResult = await Promise.all(pages.map(async ({ offset, limit }) => {
    const res = await getDeviceListByFamilyId({ FamilyId, Offset: offset, Limit: limit });
    return res.list;
  }));
  allListResult.forEach(listItem => (list = list.concat(listItem)));

  return list;
}

const uniqueArray = (arr: any[]) => Array.from(new Set(arr));

/**
 * rainbow七彩石 腾讯连连品类控制预设
 * 1.获取家庭全部设备
 * 2.拉取所有产品信息，获取产品CategoryId
 */
export function useControlCommandList({ categoryId = -1 } = {}) {
  const swrResponse = useSWR<IControlCommandPreset[]>('CategoryControlCommand', async () => {
    const resp = await fetch('https://jsonschema.qpic.cn/ac22cafb0acc69257f43367d5fe8ca94/cb68a244dcfe096b868dbe2bb334e4b1/config0');
    const { CommandPreset = [] } = await resp.json();

    const familyDeviceList: any[] = await getAllDeviceListByFamilyId({
      FamilyId: h5PanelSdk.familyId,
    });

    const ProductIds = uniqueArray(familyDeviceList.map(item => item.ProductId));

    const { Products = [] } = await h5PanelSdk.requestTokenApi('AppGetProducts', {
      ProductIds,
    });

    const CategoryIds = Products.map(item => item.CategoryId);

    return uniqueArray(CommandPreset.filter(item => CategoryIds.includes(item.CategoryId)));
  }, {
    revalidateIfStale: false,
    keepPreviousData: true,
  });

  let categoryCommandPreset: IControlCommandPreset = {} as IControlCommandPreset;

  // 过滤categoryId
  if (categoryId && swrResponse.data) {
    categoryCommandPreset = swrResponse.data.filter(item => item.CategoryId === categoryId)[0];
  }


  return {
    ...swrResponse,
    categoryCommandPreset,
  };
}

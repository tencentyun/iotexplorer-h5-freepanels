import { useDeviceInfo } from '@hooks/useDeviceInfo';
type Auth = {
  name: string;
}

export interface EffectiveTime {
  type: 0 | 1,
  beginDate: string;
  endDate: string;
  beginTime: string;
  endTime: string;
  week: number[];
}

interface UserInfo {
  name: string;
  id: string;
  fingerPrints: Auth[];
  passwords: Auth[];
  faces: Auth[];
  cards: Auth[];
  effectiveTime: EffectiveTime
}
type UserResult = [
  { userInfo: UserInfo, userIndex: number },
  {
    deleteUser: () => Promise<void>,
    editUser: (userInfo: UserInfo, index?: number) => Promise<void>,
  }
];

export const useUser = ({ id, name }: { id: string, name?: string }): UserResult => {
  const [{ deviceData }, { doControlDeviceData }] = useDeviceInfo();
  const users = deviceData.users || [];
  console.log('users:', deviceData.users, deviceData);
  const userIndex = users.findIndex((user: UserInfo) => user.id === id);
  const userInfo = users[userIndex] || { name, id, effectiveTime: {} };

  const deleteUser = async (index = userIndex) => {
    users.splice(index, 1);
    await doControlDeviceData('users', users);
  };

  const editUser = async (userInfo: UserInfo, index = userIndex) => {
    const newUsers = [...users.slice(0, index), userInfo, ...users.slice(index + 1)];
    await doControlDeviceData('users', newUsers);
  };
  return [{ userInfo, userIndex }, { deleteUser, editUser }];
};

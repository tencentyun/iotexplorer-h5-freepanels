import { useDeviceInfo } from '@hooks/useDeviceInfo';
const sdk = window.h5PanelSdk;
type Auth = {
  name?: string;
  id: string;
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
  userid: string;
  fingerprints: Auth[];
  passwords: Auth[];
  faces: Auth[];
  cards: Auth[];
  effectiveTime: EffectiveTime | string;
}
type UserResult = [
  { userInfo: UserInfo, userIndex: number },
  {
    deleteUser: () => Promise<void>,
    editUser: (userInfo: Partial<UserInfo>, index?: number) => Promise<void>,
  }
];

export const useUser = ({ id, name }: { id: string, name?: string }): UserResult => {
  const [{ deviceData }, { doControlDeviceData }] = useDeviceInfo();
  const {
    users = [],
    fingerprints = [],
    cards = [],
    faces = [],
    passwords = [],
  } = deviceData;
  const userIndex = users.findIndex((user: UserInfo) => user.userid === id);
  const userInfo = users[userIndex] || { name, userid: id, effectiveTime: '{}' };
  const userData = {
    ...userInfo,
    effectiveTime: JSON.parse(userInfo.effectiveTime || '{}'),
    passwords: passwords.filter(item => item.userid === userInfo.userid),
    fingerprints: fingerprints.filter(item => item.userid === userInfo.userid),
    cards: cards.filter(item => item.userid === userInfo.userid),
    faces: faces.filter(item => item.userid === userInfo.userid),
  };

  const deleteUser = async (userid) => {
    await sdk.callDeviceAction({ userid }, 'delete_user');
    // users.splice(index, 1);
    // await doControlDeviceData('users', users);
  };

  const editUser = async (userInfo: UserInfo, index = userIndex) => {
    await sdk.callDeviceAction({
      ...userInfo,
      effectiveTime: userInfo.effectiveTime || '',
    }, 'edit_user');
    // const newUsers = [...users.slice(0, index), userInfo, ...users.slice(index + 1)];
    // await doControlDeviceData('users', newUsers);
  };
  return [{ userInfo: userData, userIndex }, { deleteUser, editUser }];
};

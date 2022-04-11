/*
 * @Description: 用户编辑
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Icon } from '@custom/Icon';
import { InputDialog } from './InputDialog';
import { getLocalImgData, chooseImage } from '@utils';
import { Cell } from '@custom/Cell';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useUser } from './hooks/useUser';

export function UserEdit({
  history: { PATH, push, query, goBack },
  doControlDeviceData,
  tips,
}) {
  useTitle('用户编辑');
  // 用户姓名
  const [{ userInfo, userIndex }, { deleteUser, editUser }] = useUser({ id: query.id, name: query.userName });
  const nameValue = userInfo.name;

  const [nameEditVisible, setNameEdit] = useState(false);
  const [images, setImages] = useState([]);

  const fingerprintList = userInfo.fingerPrints || [];
  const passwordList = userInfo.passwords || [];
  const cardList = userInfo.cards || [];
  const faceList = userInfo.faces || [];

  // 暂时不支持上传头像
  const openPhotoSdk = async () => {
    const imagePaths: any = await chooseImage();
    setImages(imagePaths);
    console.log('图片路径:', imagePaths);
    // 读取图片base64数据
    const base64Data = await getLocalImgData(imagePaths[0]);
    console.log('base64数据:', base64Data);
  };

  const handleUserDelete = async () => {
    const isDelete = await tips.confirm('确认删除');
    if (isDelete) {
      await deleteUser();
      push(PATH.USERS_INDEX);
    }
  };

  return (
    <main className={classNames('user-edit')}>
      <div className="user-edit-header">
        <div className="user-avatar">
          {images.length === 0 && <Icon name="default-avatar"></Icon>}
          {images.map((src, index) => <img className="avatar" key={index} src={src} />)}
        </div>
        <div className="user-name">
          <span className="name">{nameValue}</span>
          <span className="edit" onClick={() => {
            setNameEdit(true);
          }}>
            <Icon name="edit"></Icon>
          </span>
        </div>
        <InputDialog
          visible={nameEditVisible}
          title="姓名修改"
          defaultValue={nameValue}
          max={10}
          onCancel={() => {
            setNameEdit(false);
          }}
          onConfirm={(value) => {
            if (value.trim() === '') {
              return;
            }
            userInfo.name = value.trim();
            editUser(userInfo);
          }}
        ></InputDialog>
      </div>

      <div className="unlock-method">
        <div>指纹</div>
        <div onClick={async () => {
          push(PATH.USERS_PSDRESULT, { type: 'fingerprint' });
          await sdk.callDeviceAction({ wait_timeout: 60, token: userInfo.id }, 'add_fingerprint');
        }}>+添加</div>
      </div>
      {fingerprintList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>密码</div>
        <div onClick={async () => {
          push(PATH.USERS_PSDRESULT, { type: 'password' });
          await sdk.callDeviceAction({ wait_timeout: 60, token: userInfo.id }, 'add_password');
        }}>+添加</div>
      </div>
      {passwordList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>卡片</div>
        <div onClick={async () => {
          push(PATH.USERS_PSDRESULT, { type: 'card' });
          await sdk.callDeviceAction({ wait_timeout: 60, token: userInfo.id }, 'add_card');
        }}>+添加</div>
      </div>
      {cardList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>脸部</div>
        <div onClick={async () => {
          push(PATH.USERS_PSDRESULT, { type: 'face' });
          await sdk.callDeviceAction({ wait_timeout: 60, token: userInfo.id }, 'add_face');
        }}>+添加</div>
      </div>
      {faceList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <Cell
        className="cell-settings pd"
        title="生效时间"
        value={userInfo.effectiveTime?.type === 1 ? '自定义' : '永久'}
        valueStyle="set"
        onClick={() => {
          push(PATH.USERS_PSDADD, { id: query.id });
        }}
      ></Cell>

      <footer className="footer">
        <div className="footer-button" onClick={handleUserDelete}>
          删除用户
        </div>
      </footer>
    </main>
  );
}

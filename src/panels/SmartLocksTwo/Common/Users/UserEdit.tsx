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
  tips,
}) {
  useTitle('用户编辑');
  // 用户姓名
  const [{ userInfo }, { deleteUser, editUser }] = useUser({ id: query.userid, name: query.userName });
  const nameValue = userInfo.name;

  const [nameEditVisible, setNameEdit] = useState(false);
  const [images, setImages] = useState([]);

  const fingerprintList = userInfo.fingerprints || [];
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
      try {
        await deleteUser(userInfo.userid);
        tips.showInfo('删除成功');
        setTimeout(() => {
          goBack();
        }, 2000);
      } catch (err) {
        tips.showError('删除失败，请重试');
      }
    }
  };

  const addAuth = async (type: 'face' | 'password' | 'card' | 'fingerprint') => {
    try {
      push(PATH.USERS_PSDRESULT, { type });
      await sdk.callDeviceAction({ userid: userInfo.userid }, `add_${type}`);
    } catch (err) {
      console.error(type, err);
      tips.showError('添加失败，请稍后重试');
      goBack();
    }
  };

  const removeAuth = async (id, type: 'face' | 'password' | 'card' | 'fingerprint') => {
    // 需要设备端提供指纹的ID
    console.log('正在删除', type);
    try {
      const res = await sdk.callDeviceAction({ id }, `delete_${type}`);
      if (JSON.parse(res.OutputParams || '{}').result !== 1) {
        throw new Error('删除失败, 请重试');
      } else {
        tips.showInfo('删除成功');
      }
    } catch (err) {
      tips.showError('删除失败');
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
          max={5}
          onCancel={() => {
            setNameEdit(false);
          }}
          onConfirm={(value) => {
            if (value.trim() === '') {
              return;
            }
            editUser({ userid: userInfo.userid, name: value.trim() });
          }}
        ></InputDialog>
      </div>

      <div className="unlock-method">
        <div>指纹</div>
        <div onClick={async () => {
          await addAuth('fingerprint');
        }}>+添加</div>
      </div>
      {fingerprintList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>指纹{ index + 1 }</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              removeAuth(item.id, 'fingerprint');
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>密码</div>
        <div onClick={async () => {
          await addAuth('password');
        }}>+添加</div>
      </div>
      {passwordList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>密码{ index + 1 }</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              removeAuth(item.id, 'password');
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>卡片</div>
        <div onClick={async () => {
          await addAuth('card');
        }}>+添加</div>
      </div>
      {cardList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>卡片{ index + 1 }</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              removeAuth(item.id, 'card');
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>脸部</div>
        <div onClick={async () => {
          await addAuth('face');
        }}>+添加</div>
      </div>
      {faceList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>面容{ index + 1 }</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              removeAuth(item.id, 'face');
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
          push(PATH.USERS_PSDADD, { userid: query.userid });
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

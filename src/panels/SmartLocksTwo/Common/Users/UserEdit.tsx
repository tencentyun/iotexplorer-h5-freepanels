/*
 * @Description: 用户编辑
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Icon } from '@custom/Icon';
import { InputDialog } from './InputDialog';
import { getLocalImgData, chooseImage } from '@utils';


export function UserEdit({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push, query },
  tips
}) {
  useTitle('用户编辑');
  const [userList, setUserList] = useState([{name: '我', type: '指纹1 密码1'},{name: '妈妈', type: '指纹2'},{name: '我', type: '指纹1 密码1'}]);

  // 用户姓名
  const [nameValue, setNameValue] = useState(query.userName ? query.userName : '我');
  const [nameEditVisible, setNameEdit] = useState(false);
  const [images, setImages] = useState([]);

  const [fingerprintList, setFingerprintList] = useState([{name: '拇指1'}]);
  const [passwordList, setPasswordList] = useState([{name: '密码1'}]);
  const [cardList, setCardList] = useState([{name: '卡片1'}]);
  const [faceList, setFaceList] = useState([{name: '脸部1'}]);

  const openPhotoSdk = async () => {
    const imagePaths = await chooseImage();
    setImages(imagePaths);
    console.log('图片路径:', imagePaths);
    // 读取图片base64数据
    const base64Data = await getLocalImgData(imagePaths[0]);
    console.log('base64数据:', base64Data);
  };

  // const handleDelete = async () => {
  //   const isDelete = await tips.confirm('确认删除');
  //   if (isDelete) {
  //     // TODO

  //   }
  // }

  const handleUserDelete = async () => {
    const isDelete = await tips.confirm('确认删除');
    if (isDelete) {
      // TODO
      push(PATH.USERS_INDEX);
    }
  }

  return (
    <main className={classNames('user-edit')}>
      <div className="user-edit-header">
        <div className="user-avatar" onClick={openPhotoSdk}>
          {images.length === 0 && <Icon name="default-avatar"></Icon>}
          {images.map((src, index) => {
            return <img className="avatar" key={index} src={src} />;
          })}
        </div>
        <p className="user-name">
          <span className="name">{nameValue}</span>
          <span className="edit" onClick={()=>{setNameEdit(true)}}><Icon name="edit"></Icon></span>
        </p>
        <InputDialog
          visible={nameEditVisible}
          title="姓名修改"
          defaultValue={nameValue}
          max={10}
          onCancel={()=>{setNameEdit(false)}}
          onConfirm={(value)=>{
            setNameValue(value);
          }}
        ></InputDialog>
      </div>

      <div className="unlock-method">
        <div>指纹</div>
        <div onClick={()=> {push(PATH.USERS_PSDADD, {type: 'fingerprint'})}}>+添加</div>
      </div>
      {fingerprintList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
              setFingerprintList([]);
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>密码</div>
        <div onClick={()=> {push(PATH.USERS_PSDADD, {type: 'password'})}}>+添加</div>
      </div>
      {passwordList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
              setPasswordList([]);
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>卡片</div>
        <div onClick={()=> {push(PATH.USERS_PSDADD, {type: 'card'})}}>+添加</div>
      </div>
      {cardList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
              setCardList([]);
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}
      <div className="unlock-method">
        <div>脸部</div>
        <div onClick={()=> {push(PATH.USERS_PSDADD, {type: 'face'})}}>+添加</div>
      </div>
      {faceList.map((item, index) => (
        <div className="method-item" key={index}>
          <div>{item.name}</div>
          <div onClick={async () => {
            const isDelete = await tips.confirm('确认删除');
            if (isDelete) {
              // TODO
              setFaceList([]);
            }
          }}>
            <Icon name="delete"></Icon>
          </div>
        </div>
      ))}

      <footer className="footer">
        <div className="footer-button" onClick={handleUserDelete}>
          删除用户
        </div>
      </footer>
    </main>
  );
}

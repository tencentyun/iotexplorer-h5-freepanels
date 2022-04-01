import React from 'react';
import './lamp-scene.less';
import classNames from 'classnames';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import { useHistory } from 'react-router-dom';

const Scene = () => {
  const history = useHistory();

  const getDomArr = () => [
    { id: 1, name: 1, label: '草原' },
    { id: 2, name: 2, label: '缤纷' },
    { id: 3, name: 3, label: '炫彩' },
    { id: 4, name: 4, label: '斑斓' },
    { id: 5, name: 5, label: '蓝天' },
    { id: 6, name: 6, label: '海洋' },
    { id: 7, name: 7, label: '向日葵' },
    { id: 8, name: 8, label: '森林' },
    { id: 9, name: 9, label: '功夫' },
    { id: 10, name: 10, label: '梦幻' },
    { id: 11, name: 11, label: '地中海风格' },
    { id: 12, name: 12, label: '法式风格' },
    { id: 13, name: 13, label: '美式风格' },
    { id: 14, name: 14, label: '生日' },
    { id: 15, name: 15, label: '结婚纪念日' },
    // {id:16,name:16,label:''}
  ];

  const select_color = (id) => {
    apiControlDeviceData({
      color_scene: id,
    });
    history.goBack();
  };

  const renderLine = (item: LineProps, index: number) => (
      <div key={item.id}
           className="scene_img_wraper" onClick={() => select_color(item.id)}>
        <img className="scene_img"
             src={`https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/lamp/lamp_scene_color_${item.name}.png`}/>
        <p>{item.label}</p>
      </div>
  );

  return (
    <article id={'lamp-scene'} className={classNames('lamp-scene')}>
      {getDomArr().map(renderLine)}
    </article>
  );
};

export default Scene;

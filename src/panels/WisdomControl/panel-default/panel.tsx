import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RuyingLayout } from '@src/components/RuyingLayout';
import { PanelMoreBtn } from '@components/PanelMoreBtn';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {
  // iconWisdomControl,
  iconExpertLiveBroadcast,
  iconTencentMedicalDictionary,
  iconHealthColumn,
  iconEncyclopedia,
} from '@icons/device/freePanel';
import './panel.less';
import { RawBtn } from '@src/components/Btn';
import { off } from 'process';
const wordsList = [
  '今天天气怎么样',
  '我要听青花瓷',
  '明天早上8点叫醒我上班',
  '我要看电影',
  '新冠疫苗接种情况',
];

export const RuyingCard = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
    <div className="ruying-card-container">
      {title && <div className="ruying-card-title">{title}</div>}
      {children}
    </div>
);

export function WisdomControlPanel({
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  deviceList,
}) {
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  const history = useHistory();

  const RuyingBtn = ({ item }) => (
      <RawBtn
        className="ruying-btn"
        onClick={() => {
          // 这里不一定是跳转
          item.clickFun
            ? item.clickFun()
            : (window.location.href = item.url);
        }}
      >
        <img className="btn-icon" src={item.icon} />
        <div className="btn-text">{item.text}</div>
      </RawBtn>
  );

  const RuyingBtnGroup = ({
    btnList,
    showMoreBtn = -1,
    goMore = () => {},
    emptyInfo = '暂无数据',
  }) => (
      <div className="group-btn-wrapper">
        <div className="btns">
          {btnList.map((item, index) => {
            if (showMoreBtn !== -1 && index > showMoreBtn) {
              return;
            }
            return <RuyingBtn item={item}></RuyingBtn>;
          })}
          {btnList && btnList.length === 0 && (
            <div style={{ color: 'rgb(255,255,255)', margin: '0 auto' }}>
              {emptyInfo}
            </div>
          )}
        </div>
        {showMoreBtn !== -1 && btnList.length > showMoreBtn && (
          <div className="more-btn" onClick={goMore}>
            全部
          </div>
        )}
      </div>
  );

  const consultList = [
    {
      icon: iconTencentMedicalDictionary,
      text: '腾讯医典',
      url: 'https://h5.baike.qq.com/mobile/home.html?adtag=txll.home',
    },
    {
      icon: iconExpertLiveBroadcast,
      text: '专家直播',
      url:
        'https://h5.baike.qq.com/mobile/liveshow.html?VNK=e2541316&adtag=txll.zb',
    },
    {
      icon: iconHealthColumn,
      text: '健康专栏',
      url:
        'https://h5.baike.qq.com/mobile/health_content.html?VNK=250a597f&adtag=txll.xgj',
    },
    {
      icon: iconEncyclopedia,
      text: '疾病百科',
      url:
        'https://h5.baike.qq.com/mobile/disease_list.html?VNK=8ead6c26&adtag=txll.jbbk',
    },
  ];

  return (
    <RuyingLayout
      wordsList={wordsList}
      displayName="如影智慧中控屏"
      beforeChildren={
        <img
          className="wisdom-control-icon"
          src="//main.qcloudimg.com/raw/78b5246fc1ac18ccb5a0639654c4f835.png"
        ></img>
      }
      afterChildren={
        <>
          <PanelMoreBtn theme="dark"></PanelMoreBtn>
          <RuyingCard
            title="子设备"
            children={
              <RuyingBtnGroup
                btnList={deviceList}
                showMoreBtn={3}
                goMore={() => {
                  history.push({
                    pathname: '/subDeviceList',
                  });
                }}
              ></RuyingBtnGroup>
            }
          ></RuyingCard>
          <RuyingCard
            title="健康咨询"
            children={<RuyingBtnGroup btnList={consultList}></RuyingBtnGroup>}
          ></RuyingCard>
        </>
      }
    />
  );
}

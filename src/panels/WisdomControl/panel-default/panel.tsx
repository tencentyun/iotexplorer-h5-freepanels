import React, { useEffect } from "react";
import { RuyingLayout } from "@src/components/RuyingLayout";
import {
  iconWisdomControl,
  iconExpertLiveBroadcast,
  iconTencentMedicalDictionary,
  iconHealthColumn,
  iconEncyclopedia,
} from "@icons/device/freePanel";
import "./panel.less";
import { RawBtn } from "@src/components/Btn";
import { getGatewayBindProducts } from './models'
const wordsList = [
  "今天天气怎么样",
  "我要听青花瓷",
  "明天早上8点叫醒我上班",
  "我要看电影",
  "新冠疫苗接种情况",
];

export function WisdomControlPanel({
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  switchList,
}) {
  const RuyingCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {

    useEffect(()=>{
      getGatewayBindProducts({ Offset:0 })
    },[])

    return (
      <div className="ruying-card-container">
        <div className="ruying-card-title">{title}</div>
        {children}
      </div>
    );
  };

  const RuyingBtn = ({ item }) => {
    return (
      <RawBtn
        className="ruying-btn"
        onClick={() => {
          window.location.href = item["url"];
        }}
      >
        <img className="btn-icon" src={item.icon} />
        <div className="btn-text">{item.text}</div>
      </RawBtn>
    );
  };

  const RuyingBtnGroup = ({ btnList }) => {
    return (
      <div className="group-btn-wrapper">
        {btnList.map((item) => {
          return <RuyingBtn item={item}></RuyingBtn>;
        })}
      </div>
    );
  };

  const consultList = [
    {
      icon: iconTencentMedicalDictionary,
      text: "腾讯医典",
      url: "",
    },
    {
      icon: iconExpertLiveBroadcast,
      text: "专家直播",
      url: "https://h5.baike.qq.com/mobile/expert_zone.html?VNK=f500fd11",
    },
    {
      icon: iconHealthColumn,
      text: "健康专栏",
      url: "https://h5.baike.qq.com/mobile/health_content.html?VNK=250a597f",
    },
    {
      icon: iconEncyclopedia,
      text: "疾病百科",
      url: "https://h5.baike.qq.com/mobile/disease_list.html?VNK=93742c38",
    },
  ];

  return (
    <RuyingLayout
      wordsList={wordsList}
      displayName="如影智慧中控屏"
      beforeChildren={
        <img className="wisdom-control-icon" src={iconWisdomControl}></img>
      }
      afterChildren={
        <>
          <RuyingCard title="子设备" children={<div>haha</div>}></RuyingCard>
          <RuyingCard
            title="健康咨询"
            children={
              <RuyingBtnGroup btnList={consultList}></RuyingBtnGroup>
          }
          ></RuyingCard>
        </>
      }
    />
  );
}

import React, { useEffect } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { getThemeType } from '@libs/theme';
import { Collapse } from 'antd-mobile';
import { Slider } from './slider';
import { LineChart } from '../components/line-chart';
import './home.less';

import BodyIndexImage from "../icons/normal/body-index.svg";
import BodyIndexImageBlueWhite from "../icons/blue-white/body-index.svg";
import BodyIndexImageDark from "../icons/dark/body-index.svg";
import BodyIndexImageColorful from "../icons/colorful/body-index.svg";
import BodyIndexImageMorandi from "../icons/morandi/body-index.svg";

import FatImage from "../icons/normal/fat.svg";
import FatImageBlueWhite from "../icons/blue-white/fat.svg";
import FatImageDark from "../icons/dark/fat.svg";
import FatImageColorful from "../icons/colorful/fat.svg";
import FatImageMorandi from "../icons/morandi/fat.svg";

import BodyFatImage from "../icons/normal/body-fat.svg";
import BodyFatImageBlueWhite from "../icons/blue-white/body-fat.svg";
import BodyFatImageDark from "../icons/dark/body-fat.svg";
import BodyFatImageColorful from "../icons/colorful/body-fat.svg";
import BodyFatImageMorandi from "../icons/morandi/body-fat.svg";

import FatLevelImage from "../icons/normal/fat-level.svg";
import FatLevelImageBlueWhite from "../icons/blue-white/fat-level.svg";
import FatLevelImageDark from "../icons/dark/fat-level.svg";
import FatLevelImageColorful from "../icons/colorful/fat-level.svg";
import FatLevelImageMorandi from "../icons/morandi/fat-level.svg";

import WeightControlImage from "../icons/normal/weight-control.svg";
import WeightControlImageBlueWhite from "../icons/blue-white/weight-control.svg";
import WeightControlImageDark from "../icons/dark/weight-control.svg";
import WeightControlImageColorful from "../icons/colorful/weight-control.svg";
import WeightControlImageMorandi from "../icons/morandi/weight-control.svg";

import VisceralFatImage from "../icons/normal/visceral-fat.svg";
import VisceralFatImageBlueWhite from "../icons/blue-white/visceral-fat.svg";
import VisceralFatImageDark from "../icons/dark/visceral-fat.svg";
import VisceralFatImageColorful from "../icons/colorful/visceral-fat.svg";
import VisceralFatImageMorandi from "../icons/morandi/visceral-fat.svg";

import WeightImage from "../icons/normal/weight.svg";
import WeightImageBlueWhite from "../icons/blue-white/weight.svg";
import WeightImageDark from "../icons/dark/weight.svg";
import WeightImageColorful from "../icons/colorful/weight.svg";
import WeightImageMorandi from "../icons/morandi/weight.svg";

import WaterImage from "../icons/normal/water.svg";
import WaterImageBlueWhite from "../icons/blue-white/water.svg";
import WaterImageDark from "../icons/dark/water.svg";
import WaterImageColorful from "../icons/colorful/water.svg";
import WaterImageMorandi from "../icons/morandi/water.svg";

import BoneImage from "../icons/normal/bone.svg";
import BoneImageBlueWhite from "../icons/blue-white/bone.svg";
import BoneImageDark from "../icons/dark/bone.svg";
import BoneImageColorful from "../icons/colorful/bone.svg";
import BoneImageMorandi from "../icons/morandi/bone.svg";

import ProteinImage from "../icons/normal/protein.svg";
import ProteinImageBlueWhite from "../icons/blue-white/protein.svg";
import ProteinImageDark from "../icons/dark/protein.svg";
import ProteinImageColorful from "../icons/colorful/protein.svg";
import ProteinImageMorandi from "../icons/morandi/protein.svg";

import MetabolismImage from "../icons/normal/metabolism.svg";
import MetabolismImageBlueWhite from "../icons/blue-white/metabolism.svg";
import MetabolismImageDark from "../icons/dark/metabolism.svg";
import MetabolismImageColorful from "../icons/colorful/metabolism.svg";
import MetabolismImageMorandi from "../icons/morandi/metabolism.svg";

import AgeImage from "../icons/normal/age.svg";
import AgeImageBlueWhite from "../icons/blue-white/age.svg";
import AgeImageDark from "../icons/dark/age.svg";
import AgeImageColorful from "../icons/colorful/age.svg";
import AgeImageMorandi from "../icons/morandi/age.svg";

import BodyTypeImage from "../icons/normal/body-type.svg";
import BodyTypeImageBlueWhite from "../icons/blue-white/body-type.svg";
import BodyTypeImageDark from "../icons/dark/body-type.svg";
import BodyTypeImageColorful from "../icons/colorful/body-type.svg";
import BodyTypeImageMorandi from "../icons/morandi/body-type.svg";

import ScoreImage from "../icons/normal/score.svg";
import ScoreImageBlueWhite from "../icons/blue-white/score.svg";
import ScoreImageDark from "../icons/dark/score.svg";
import ScoreImageColorful from "../icons/colorful/score.svg";
import ScoreImageMorandi from "../icons/morandi/score.svg";

import numImage from "../icons/normal/no-num.svg";
import rightImage from "../icons/normal/right.svg";
import circleImage from "../icons/blue-white/circle.svg";
import circleImageDark from "../icons/dark/circle.svg";
import triangleImage from "../icons/blue-white/triangle.svg";
import triangleImageDark from "../icons/dark/triangle.svg";

export function Home() {
  const themeType = getThemeType();
  // const testWeight = () =>{
  //   console.log('testWeight')
  //   apiControlDeviceData({
  //     weight: Math.random()*100
  //   })
  // };
  // setTimeout(testWeight, 3000);
  useEffect(() => {
    if(themeType=='blueWhite'||themeType=="dark"){
      // 获取体重
      // const getWeight = async () => {
        const el = document.getElementById('card_bg1');
        el.style.transition = null;
        el.style.transform = 'translate(-50%,0) rotate(0deg)';

        setTimeout(()=>{
          const val = sdk.deviceData.weight ? sdk.deviceData.weight : 50;
          const el = document.getElementById('card_bg1');
          const degree = (val * 280) / 100.0;
          el.style.transition = 'transform 2s';
          el.style.transform = 'translate(-50%,0) rotate(' + degree + 'deg)';
        },50)
      // };
      // getWeight();
    }
  }, [sdk.deviceData.weight]);

  const circleImageSrc = () => {
    switch (themeType) {
      case 'dark':
        return circleImageDark;
      default:
        return circleImage;
    }
  };
  const triangleImageSrc = () => {
    switch (themeType) {
      case 'dark':
        return triangleImageDark;
      default:
        return triangleImage;
    }
  };
  const bodyIndexImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return BodyIndexImage;
      case 'blueWhite':
        return BodyIndexImageBlueWhite;
      case 'dark':
        return BodyIndexImageDark;
      case 'colorful':
        return BodyIndexImageColorful;
      case 'morandi':
        return BodyIndexImageMorandi;
      default:
        return BodyIndexImage;
    }
  };
  const fatImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return FatImage;
      case 'blueWhite':
        return FatImageBlueWhite;
      case 'dark':
        return FatImageDark;
      case 'colorful':
        return FatImageColorful;
      case 'morandi':
        return FatImageMorandi;
      default:
        return FatImage;
    }
  };
  const bodyFatImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return BodyFatImage;
      case 'blueWhite':
        return BodyFatImageBlueWhite;
      case 'dark':
        return BodyFatImageDark;
      case 'colorful':
        return BodyFatImageColorful;
      case 'morandi':
        return BodyFatImageMorandi;
      default:
        return BodyFatImage;
    }
  };
  const fatLevelImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return FatLevelImage;
      case 'blueWhite':
        return FatLevelImageBlueWhite;
      case 'dark':
        return FatLevelImageDark;
      case 'colorful':
        return FatLevelImageColorful;
      case 'morandi':
        return FatLevelImageMorandi;
      default:
        return FatLevelImage;
    }
  };
  const weightControlImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return WeightControlImage;
      case 'blueWhite':
        return WeightControlImageBlueWhite;
      case 'dark':
        return WeightControlImageDark;
      case 'colorful':
        return WeightControlImageColorful;
      case 'morandi':
        return WeightControlImageMorandi;
      default:
        return WeightControlImage;
    }
  };
  const visceralFatImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return VisceralFatImage;
      case 'blueWhite':
        return VisceralFatImageBlueWhite;
      case 'dark':
        return VisceralFatImageDark;
      case 'colorful':
        return VisceralFatImageColorful;
      case 'morandi':
        return VisceralFatImageMorandi;
      default:
        return VisceralFatImage;
    }
  };
  const weightImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return WeightImage;
      case 'blueWhite':
        return WeightImageBlueWhite;
      case 'dark':
        return WeightImageDark;
      case 'colorful':
        return WeightImageColorful;
      case 'morandi':
        return WeightImageMorandi;
      default:
        return WeightImage;
    }
  };
  const waterImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return WaterImage;
      case 'blueWhite':
        return WaterImageBlueWhite;
      case 'dark':
        return WaterImageDark;
      case 'colorful':
        return WaterImageColorful;
      case 'morandi':
        return WaterImageMorandi;
      default:
        return WaterImage;
    }
  };
  const boneImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return BoneImage;
      case 'blueWhite':
        return BoneImageBlueWhite;
      case 'dark':
        return BoneImageDark;
      case 'colorful':
        return BoneImageColorful;
      case 'morandi':
        return BoneImageMorandi;
      default:
        return BoneImage;
    }
  };
  const proteinImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ProteinImage;
      case 'blueWhite':
        return ProteinImageBlueWhite;
      case 'dark':
        return ProteinImageDark;
      case 'colorful':
        return ProteinImageColorful;
      case 'morandi':
        return ProteinImageMorandi;
      default:
        return ProteinImage;
    }
  };
  const metabolismImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return MetabolismImage;
      case 'blueWhite':
        return MetabolismImageBlueWhite;
      case 'dark':
        return MetabolismImageDark;
      case 'colorful':
        return MetabolismImageColorful;
      case 'morandi':
        return MetabolismImageMorandi;
      default:
        return MetabolismImage;
    }
  };
  const ageImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return AgeImage;
      case 'blueWhite':
        return AgeImageBlueWhite;
      case 'dark':
        return AgeImageDark;
      case 'colorful':
        return AgeImageColorful;
      case 'morandi':
        return AgeImageMorandi;
      default:
        return AgeImage;
    }
  };
  const bodyTypeImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return BodyTypeImage;
      case 'blueWhite':
        return BodyTypeImageBlueWhite;
      case 'dark':
        return BodyTypeImageDark;
      case 'colorful':
        return BodyTypeImageColorful;
      case 'morandi':
        return BodyTypeImageMorandi;
      default:
        return BodyTypeImage;
    }
  };
  const scoreImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return ScoreImage;
      case 'blueWhite':
        return ScoreImageBlueWhite;
      case 'dark':
        return ScoreImageDark;
      case 'colorful':
        return ScoreImageColorful;
      case 'morandi':
        return ScoreImageMorandi;
      default:
        return ScoreImage;
    }
  };
  return (
    <article
      className={classNames(
        'home',
        sdk.deviceData.power_switch === 0 && 'power-off'
      )}
    >
      <div id={'sacles_center'} className={classNames('sacles_center')}>
        <div className="card">
          <Collapse>
            <Collapse.Panel
              key="1"
              title={
                <div className="coll-title">
                  <img src={bodyIndexImageSrc()} alt="" />
                  身体指标<div className="coll-hint">从未称重</div>
                </div>
              }
            >
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={fatImageSrc()} alt="" />
                  脂肪量
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={bodyFatImageSrc()} alt="" />
                  体脂等级
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={fatLevelImageSrc()} alt="" />
                  肥胖等级
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={weightControlImageSrc()} alt="" />
                  体重控制
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={visceralFatImageSrc()} alt="" />
                  内脏脂肪指数
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={weightImageSrc()} alt="" />
                  去脂体重
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={waterImageSrc()} alt="" />
                  水分
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={boneImageSrc()} alt="" />
                  骨量
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={proteinImageSrc()} alt="" />
                  蛋白率
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={metabolismImageSrc()} alt="" />
                  基础代谢
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={ageImageSrc()} alt="" />
                  身体年龄
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={bodyTypeImageSrc()} alt="" />
                  体型
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
              <div className="coll-detail">
                <div className="coll-detail-left">
                  <img src={scoreImageSrc()} alt="" />
                  得分
                </div>
                <div className="coll-detail-right">
                  <img className="body-val" src={numImage} alt="" />
                  <img className="body-right" src={rightImage} alt="" />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>

          <div className="foot_card">
            <div className="left_card">
              <div className="span_body">
                <div className="body_font1">朵某某</div>
                <div className="body_font2">成功链接</div>
                <div className="foot_card_span">
                  <div className="dot1"></div>
                  <div className="dot1"></div>
                  <div className="dot1"></div>
                </div>
              </div>
            </div>

            <div className="right_card">
              <div className="right_span_top">
                <div className="weight_span">
                  <div className="weight_font1">体重</div>
                  <div className="weight_font2">
                    {sdk.deviceData.weight ? sdk.deviceData.weight : '45.0'}kg
                  </div>
                </div>
                <div className="weight_font3">从未称重</div>
              </div>
              <div className="right_span_foot">
                {/*折线图*/}
                <LineChart size={''} width={680} height={130} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id={'sacles_foot'} className={classNames('sacles_foot')}>
        <div className="foot_card">
          {themeType == 'blueWhite' || themeType == 'dark' ? (
            <div className="card_top_circle">
              <div className="card_span">
                <div className="card_detail">
                  <div className="remark">从未称体重</div>
                  <div className="weight">
                    {sdk.deviceData.weight ? sdk.deviceData.weight : '45.0'}
                    <div className="unit"> kg</div>
                  </div>
                  <div className="state">
                    {sdk.deviceData.weight ? (
                      '偏胖'
                    ) : (
                      <img src={numImage} alt="" />
                    )}
                  </div>
                </div>
                <div className="card_bg"></div>
                <div id="card_bg1" className="card_bg1">
                  <div className="card_triangle">
                    <img src={triangleImageSrc()} alt="" />
                  </div>
                </div>
                <div className="card_img">
                  <img src={circleImageSrc()} alt="" />
                </div>
              </div>
              <div className="card_font">蓝牙未开启，点击开启</div>
            </div>
          ) : (
            <div className="card_top">
              <div className="card_dashboard">
                <div className="card_span">
                  <div className="span_triangle"></div>
                  <div className="span_num">
                    {sdk.deviceData.weight ? sdk.deviceData.weight : '50.0'}
                  </div>
                  <div className="span_fat">
                    <div className="fat_font">偏胖</div>
                    <div className="fat_unit">kg</div>
                  </div>
                </div>
                <div className="card_font">一天内称重</div>
              </div>
              <Slider defaultValue={sdk.deviceData.weight ? sdk.deviceData.weight : 50} />
            </div>
          )}
          <div className="card_foot">
            <div className="foot_box">
              <div className="box">
                <div className="box_title">BMI</div>
                <div className="box_num">-</div>
              </div>

              <div className="vertical"></div>

              <div className="box">
                <div className="box_title">体脂率(%)</div>
                <div className="box_num">-</div>
              </div>

              <div className="vertical"></div>

              <div className="box">
                <div className="box_title">肌肉量</div>
                <div className="box_num">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Home;

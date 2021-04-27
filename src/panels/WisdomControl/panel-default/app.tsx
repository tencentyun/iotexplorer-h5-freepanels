import React, { useEffect, useState } from "react";
import { useDeviceInfo } from "@hooks/useDeviceInfo";
import { entryWrap } from "@src/entryWrap";
import { WisdomControlPanel } from "./panel";
import {
  HashRouter,
  Route,
  Redirect,
  Switch,
  useHistory,
} from "react-router-dom";
import { SubDeviceList } from "./SubDeviceList";
import { fetchAllList } from "@utillib";
import { getGatewayBindProducts, getGatewayBindDeviceList } from "./models";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";

function App() {
  const [
    { deviceInfo, deviceData, productInfo, templateMap, offline, powerOff },
    { doControlDeviceData },
  ] = useDeviceInfo();
  const [subDeviceList, setSubDeviceList] = useState<any[]>([]);
  const formatSubDeviceList = (list) => {
    list.map((item) => {
      item.icon = item.IconUrl;
      item.text = item.DeviceName;
      item.clickFun = () => {
        console.log("come click");
        try {
          sdk.goDevicePanelPage(item.DeviceId);
        } catch (err) {
          console.log(err);
        }
      };
    });
    setSubDeviceList(list)
  };
  const getSubDeviceList = async()=>{
    const list =await sdk.getSubDeviceList();
    console.log('sdk',list)
    if(list && list.subDeviceList){
      formatSubDeviceList(list.subDeviceList);
    }
  }
  useEffect(() => {
    getSubDeviceList()
  },[]);
  // const subDeviceList =
  sdk.on("subDeviceChange", (subDeviceList) => {
    console.log('subdevicechange',subDeviceList,'test')
    formatSubDeviceList(subDeviceList);
  });
  // 获取网关下全部子设备
  // const getSubDeviceList = async () => {
  //   const subProductList = await fetchAllList(getGatewayBindProducts);
  //   let newSubDeviceList: any[] = [];
  //   Promise.all(
  //     subProductList.map(async (item, index) => {
  //       let func = ({ offset, limit }) => {
  //         return getGatewayBindDeviceList({
  //           Offset: offset,
  //           Limit: limit,
  //           ProductId: item["ProductId"],
  //         });
  //       };
  //       let res = await fetchAllList(func);
  //       newSubDeviceList = newSubDeviceList.concat(res);
  //       return newSubDeviceList;
  //     })
  //   ).then(() => {
  //     console.log("come", newSubDeviceList);
  //     newSubDeviceList.map((item) => {
  //       item.icon = item.IconUrl;
  //       item.text = item.DeviceName;
  //       item.clickFun = () => {
  //         console.log("come click");
  //         try {
  //           sdk.goDevicePanelPage(item.DeviceId);
  //         } catch (err) {
  //           console.log(err);
  //         }
  //       };
  //     });
  //     setSubDeviceList(newSubDeviceList);
  //   });
  // };
  // useEffect(() => {
  //   sdk.getSubDeviceList()
  //   getSubDeviceList();
  // }, []);
  return (
    <HashRouter>
      <Switch>
        <Redirect exact from="/" to="/panel"></Redirect>
        <Route
          path="/panel"
          render={() => (
            <WisdomControlPanel
              deviceData={deviceData}
              offline={false}
              powerOff={false}
              doControlDeviceData={doControlDeviceData}
              deviceList={subDeviceList}
            />
          )}
        ></Route>
        <Route
          path="/subDeviceList"
          render={() => (
            <SubDeviceList deviceList={subDeviceList}></SubDeviceList>
          )}
        ></Route>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);

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
  // 获取网关下全部子设备
  const getSubDeviceList = async () => {
    const subProductList = await fetchAllList(getGatewayBindProducts);
    let newSubDeviceList: any[] = [];
    Promise.all(
      subProductList.map(async (item, index) => {
        let func = ({ offset, limit }) => {
          return getGatewayBindDeviceList({
            Offset: offset,
            Limit: limit,
            ProductId: item["ProductId"],
          });
        };
        let res = await fetchAllList(func);
        newSubDeviceList = newSubDeviceList.concat(res);
        return newSubDeviceList;
      })
    ).then(() => {
      console.log("come", newSubDeviceList);
      newSubDeviceList.map((item) => {
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
        // item.url =
      });
      setSubDeviceList(newSubDeviceList);
    });
  };
  useEffect(() => {
    getSubDeviceList();
  }, []);
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
            // <EventDetail
            //   item={item}
            //   deviceInfo={deviceInfo}
            //   ></EventDetail>
          )}
        ></Route>
      </Switch>
    </HashRouter>
  );
}

entryWrap(App);

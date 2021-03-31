import React,{ useState } from "react";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { Calendar } from "@components/Calendar";
import dayjs from "dayjs";
 // <FreePanelLayout
    //   title={deviceInfo.displayName}
    //   doControlDeviceData={doControlDeviceData}
    //   offline={offline}
    //   powerOff={powerOff}
    //   deviceData={deviceData}
    // >
    //   <div>这是我的摄像头</div>
    // </FreePanelLayout>
export function CameraPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
}) {
  // debugger
  const [currentDate,setCurrentDate] = useState('2020-04-01');
  return (

    <Calendar
      onDateClick={(date) =>
        setCurrentDate(date.format("YYYY-MM-DD"))
      }
      showType={"month"}
      markDates={[
        { date: "2020-12-12", markType: "circle" },
        { markType: "dot", date: "2020-12-23" },
        { markType: "circle", date: "2020-12-22" },
        { date: "2021-1-22" },
      ]}
      markType="dot"
      currentDate={currentDate}
      onTouchEnd={(a, b) => console.log(a, b)}
      disableWeekView={false}
    />
  );
}

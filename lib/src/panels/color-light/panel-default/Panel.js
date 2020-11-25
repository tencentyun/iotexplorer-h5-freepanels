"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Tabs_1 = require("@components/Tabs");
// import { UseDeviceInfoHandler } from '@hooks/useDeviceInfo';
// import { WhiteLightTab, ColorLightTab, SceneTab } from './Tabs';
// import { FreePanelLayout } from '../components/FreePanelLayout';
// import { UseFreePanelDeviceInfo } from '../hooks/useFreePanelDeviceInfo';
// import { CountDownId, getCountdownStr, WorkModeId } from '../constants';
// import { PanelMoreBtn } from '../../components/PanelMoreBtn';
// import lightLogo from './images/light.svg';
require("./Panel.less");
// export interface TabProps extends UseFreePanelDeviceInfo, UseDeviceInfoHandler {
// 	margin?: number;
// }
var WorkMode;
(function (WorkMode) {
    WorkMode[WorkMode["WhiteLight"] = 0] = "WhiteLight";
    WorkMode[WorkMode["ColorLight"] = 1] = "ColorLight";
    WorkMode[WorkMode["Scene"] = 2] = "Scene";
})(WorkMode || (WorkMode = {}));
// export interface LightPanelProps extends UseFreePanelDeviceInfo, UseDeviceInfoHandler {
// 	onGoTimingProject: () => any;
// 	onGoDeviceDetail: () => any;
// }
// export function LightPanel({
// 	deviceInfo,
// 	productInfo,
// 	templateMap,
// 	productConfig,
// 	deviceData,
// 	offline,
// 	powerOff,
// 	doControlDeviceData,
// 	onGoTimingProject,
// 	onGoDeviceDetail,
// 	isShareDevice,
// }: LightPanelProps) {
function Panel() {
    const [currentTab, setCurrentTab] = react_1.useState(WorkMode.WhiteLight);
    // const { pageHeaderHeight, windowHeight, ipx } = useSystemInfo();
    // const footerHeight = useMemo(() => rpx2px(ipx ? 256 : 188), []);
    //
    // // 上下间隙等分, TODO: 位置不太对
    // const margin = useMemo(() => {
    // 	const containerHeight = windowHeight - pageHeaderHeight - rpx2px(90) - footerHeight;
    //
    // 	return (containerHeight - rpx2px(492 + 100 + 20 + 76 * 2)) / 2;
    // }, [footerHeight]);
    //
    // const tabProps: TabProps = {
    // 	deviceInfo,
    // 	productInfo,
    // 	templateMap,
    // 	productConfig,
    // 	deviceData,
    // 	offline,
    // 	powerOff,
    // 	doControlDeviceData,
    // 	margin,
    // };
    //
    // useEffect(() => {
    // 	if (typeof deviceData[WorkModeId] !== 'undefined') {
    // 		setCurrentTab(deviceData[WorkModeId]);
    // 	}
    // }, [deviceData[WorkModeId]]);
    const tabList = [
        {
            tabKey: WorkMode.WhiteLight,
            // component: <WhiteLightTab {...tabProps} />,
            component: react_1.default.createElement("div", null, "white light")
        },
        {
            tabKey: WorkMode.ColorLight,
            // component: <ColorLightTab {...tabProps} />,
            component: react_1.default.createElement("div", null, "color light")
        },
        {
            tabKey: WorkMode.Scene,
            // component: <SceneTab {...tabProps} />,
            component: react_1.default.createElement("div", null, "scene")
        },
    ];
    return (react_1.default.createElement(Tabs_1.Tabs, { activeColor: '#fff', style: { background: 'none' }, tabList: [
            { key: WorkMode.WhiteLight, label: '白光' },
            { key: WorkMode.ColorLight, label: '彩光' },
            { key: WorkMode.Scene, label: '场景' },
        ], currentTab: currentTab, onTabChange: (tabKey) => setCurrentTab(tabKey) }, tabList.map(item => (react_1.default.createElement(Tabs_1.Tabs.Panel, { key: item.tabKey, tabKey: item.tabKey, currentTab: currentTab, keepAlive: false }, item.component))))
    // <FreePanelLayout
    // 	darkMode
    // 	className={classNames('free-light-page', {
    // 		'power-off': powerOff,
    // 	})}
    // 	isShareDevice={isShareDevice}
    // 	title={deviceInfo.displayName}
    // 	doControlDeviceData={doControlDeviceData}
    // 	offline={offline}
    // 	powerOff={powerOff}
    // 	deviceData={deviceData}
    // 	onGoTimingProject={onGoTimingProject}
    // >
    // 	{powerOff ? (
    // 		<PowerOffPlaceHolder
    // 			onGoDeviceDetail={onGoDeviceDetail}
    // 			placeholder={
    // 				(!offline && deviceData[CountDownId] && deviceData[CountDownId] > 0)
    // 					? getCountdownStr(deviceData[CountDownId], powerOff)
    // 					: null
    // 			}
    // 		/>
    // 	) : (
    // 		<Tabs
    // 			activeColor='#fff'
    // 			style={{ background: 'none' }}
    // 			tabList={[
    // 				{ key: WorkMode.WhiteLight, label: '白光' },
    // 				{ key: WorkMode.ColorLight, label: '彩光' },
    // 				{ key: WorkMode.Scene, label: '场景' },
    // 			]}
    // 			currentTab={currentTab}
    // 			onTabChange={tabKey => doControlDeviceData(WorkModeId, tabKey)}
    // 		>
    // 			<PanelMoreBtn
    // 				style={{ top: '90rpx' }}
    // 				onClick={onGoDeviceDetail}
    // 				theme='dark'
    // 			/>
    //
    // 			{tabList.map(item => (
    // 				<Tabs.Panel
    // 					key={item.tabKey}
    // 					tabKey={item.tabKey}
    // 					currentTab={currentTab}
    // 					keepAlive={false}
    // 				>
    // 					{item.component}
    // 				</Tabs.Panel>
    // 			))}
    //
    // 			{deviceData[CountDownId] > 0 && (
    // 				<View
    // 					className='countdown-fixed-footer'
    // 					style={{
    // 						bottom: footerHeight + rpx2px(32),
    // 					}}
    // 				>
    // 					{getCountdownStr(deviceData[CountDownId], powerOff)}
    // 				</View>
    // 			)}
    // 		</Tabs>
    // 	)}
    // </FreePanelLayout>
    );
}
exports.Panel = Panel;
// const PowerOffPlaceHolder = ({
// 	placeholder,
// 	onGoDeviceDetail,
// }: {
// 	placeholder?: string | React.ReactNode;
// 	onGoDeviceDetail: () => any;
// }) => (
// 	<View className='power-off-placeholder'>
// 		<PanelMoreBtn
// 			onClick={onGoDeviceDetail}
// 			theme='dark'
// 		/>
// 		<Image
// 			className='power-off-logo'
// 			src={lightLogo}
// 		/>
// 		<View className='power-off-placeholder-content'>
// 			{placeholder}
// 		</View>
// 	</View>
// );
//# sourceMappingURL=Panel.js.map
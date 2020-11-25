"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("@tarojs/components");
require("./SceneTab.less");
const constants_1 = require("../../../constants");
const SceneSlider_1 = require("./SceneSlider");
/**
 * 0 - 工作
 * 1 - 阅读
 * 2 - 睡眠
 * 3 - 休闲
 * 4 - 柔和
 */
const SceneBgMap = {
    0: 'https://main.qcloudimg.com/raw/c66eba8032cacf2d933b08fcd61567f6/work.jpg',
    1: 'https://main.qcloudimg.com/raw/ef5ca4d29e8fa7427235ceb1f63e4bda/read.jpg',
    2: 'https://main.qcloudimg.com/raw/a5c8294883b32dc59ee0c4f047bbb512/sleep.jpg',
    3: 'https://main.qcloudimg.com/raw/a814365fba575ed498e09b7e8b1c9f08/relax.jpg',
    4: 'https://main.qcloudimg.com/raw/37e71ba7f674439d09d36cf7a0a6780b/soft.jpg',
};
function SceneTab({ templateMap, deviceData, doControlDeviceData, }) {
    const sceneOptions = react_1.useMemo(() => {
        const { define } = templateMap[constants_1.SceneId];
        return Object.keys(define.mapping).map(key => ({
            text: define.mapping[key],
            value: Number(key),
            image: SceneBgMap[key],
        }));
    }, [templateMap[constants_1.SceneId]]);
    return (react_1.default.createElement(components_1.View, { className: 'scene-tab' },
        react_1.default.createElement(SceneSlider_1.SceneSlider, { options: sceneOptions, value: deviceData[constants_1.SceneId], onChange: value => doControlDeviceData(constants_1.SceneId, value) })));
}
exports.SceneTab = SceneTab;
//# sourceMappingURL=SceneTab.js.map
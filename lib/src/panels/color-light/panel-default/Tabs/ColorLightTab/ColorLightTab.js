"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const _underscore_1 = require("@underscore");
const tinycolor2_1 = require("tinycolor2");
const components_1 = require("@tarojs/components");
const CircleSlider_1 = require("../../components/CircleSlider");
require("./ColorLightTab.less");
const color_brightness_svg_1 = require("../../images/color-brightness.svg");
const color_temp_svg_1 = require("../../images/color-temp.svg");
const constants_1 = require("../../../constants");
const LightPropSlider_1 = require("../../components/LightPropSlider");
// hsv中sv的物模型
const svTemplateConfig = {
    define: {
        start: 0,
        max: 100,
        min: 0,
        step: 1,
        unit: '%',
    },
};
function ColorLightTab({ deviceData, doControlDeviceData, margin, }) {
    // local change -> hsv -> color -> control
    // outter color value -> hsv -> color
    const [hsv, setHsv] = react_1.useState(deviceData[constants_1.ColorValueId] || {
        hue: 0,
        saturation: 100,
        value: 100,
    });
    const [color, setColor] = react_1.useState('#fff');
    react_1.useEffect(() => {
        if (hsv) {
            const { hue, saturation, value } = hsv;
            // @ts-ignore
            setColor(`#${tinycolor2_1.default({ h: hue, s: `${saturation}%`, v: `${value}%`, a: 1 }).toHex()}`);
        }
    }, [hsv]);
    react_1.useEffect(() => {
        if (deviceData[constants_1.ColorValueId] && !_underscore_1.default.isEqual(deviceData[constants_1.ColorValueId], hsv)) {
            setHsv(deviceData[constants_1.ColorValueId]);
        }
    }, [deviceData[constants_1.ColorValueId]]);
    const controlColorValue = (hsvValue) => {
        const nextHsv = Object.assign({}, hsv);
        _underscore_1.default.forEach(hsvValue, (value, key) => {
            if (value) {
                nextHsv[key] = value;
            }
        });
        const { hue, saturation, value } = nextHsv;
        doControlDeviceData({
            [constants_1.ColorValueId]: nextHsv,
            [constants_1.ColorValueIdOld]: [hue, saturation, value].join(';'),
        });
    };
    return (react_1.default.createElement(components_1.View, { className: 'color-light-tab' },
        react_1.default.createElement(CircleSlider_1.CircleSlider, { color: color, onChanging: (value) => {
                setHsv(Object.assign(Object.assign({}, hsv), { hue: value }));
            }, onChange: (value) => {
                controlColorValue({ hue: value });
            }, angle: hsv.hue, className: 'color-slider', style: {
                marginTop: margin,
            } }),
        react_1.default.createElement(LightPropSlider_1.LightPropSlider, { icon: color_brightness_svg_1.default, value: hsv.value, templateConfig: svTemplateConfig, onChanging: (value) => {
                setHsv(Object.assign(Object.assign({}, hsv), { value }));
            }, onChange: (value) => {
                setHsv(Object.assign(Object.assign({}, hsv), { value }));
                controlColorValue({ value });
            } }),
        react_1.default.createElement(LightPropSlider_1.LightPropSlider, { icon: color_temp_svg_1.default, value: hsv.saturation, templateConfig: svTemplateConfig, onChanging: (value) => {
                setHsv(Object.assign(Object.assign({}, hsv), { saturation: value }));
            }, onChange: (value) => {
                setHsv(Object.assign(Object.assign({}, hsv), { saturation: value }));
                controlColorValue({ saturation: value });
            } })));
}
exports.ColorLightTab = ColorLightTab;
//# sourceMappingURL=ColorLightTab.js.map
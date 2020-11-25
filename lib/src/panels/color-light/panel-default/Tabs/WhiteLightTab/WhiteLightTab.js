"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const components_1 = require("@tarojs/components");
const tinycolor2_1 = require("tinycolor2");
const CircleSlider_1 = require("../../components/CircleSlider");
const color_brightness_svg_1 = require("../../images/color-brightness.svg");
const LightPropSlider_1 = require("../../components/LightPropSlider");
const constants_1 = require("../../../constants");
const hsls = {
    warn: tinycolor2_1.default(constants_1.WhiteLightColorTheme.warn).toHsl(),
    normal: tinycolor2_1.default(constants_1.WhiteLightColorTheme.normal).toHsl(),
    cold: tinycolor2_1.default(constants_1.WhiteLightColorTheme.cold).toHsl(),
};
const colorTempMiddle = (7000 - 2000) / 2 + 2000;
const [colorTempMin, colorTempMax] = constants_1.ColorTempRange;
const temp2Angle = (temp) => {
    if (typeof temp === 'undefined')
        return 0;
    const percent = (temp - colorTempMin) / (colorTempMax - colorTempMin);
    let angle = percent * 180 + 270;
    if (angle >= 360) {
        angle = angle - 360;
    }
    return angle;
};
// 白光，颜色是假的，根据angle决定返回色温的值
function WhiteLightTab({ templateMap, deviceData, doControlDeviceData, margin, }) {
    const [color, setColor] = react_1.useState('#fff');
    const localAngleRef = react_1.useRef(0);
    const style = react_1.useMemo(() => ({
        backgroundImage: `linear-gradient(90deg, ${constants_1.WhiteLightColorTheme.warn}, ${constants_1.WhiteLightColorTheme.normal} 50%, ${constants_1.WhiteLightColorTheme.cold} 100%)`,
        marginTop: margin,
    }), []);
    const controlColorTempByAngle = (angle) => {
        localAngleRef.current = angle;
        let colorTemp;
        // 4个区间
        if (angle >= 0 && angle < 90) {
            colorTemp = colorTempMiddle + (angle / 90) * (colorTempMax - colorTempMiddle);
        }
        else if (angle >= 90 && angle < 180) {
            colorTemp = colorTempMax + ((angle - 90) / 90) * (colorTempMiddle - colorTempMax);
        }
        else if (angle >= 180 && angle < 270) {
            colorTemp = colorTempMiddle + ((angle - 180) / 90) * (colorTempMin - colorTempMiddle);
        }
        else if (angle >= 270 && angle < 360) {
            colorTemp = colorTempMin + ((angle - 270) / 90) * (colorTempMiddle - colorTempMin);
        }
        doControlDeviceData(constants_1.ColorTempId, Math.round(colorTemp));
    };
    const changeColorByAngle = (angle) => {
        localAngleRef.current = angle;
        const hsl = {
            a: 1,
        };
        // 4个区间
        if (angle === 0 || angle === 180) {
            setColor('#fff');
            return;
        }
        else if (angle === 90) {
            setColor('#5FBCFD');
            return;
        }
        else if (angle === 270) {
            setColor('#EAB250');
            return;
        }
        else if (angle > 0 && angle < 90) {
            hsl.h = hsls.cold.h;
            hsl.s = hsls.cold.s;
            hsl.l = hsls.normal.l + (angle / 90) * (hsls.cold.l - hsls.normal.l);
        }
        else if (angle > 90 && angle < 180) {
            hsl.h = hsls.cold.h;
            hsl.s = hsls.cold.s;
            hsl.l = hsls.cold.l + ((angle - 90) / 90) * (hsls.normal.l - hsls.cold.l);
        }
        else if (angle > 180 && angle < 270) {
            hsl.h = hsls.warn.h;
            hsl.s = hsls.warn.s;
            hsl.l = hsls.normal.l + ((angle - 180) / 90) * (hsls.warn.l - hsls.normal.l);
        }
        else if (angle > 270 && angle < 360) {
            hsl.h = hsls.warn.h;
            hsl.s = hsls.warn.s;
            hsl.l = hsls.warn.l + ((angle - 270) / 90) * (hsls.normal.l - hsls.warn.l);
        }
        setColor(`#${tinycolor2_1.default(hsl).toHex()}`);
    };
    const deviceColorAngle = react_1.useMemo(() => {
        const angle = temp2Angle(deviceData[constants_1.ColorTempId]);
        const localAngle = Math.floor(localAngleRef.current);
        if (angle >= 0 && angle < 180) {
            return Math.floor(180 - angle) === localAngle ? localAngle : angle;
        }
        else if (angle >= 180 && angle < 360) {
            return Math.floor(360 - angle + 180) === localAngle ? localAngle : angle;
        }
        return angle;
    }, [deviceData[constants_1.ColorTempId]]);
    return (react_1.default.createElement(components_1.View, { className: 'white-light-tab' },
        react_1.default.createElement(CircleSlider_1.CircleSlider, { color: color, onChanging: changeColorByAngle, onChange: controlColorTempByAngle, angle: deviceColorAngle, style: style }),
        react_1.default.createElement(LightPropSlider_1.LightPropSlider, { icon: color_brightness_svg_1.default, value: deviceData[constants_1.BrightnessId], templateConfig: templateMap[constants_1.BrightnessId], onChange: (value) => {
                doControlDeviceData(constants_1.BrightnessId, value);
            } })));
}
exports.WhiteLightTab = WhiteLightTab;
//# sourceMappingURL=WhiteLightTab.js.map
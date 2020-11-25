"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = require("classnames");
require("./LightPropSlider.less");
function LightPropSlider({ icon, value, onChange, onChanging, templateConfig, }) {
    const [localValue, setLocalValue] = react_1.useState(0);
    const { max, min, step, unit, } = react_1.useMemo(() => {
        const { define = {} } = templateConfig || {};
        const { start = 0, max, min, step, unit, } = define;
        setLocalValue(typeof value === 'undefined' ? start : value);
        return {
            max,
            min,
            step,
            unit,
        };
    }, [value, templateConfig]);
    return (react_1.default.createElement("div", { className: classnames_1.default('light-slider-container') },
        react_1.default.createElement("img", { src: icon, className: 'light-slider-icon' }),
        react_1.default.createElement(Slider, { className: 'light-slider', backgroundColor: '#333437', activeColor: '#006EFF', blockSize: 26, blockColor: '#B5B8C0', step: step, max: max, min: min, value: localValue, onChanging: (e) => {
                setLocalValue(e.detail.value);
                if (typeof onChanging === 'function') {
                    onChanging(e.detail.value);
                }
            }, onChange: (e) => {
                onChange(e.detail.value);
            } }),
        react_1.default.createElement("div", { className: 'light-slider-value' },
            localValue,
            unit)));
}
exports.LightPropSlider = LightPropSlider;
//# sourceMappingURL=LightPropSlider.js.map
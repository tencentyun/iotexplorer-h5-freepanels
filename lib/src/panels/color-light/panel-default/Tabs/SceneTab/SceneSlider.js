"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const classnames_1 = require("classnames");
const _utillib_1 = require("@utillib");
const useSystemInfo_1 = require("@hooks/useSystemInfo");
require("./SceneTab.less");
const scene_slider_mark_svg_1 = require("../../images/scene-slider-mark.svg");
function SceneSlider({ options, value = 2, onChange, }) {
    const { ipx } = useSystemInfo_1.useSystemInfo();
    const size = react_1.useMemo(() => ({
        bgWidth: _utillib_1.rpx2px(560),
        textWidth: _utillib_1.rpx2px(150),
        containerWidth: _utillib_1.rpx2px(750),
    }), []);
    const stateRef = react_1.useRef({
        dragging: false,
        offsetLeft: 0,
        touchStartOffsetLeft: 0,
        touchStartX: 0,
    });
    const getOffsetByValue = value => size.containerWidth * 2 + (value - 2) * size.textWidth;
    // 每一个set称为一个集合，一共放5个集合，以保证怎么拖动都不会漏边
    const clonedOptions = react_1.useMemo(() => [
        ...options,
        ...options,
        ...options,
        ...options,
        ...options,
    ], [options]);
    const [state, setState] = react_1.useState({
        offsetLeft: 0,
        offsetTransition: false,
        currentValue: 0,
    });
    react_1.useEffect(() => {
        if (!stateRef.current.dragging && value !== state.currentValue) {
            setCurrentPosition(value);
        }
    }, [value]);
    const setStyle = (offsetLeft) => {
        // 计算当前激活的值
        let currentValue = Math.round(offsetLeft % size.containerWidth / size.textWidth) + 2;
        if (currentValue >= 5)
            currentValue = currentValue - 5;
        setState({
            offsetTransition: false,
            currentValue,
            offsetLeft,
        });
    };
    // 将当前激活元素对准在中间，并重置当前列表到正中间
    const setCurrentPosition = (currentValue) => {
        stateRef.current.offsetLeft = getOffsetByValue(currentValue);
        setState({
            offsetLeft: stateRef.current.offsetLeft,
            currentValue,
            offsetTransition: false,
        });
    };
    const animationLoop = () => {
        if (stateRef.current.dragging) {
            setStyle(stateRef.current.offsetLeft);
            requestAnimationFrame(() => animationLoop());
        }
    };
    const handleTouchStart = (e) => {
        e.preventDefault();
        stateRef.current.dragging = true;
        stateRef.current.touchStartX = e.touches[0].pageX;
        stateRef.current.touchStartOffsetLeft = stateRef.current.offsetLeft;
        animationLoop();
    };
    const handleTouchMove = (e) => {
        const { pageX, } = e.touches[0];
        stateRef.current.offsetLeft = stateRef.current.touchStartOffsetLeft - pageX + stateRef.current.touchStartX;
    };
    const handleTouchEnd = async (e) => {
        stateRef.current.dragging = false;
        e.preventDefault();
        // 计算当前值中点相对于当前集合的位置
        const relativeValueCenterPos = (state.currentValue * size.textWidth + size.textWidth / 2);
        // 计算当前集合刻度中点位置
        const centerPos = stateRef.current.offsetLeft % size.containerWidth + size.containerWidth / 2;
        let delta = 0;
        // 计算刻度中点于当前值中点的距离
        if (centerPos > size.containerWidth) {
            // 说明跨越一个集合了，加一个集合的距离
            delta = centerPos - (relativeValueCenterPos + size.containerWidth);
        }
        else {
            delta = centerPos - relativeValueCenterPos;
        }
        // 让值中点滚动到刻度上
        stateRef.current.offsetLeft = stateRef.current.offsetLeft - delta;
        setState({
            offsetLeft: stateRef.current.offsetLeft,
            offsetTransition: true,
            currentValue: state.currentValue,
        });
        await _utillib_1.delay(100);
        // 滚动完，重置为中间集合
        setCurrentPosition(state.currentValue);
        onChange(state.currentValue);
    };
    react_1.useEffect(() => {
        if (typeof state.currentValue !== 'undefined') {
            taro_1.default.vibrateShort();
        }
    }, [state.currentValue]);
    return (react_1.default.createElement(components_1.View, { className: classnames_1.default('scene-slider', { ipx }) },
        react_1.default.createElement(components_1.View, { className: 'scene-bg-container' },
            react_1.default.createElement(components_1.View, { className: 'scene-bg-list', style: {
                    width: size.bgWidth * clonedOptions.length,
                    transform: `translate3d(${-state.offsetLeft * size.bgWidth / size.textWidth}px, 0, 0)`,
                    transition: state.offsetTransition ? 'transform .1s ease-out' : 'none',
                } }, clonedOptions.map((item, index) => (react_1.default.createElement(components_1.Image, { key: index, className: 'scene-bg', src: item.image, mode: 'scaleToFill' }))))),
        react_1.default.createElement(components_1.View, { className: 'scene-slider-container', onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd },
            react_1.default.createElement(components_1.View, { className: 'scene-slider', style: {
                    width: clonedOptions.length * size.textWidth,
                    transform: `translate3d(${-state.offsetLeft}px, 0, 0)`,
                    transition: state.offsetTransition ? 'transform .1s ease-out' : 'none',
                } }, clonedOptions.map((scene, index) => (react_1.default.createElement(components_1.View, { key: index, className: classnames_1.default('scene-slider-item', {
                    actived: scene.value === state.currentValue,
                }) }, scene.text)))),
            react_1.default.createElement(components_1.Image, { className: 'scene-slider-mark', src: scene_slider_mark_svg_1.default }))));
}
exports.SceneSlider = SceneSlider;
//# sourceMappingURL=SceneSlider.js.map
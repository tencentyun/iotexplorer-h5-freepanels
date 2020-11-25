"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = require("classnames");
const _utillib_1 = require("@utillib");
require("./CircleSlider.less");
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function sanitizeAngle(degrees) {
    return (degrees < 0) ? 360 + (degrees % -360) : degrees % 360;
}
function toDegrees(radians) {
    return radians * 180 / Math.PI;
}
function CircleSlider({ angle = -1, onChanging = _utillib_1.noop, onChange = _utillib_1.noop, style, className, color, }) {
    const [ready, setReady] = react_1.useState(false);
    const [thumbStyle, setThumbStyle] = react_1.useState({});
    const size = react_1.useMemo(() => ({
        radius: rpx2px(460 / 2),
        containerSize: rpx2px(492),
        thumbSize: rpx2px(82),
    }), []);
    const stateRef = react_1.useRef({
        angleCurrent: -1,
        dragging: false,
        containerRect: null,
    });
    const onDragStart = (e) => {
        if (!ready)
            return;
        e.preventDefault();
        stateRef.current.dragging = true;
        animationLoop();
    };
    const onDrag = (e) => {
        if (!ready)
            return;
        const { containerRect } = stateRef.current;
        const { containerSize } = size;
        const { pageX, pageY, } = e.touches[0];
        const thumbPositionNew = {
            left: pageX - containerRect.left - (containerSize / 2),
            top: pageY - containerRect.top - (containerSize / 2),
        };
        stateRef.current.angleCurrent = Math.round(sanitizeAngle(toDegrees(Math.atan2(thumbPositionNew.left, -thumbPositionNew.top))) * 100) / 100;
        return false;
    };
    const onDragEnd = (e) => {
        if (!ready)
            return;
        stateRef.current.dragging = false;
        e.preventDefault();
        onChange(stateRef.current.angleCurrent);
    };
    const setStyle = (angle) => {
        const { radius, containerSize, thumbSize } = size;
        const top = `${-Math.cos(toRadians(angle)) * radius + (containerSize / 2 - thumbSize / 2)}px`;
        const left = `${Math.sin(toRadians(angle)) * radius + (containerSize / 2 - thumbSize / 2)}px`;
        setThumbStyle({
            transform: `translate3d(${left}, ${top}, 0)`,
        });
    };
    const initContainerStyle = async () => {
        while (!stateRef.current.containerRect) {
            await _utillib_1.delay(50);
            stateRef.current.containerRect = await wxlib.wxapi.boundingClientRect('#circle-slider', wxlib.router.currentPage);
        }
        setReady(true);
    };
    const animationLoop = () => {
        if (stateRef.current.dragging) {
            setStyle(stateRef.current.angleCurrent);
            requestAnimationFrame(() => animationLoop());
            onChanging(stateRef.current.angleCurrent);
        }
    };
    react_1.useEffect(() => {
        initContainerStyle();
    }, []);
    react_1.useEffect(() => {
        if (ready && angle !== stateRef.current.angleCurrent) {
            stateRef.current.angleCurrent = angle;
            setStyle(stateRef.current.angleCurrent);
            onChanging(stateRef.current.angleCurrent);
        }
    }, [ready, angle]);
    return (react_1.default.createElement("div", { className: 'circle-slider-container', style: style },
        react_1.default.createElement("div", { id: 'circle-slider', className: classnames_1.default('circle-slider', className) },
            react_1.default.createElement("div", { className: 'circle-slider-inner', style: {
                    backgroundColor: color,
                } }),
            react_1.default.createElement("div", { className: 'circle-slider-thumb', style: Object.assign({ visibility: ready ? 'visible' : 'hidden', backgroundColor: color }, thumbStyle), onTouchStart: onDragStart, onTouchMove: onDrag, onTouchEnd: onDragEnd }))));
}
exports.CircleSlider = CircleSlider;
//# sourceMappingURL=CircleSlider.js.map
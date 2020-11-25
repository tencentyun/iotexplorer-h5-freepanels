"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const classnames_1 = require("classnames");
require("./Tabs.less");
function Tabs({ tabList = [], animated = true, currentTab, onTabChange, children, marginBottom = 0, className, style, activeColor = '#0066ff', }) {
    const currentIndex = react_1.useMemo(() => {
        let index = -1;
        if (tabList && tabList.length) {
            if (!currentTab) {
                index = 0;
            }
            else {
                index = tabList.findIndex(item => item.key === currentTab);
            }
        }
        return index;
    }, [tabList, currentTab]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: classnames_1.default('tab-container', className, {
                animated,
            }), style: Object.assign(Object.assign({}, style), { marginBottom: `${marginBottom}rpx` }) },
            react_1.default.createElement(react_1.default.Fragment, null,
                tabList.map((item, index) => (react_1.default.createElement("div", { key: index, className: classnames_1.default('tab-item need-hover', {
                        active: currentTab === item.key,
                        'red-hint': item.showHint,
                    }), onClick: () => onTabChange(item.key), style: {
                        color: currentTab === item.key ? activeColor : '',
                    } }, item.label))),
                animated && (react_1.default.createElement("div", { className: 'tab-bar', style: {
                        width: `${100 / tabList.length}%`,
                        transform: `translate3d(${100 * currentIndex}%, 0, 0)`,
                    } },
                    react_1.default.createElement("div", { className: 'tab-bar__inner', style: { backgroundColor: activeColor } }))))),
        react_1.default.createElement("div", { className: 'tab-content' }, children)));
}
exports.Tabs = Tabs;
Tabs.Panel = ({ tabKey, currentTab, children, keepAlive = true, }) => {
    if (!keepAlive && tabKey !== currentTab) {
        return null;
    }
    return (react_1.default.createElement("div", { className: classnames_1.default('tab-content-item', {
            active: tabKey === currentTab,
        }) }, children));
};
//# sourceMappingURL=Tabs.js.map
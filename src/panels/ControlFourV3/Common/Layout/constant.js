// const A0001 = {
//   grid: "3*3",
//   position: [{ row: "1/4", column: "1/4" }],
// };
const A0001 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1/4" },
    { row: "3", column: "1/4" },
  ],
};
const A0002 = {
  grid: "3*2",
  position: [
    { row: "1/3", column: "1/3" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
  ],
};
const A0003 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1/4" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
    { row: "3", column: "3" },
  ],
};

const A0004 = {
  grid: "3*3",
  position: [
    { row: "1/4", column: "1/3" },
    { row: "1/4", column: "3" },
  ],
};

const A0005 = {
  grid: "2*3",
  position: [
    { row: "1/3", column: "1/3" },
    { row: "1", column: "3" },
    { row: "2", column: "3" },
  ],
};

const A0006 = {
  grid: "3*3",
  position: [
    { row: "1/4", column: "1/3" },
    { row: "1", column: "3" },
    { row: "2", column: "3" },
    { row: "3", column: "3" },
  ],
};

const A0007 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1" },
    { row: "1", column: "2" },
    { row: "1", column: "3" },
    { row: "2", column: "2" },
    { row: "2", column: "3" },
    { row: "3", column: "1/4" },
  ],
};

const A0008 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1" },
    { row: "1/3", column: "2" },
    { row: "1", column: "3" },
    { row: "2", column: "3" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
    { row: "3", column: "3" },
  ],
};

const A0009 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1" },
    { row: "1", column: "2" },
    { row: "1", column: "3" },
    { row: "2", column: "2" },
    { row: "2", column: "3" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
    { row: "3", column: "3" },
  ],
};

const A0010 = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1" },
    { row: "1/3", column: "2" },
    { row: "1/3", column: "3" },
    { row: "3", column: "1/4" },
  ],
};

const A0011 = {
  grid: "3*3",
  position: [
    { row: "1", column: "1" },
    { row: "1", column: "2" },
    { row: "1", column: "3" },
    { row: "2", column: "1" },
    { row: "2", column: "2" },
    { row: "2", column: "3" },
    { row: "3", column: "1" },
    { row: "3", column: "2/4" },
  ],
};

const A0012 = {
  grid: "3*3",
  position: [
    { row: "1", column: "1" },
    { row: "1", column: "2" },
    { row: "1", column: "3" },
    { row: "2", column: "1" },
    { row: "2", column: "2" },
    { row: "2", column: "3" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
    { row: "3", column: "3" },
  ],
};

/**
 * type: 0 开关 白色区域   1：设备，黑色区域
 */
// const LAYOUT_1 = [
//   {
//     type: 1,
//     position: [
//       [0, 3],
//       [0, 3],
//     ],
//   },
// ];

const LAYOUT_1 = [
  {
    type: 1,
    position: [
      [0, 3],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_2 = [
  {
    type: 1,
    position: [
      [0, 3],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 3 / 2],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [3 / 2, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_3 = [
  {
    type: 1,
    position: [
      [0, 3],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_4 = [
  {
    type: 1,
    position: [
      [0, 2],
      [0, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 3],
    ],
  },
];

const LAYOUT_5 = [
  {
    type: 1,
    position: [
      [0, 2],
      [0, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 3 / 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [3 / 2, 3],
    ],
  },
];

const LAYOUT_6 = [
  {
    type: 1,
    position: [
      [0, 2],
      [0, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_7 = [
  {
    type: 1,
    position: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_8 = [
  {
    type: 1,
    position: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },

  {
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },
];
const LAYOUT_9 = [
  {
    type: 1,
    position: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_10 = [
  {
    type: 0,
    position: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 3],
      [2, 3],
    ],
  },
];

const LAYOUT_11 = [
  {
    type: 0,
    position: [
      [0, 1],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [1, 3],
      [2, 3],
    ],
  },
];
const LAYOUT_12 = [
  {
    type: 0,
    position: [
      [0, 1],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [0, 1],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [1, 2],
    ],
  },
  {
    type: 0,
    position: [
      [0, 1],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [1, 2],
      [2, 3],
    ],
  },
  {
    type: 0,
    position: [
      [2, 3],
      [2, 3],
    ],
  },
];

// const new_layout_1 = {
//   layout_id: "01",
//   config: {
//     black_area: {
//       device: "",
//       type: "",
//     },
//   },
// };
const new_layout_1 = {
  layout_id: "01",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
  },
};
const new_layout_2 = {
  layout_id: "02",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
  },
};
const new_layout_3 = {
  layout_id: "03",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
  },
};
const new_layout_4 = {
  layout_id: "04",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
  },
};
const new_layout_5 = {
  layout_id: "05",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
  },
};
const new_layout_6 = {
  layout_id: "06",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
  },
};
const new_layout_7 = {
  layout_id: "07",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
    white_area5: {
      device: "",
      type: "",
    },
  },
};
const new_layout_8 = {
  layout_id: "08",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
    white_area5: {
      device: "",
      type: "",
    },
    white_area6: {
      device: "",
      type: "",
    },
  },
};
const new_layout_9 = {
  layout_id: "09",
  config: {
    black_area: {
      device: "",
      type: "",
    },
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
    white_area5: {
      device: "",
      type: "",
    },
    white_area6: {
      device: "",
      type: "",
    },
    white_area7: {
      device: "",
      type: "",
    },
  },
};
const new_layout_10 = {
  layout_id: "10",
  config: {
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
  },
};
const new_layout_11 = {
  layout_id: "11",
  config: {
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
    white_area5: {
      device: "",
      type: "",
    },
    white_area6: {
      device: "",
      type: "",
    },
    white_area7: {
      device: "",
      type: "",
    },
    white_area8: {
      device: "",
      type: "",
    },
  },
};
const new_layout_12 = {
  layout_id: "12",
  config: {
    white_area1: {
      device: "",
      type: "",
    },
    white_area2: {
      device: "",
      type: "",
    },
    white_area3: {
      device: "",
      type: "",
    },
    white_area4: {
      device: "",
      type: "",
    },
    white_area5: {
      device: "",
      type: "",
    },
    white_area6: {
      device: "",
      type: "",
    },
    white_area7: {
      device: "",
      type: "",
    },
    white_area8: {
      device: "",
      type: "",
    },
    white_area9: {
      device: "",
      type: "",
    },
  },
};

let newLayoutList = [
  new_layout_1,
  new_layout_2,
  new_layout_3,
  new_layout_4,
  new_layout_5,
  new_layout_6,
  new_layout_7,
  new_layout_8,
  new_layout_9,
  new_layout_10,
  new_layout_11,
  new_layout_12,
  // new_layout_13,
];

export default {
  // A0001,
  A0001,
  A0002,
  A0003,
  A0004,
  A0005,
  A0006,
  A0007,
  A0008,
  A0009,
  A0010,
  A0011,
  A0012,
};

export const layoutList = [
  LAYOUT_1,
  LAYOUT_2,
  LAYOUT_3,
  LAYOUT_4,
  LAYOUT_5,
  LAYOUT_6,
  LAYOUT_7,
  LAYOUT_8,
  LAYOUT_9,
  LAYOUT_10,
  LAYOUT_11,
  LAYOUT_12,
  // LAYOUT_13,
];

const clone = v => JSON.parse(JSON.stringify(v))



// type 是色区 1是黑色 0 是白色
// _type 是类型 【device 设备 sence 是场景 】白色区域 黑色是device 场景是固定01
// switch 只有白色区域有  黑色区域没有

// 下发保存数据
export const setOldToNew = (layout) => {

  console.log("APP:setOldToNew-param", layout)

  const nLayout = layout.map((item) => {
    const { type, position } = { ...item };
    return {
      type,
      position
    };
  });
  let num;
  layoutList.forEach((item, index) => {
    if (JSON.stringify(item) === JSON.stringify(nLayout)) {
      // if (JSON.stringify(item) === JSON.stringify(layout)) {
      num = index;
    }
  });
  if (num === undefined) {
    return layout;
  }
  let _newLayoutList = clone(newLayoutList).map((item) => item);
  layout.forEach((item, index) => {
    const { type, _type, name, device } = { ...item };




    // debugger;
    // let obj = { type: _type, name, switch: item.switch };
    let obj = { name };
    if (_type === "device") {
      obj.device = item.device;
    } else {
      obj.id = item.device;
    }
    if (type === 1) { // 黑色区域
      obj.type = _type;
      if (_type === "device") {
        obj.device = item.device;
      } else {
        obj.id = item.device;
      }
      _newLayoutList[num].config.black_area = obj;
    } else { // 白色区域
      obj.type = _type;
      if (_type === "device") {
        obj.device = item.device;
        // TODO 目前没有选择确定的情情况下是 undefied 后续确认后可以设置默认值为1
        // obj.switch= item.switch || 1;  
        obj.switch = item.switch
      } else {
        obj.id = item.device;
      }
      if (!layout.filter((_item) => _item.type === 1).length) {
        _newLayoutList[num].config[`white_area${index + 1}`] = obj;
      } else {
        _newLayoutList[num].config[`white_area${index}`] = obj;
      }
    }
  });
  _newLayoutList = _newLayoutList.map((item, index) => {
    if (index === num) {
      console.log("APP:setOldToNew-config", item.config)
    }

    return {
      layout_id: item.layout_id,
      config: JSON.stringify(item.config || {}),
    }
  });

  console.log("APP:setOldToNew-value", _newLayoutList[num])
  return _newLayoutList[num];
};

// 转换显示数据
export const setNewToOld = (layout) => {
  console.log("APP:setNewToOld", layout)

  let { layout_id = "", config = "{}" } = layout;
  if (typeof config === "string") {
    config = JSON.parse(config);
  }
  if (!layout_id) {
    return [];
  }
  let num = 0;
  newLayoutList.forEach((item, index) => {
    if (item.layout_id === layout_id) {
      num = index;
    }
  });
  const _layout = [].concat([...clone(layoutList)])[num];
  let res = _layout.map((item, index) => {
    const { type } = { ...item };
    let obj = { ...item };

    if (type === 1) { // 黑色区
      let __item = config?.black_area;
      obj.device = __item?.device || __item?.id;
      obj.name =__item.name;
      obj._type = __item.type;
    } else {
      if (!_layout.filter((_item) => _item.type === 1).length) {
        let __item = config[`white_area${index + 1}`];
        obj.device = __item?.device || __item?.id;
        obj.name = __item?.name;
        obj.switch = __item?.switch;
        obj._type = __item.type;
      } else {
        let __item = config[`white_area${index}`];
        obj.device = __item?.device || __item?.id;
        obj.name = __item?.name;
        obj.switch = __item?.switch;
        obj._type = __item?.type;
      }
    }
    return obj;
  });
  console.log("APP:setNewToOld-result", res)
  return res;
};

export const LAYOUT = {
  LAYOUT_1,
  LAYOUT_2,
  LAYOUT_3,
  LAYOUT_4,
  LAYOUT_5,
  LAYOUT_6,
  LAYOUT_7,
  LAYOUT_8,
  LAYOUT_9,
  LAYOUT_10,
  LAYOUT_11,
  LAYOUT_12,
  // LAYOUT_13,
};

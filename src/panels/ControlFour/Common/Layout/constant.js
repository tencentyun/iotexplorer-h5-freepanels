const one = {
  grid: "3*3",
  position: [{ row: "1/4", column: "1/4" }],
};
const two = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1/4" },
    { row: "3", column: "1/4" },
  ],
};
const three = {
  grid: "3*2",
  position: [
    { row: "1/3", column: "1/3" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
  ],
};
const four = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1/4" },
    { row: "3", column: "1" },
    { row: "3", column: "2" },
    { row: "3", column: "3" },
  ],
};

const five = {
  grid: "3*3",
  position: [
    { row: "1/4", column: "1/3" },
    { row: "1/4", column: "3" },
  ],
};

const six = {
  grid: "2*3",
  position: [
    { row: "1/3", column: "1/3" },
    { row: "1", column: "3" },
    { row: "2", column: "3" },
  ],
};

const seven = {
  grid: "3*3",
  position: [
    { row: "1/4", column: "1/3" },
    { row: "1", column: "3" },
    { row: "2", column: "3" },
    { row: "3", column: "3" },
  ],
};

const eight = {
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

const nine = {
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

const ten = {
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

const eleven = {
  grid: "3*3",
  position: [
    { row: "1/3", column: "1" },
    { row: "1/3", column: "2" },
    { row: "1/3", column: "3" },
    { row: "3", column: "1/4" },
  ],
};

const twelve = {
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

const thirteen = {
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
const LAYOUT_1 = [
  {
    type: 1,
    position: [
      [0, 3],
      [0, 3],
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
      [0, 3],
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
      [0, 2],
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

const LAYOUT_5 = [
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
      [1, 3],
      [0, 2],
    ],
  },
  {
    type: 1,
    position: [
      [0, 1],
      [1, 3],
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

const LAYOUT_6 = [
  {
    type: 0,
    position: [
      [0, 1],
      [0, 2],
    ],
  },
  {
    type: 1,
    position: [
      [1, 3],
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

const LAYOUT_7 = [
  {
    type: 1,
    position: [
      [0, 2],
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
      [0, 2],
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

export default {
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
  thirteen,
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
};

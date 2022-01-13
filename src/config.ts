const BOX_SIZE = 32;
const COLUMNS = 10;
const ROWS = 22;
const TETROMINOS = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

const COLORS = {
  I: "cyan",
  J: "yellow",
  L: "orange",
  O: "blue",
  S: "green",
  Z: "red",
  T: "purple",
};

export { BOX_SIZE, COLUMNS, ROWS, TETROMINOS, COLORS };

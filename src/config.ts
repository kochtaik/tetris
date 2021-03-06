const CELL_SIZE = 24;
const COLUMNS = 10;
const ROWS = 20;
const OFFSET = 1;
/**
 * Number by which the number of destroyed rows is multiplied
 */
const POINTS_COEFFICIENT = 100;
const INITIAL_SPEED = 48;
/**
 * Number which be subtracted from the current speed
 * when the player goes to the next level.
 */
const NEXT_LEVEL_SPEED = 5;
/**
 * A number multiplied by the level to get 
 * the number of lines that need to be destroyed to go to the next level.
 */
const LINES_BEFORE_NEXT_LEVEL_COEFFICIENT = 10;
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
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
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

export { 
  CELL_SIZE,
  COLUMNS,
  ROWS,
  TETROMINOS,
  COLORS,
  OFFSET,
  POINTS_COEFFICIENT,
  INITIAL_SPEED,
  LINES_BEFORE_NEXT_LEVEL_COEFFICIENT,
  NEXT_LEVEL_SPEED,
};

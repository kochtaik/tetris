import { BOX_SIZE, COLUMNS, ROWS, COLORS, TETROMINOS } from "./config";
import { getRandomInRange } from "./utils/getRandomInRange";
import { Tetromino } from "./tetromino";
import _ from "lodash";
import { Field } from "./field";

class Game {
  sizes: { width: number; height: number };
  count: number;
  tetrominoSequence: Array<Tetromino>;
  currentTetromino: Tetromino;
  field: Field;
  timestamp: number;

  constructor() {
    this.field = new Field(COLUMNS * BOX_SIZE, ROWS * BOX_SIZE);
    this.tetrominoSequence = [];
    this.count = 0;
    this.sizes = { width: 0, height: 0 };
  }

  prepareSequence() {
    const tetrominosNames = Object.keys(TETROMINOS);

    while (tetrominosNames.length) {
      const randomInt = getRandomInRange(0, tetrominosNames.length - 1);
      const [name] = tetrominosNames.splice(randomInt, 1);
      const matrix = TETROMINOS[name as keyof typeof TETROMINOS];
      const col = Math.floor((COLUMNS - matrix.length) / 2);
      const row = 0;
      const color = COLORS[name as keyof typeof COLORS];

      const tetromino = new Tetromino(name, matrix, col, row, color);
      this.tetrominoSequence.push(tetromino);
    }
  }

  gameLoop(delta?: number) {
    const secondsPassed = Math.floor(delta / 300);

    if (secondsPassed !== this.timestamp) {
      this.timestamp = secondsPassed;
      this.field.render(this.currentTetromino);

      if (!this.currentTetromino.isCollide(this.field.field)) {
        this.currentTetromino.moveDown();
      } else {
        this.field.saveFieldState();
        this.currentTetromino = this.tetrominoSequence.pop();
      }
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  play() {
    this.prepareSequence();
    this.currentTetromino = this.tetrominoSequence.pop();

    this.gameLoop();
  }

  init() {
    this.field.create();

    document.querySelector("button").addEventListener("click", () => {
      this.play();
    });
  }
}

export { Game };

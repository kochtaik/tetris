import { BOX_SIZE, COLUMNS, ROWS, COLORS, TETROMINOS } from "./config";
import { getRandomInRange } from "./utils/getRandomInRange";
import { Tetromino } from "./tetromino";
import * as _ from "lodash";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  sizes: { width: number; height: number };
  field: Matrix;
  count: number;
  tetrominoSequence: Array<Tetromino>;
  currentTetromino: Tetromino;
  private lastFieldState: Matrix;
  private lastCanvasState: ImageData;
  timestamp: number;

  constructor() {
    this.canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.ctx = null;
    this.field = [];
    this.tetrominoSequence = [];
    this.count = 0;
    this.sizes = { width: 0, height: 0 };
  }

  setSizes() {
    this.sizes = {
      width: COLUMNS * BOX_SIZE,
      height: ROWS * BOX_SIZE,
    };
    this.canvas.width = this.sizes.width;
    this.canvas.height = this.sizes.height;
  }

  createField() {
    for (let row = 0; row < ROWS; row += 1) {
      /* create empty row */
      this.field[row] = [];

      for (let col = 0; col < COLUMNS; col += 1) {
        /* fill it with zeros */
        this.field[row][col] = 0;

        /* create visible grid background */
        const x = col * BOX_SIZE;
        const y = row * BOX_SIZE;
        this.ctx.strokeStyle = "gray";
        this.ctx.strokeRect(x, y, BOX_SIZE, BOX_SIZE);
      }
    }
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

  buildMatrix(tetromino: Tetromino) {
    let y = tetromino.row;

    for (let rowIdx = 0; rowIdx < tetromino.matrix.length; rowIdx += 1) {
      let x = tetromino.col;
      const row = tetromino.matrix[rowIdx];

      for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
        const value = row[colIdx];
        if (value) {
          this.field[y][x] = 1;
        }
        x += 1;
      }

      y += 1;
    }
  }

  render() {
    for (let rowIdx = 0; rowIdx < this.field.length; rowIdx += 1) {
      const row = this.field[rowIdx];

      for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
        const col = row[colIdx];
        if (col) {
          this.ctx.fillStyle = this.currentTetromino.color;
          this.ctx.strokeRect(
            colIdx * BOX_SIZE,
            rowIdx * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
          this.ctx.fillRect(
            colIdx * BOX_SIZE,
            rowIdx * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
        }
      }
    }
  }

  gameLoop(delta?: number) {
    const secondsPassed = Math.floor(delta / 1000);

    if (secondsPassed !== this.timestamp) {
      this.timestamp = secondsPassed;
      this.field = _.cloneDeep(this.lastFieldState);

      this.ctx.putImageData(this.lastCanvasState, 0, 0);
      this.buildMatrix(this.currentTetromino);

      this.render();
      this.currentTetromino.move(
        this.currentTetromino.row + 1,
        this.currentTetromino.col
      );
    }
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  startGame() {
    this.prepareSequence();
    this.currentTetromino = this.tetrominoSequence[0];

    this.gameLoop();
  }

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.setSizes();
    this.createField();
    this.lastFieldState = _.cloneDeep(this.field);

    this.lastCanvasState = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    document.querySelector("button").addEventListener("click", () => {
      this.startGame();
    });
  }
}

export { Game };

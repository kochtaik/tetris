import _ from "lodash";
import { BOX_SIZE, COLUMNS, ROWS, COLORS } from "./config";
import { Tetromino } from "./tetromino";

class Field {
  public width: number;
  public height: number;
  public canvas: HTMLCanvasElement;
  public field: Matrix;
  private ctx: CanvasRenderingContext2D;

  constructor(width = 512, height = 512) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas");
    this.ctx = document.querySelector("canvas").getContext("2d");
    this.field = [];

    this.canvas.width = width;
    this.canvas.height = height;
  }

  public render(tetromino: Tetromino) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw();
    this.drawTetromino(tetromino);
  }

  draw() {
    for (let r = 0; r < this.field.length; r += 1) {
      const row = this.field[r];

      for (let c = 0; c < this.field.length; c += 1) {
        const col = row[c];

        if (col) {
          this.ctx.fillStyle = COLORS[col as keyof typeof COLORS];
          this.ctx.fillRect(c * BOX_SIZE, r * BOX_SIZE, BOX_SIZE, BOX_SIZE);
        }

        this.drawGridCell(c * BOX_SIZE, r * BOX_SIZE);
      }
    }
  }

  drawTetromino(tetromino: Tetromino) {
    for (let r = 0; r < tetromino.matrix.length; r += 1) {
      for (let c = 0; c < tetromino.matrix[r].length; c += 1) {
        const cell = tetromino.matrix[r][c];
        if (cell) {
          this.ctx.fillStyle = tetromino.color;
          this.ctx.fillRect(
            (tetromino.col + c) * BOX_SIZE,
            (tetromino.row + r) * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
          this.ctx.strokeRect(
            (tetromino.col + c) * BOX_SIZE,
            (tetromino.row + r) * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
        }
      }
    }
  }

  place(tetromino: Tetromino) {
    let y = tetromino.row;
    for (let rowIdx = 0; rowIdx < tetromino.matrix.length; rowIdx += 1) {
      let x = tetromino.col;
      const row = tetromino.matrix[rowIdx];
      for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
        const value = row[colIdx];
        if (value) {
          this.field[y][x] = tetromino.name;
        }
        x += 1;
      }
      y += 1;
    }
  }

  removeFullRows() {
    for (let r = this.field.length - 1; r >= 0; ) {
      const row = this.field[r];
      const isFullRow = row.every((item) => !!item);

      if (isFullRow) {
        for (let rowIdx = r; rowIdx >= 1; rowIdx -= 1) {
          for (let c = 0; c < this.field[rowIdx].length; c += 1) {
            this.field[rowIdx][c] = this.field[rowIdx - 1][c];
          }
        }
      } else {
        r -= 1;
      }
    }
  }

  /**
   * Checks whether a tetromino hits other tetrominos or field ground
   * */
  canCollide(matrix: Matrix, row: number, col: number) {
    for (let r = 0; r < matrix.length; r += 1) {
      for (let c = 0; c < matrix[r].length; c += 1) {
        const cell = matrix[r][c];

        if (
          cell &&
          (col + c < 0 ||
            col + c >= COLUMNS ||
            row + r >= ROWS ||
            this.field[row + r][col + c])
        ) {
          return true;
        }
      }
    }
  }

  private drawGridCell(x: number, y: number) {
    this.ctx.strokeStyle = "gray";
    this.ctx.strokeRect(x, y, BOX_SIZE, BOX_SIZE);
  }

  public create() {
    for (let row = 0; row < ROWS; row += 1) {
      /* create empty row */
      this.field[row] = [];

      for (let col = 0; col < COLUMNS; col += 1) {
        /* fill it with zeros */
        this.field[row][col] = 0;

        /* create visible grid background */
        this.drawGridCell(col * BOX_SIZE, row * BOX_SIZE);
      }
    }
  }
}

export { Field };

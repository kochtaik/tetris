import _ from "lodash";
import { BOX_SIZE, COLUMNS, ROWS, COLORS } from "./config";
import { Tetromino } from "./tetromino";

class Field {
  public width: number;
  public height: number;
  public canvas: HTMLCanvasElement;
  public field: Matrix;
  private lastFieldState: Matrix;
  private ctx: CanvasRenderingContext2D;

  constructor(width = 512, height = 512) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas");
    this.ctx = document.querySelector("canvas").getContext("2d");
    this.field = [];
    // this.lastCanvasState = null;
    this.lastFieldState = [];

    this.canvas.width = width;
    this.canvas.height = height;
  }

  public render(tetromino: Tetromino) {
    this.field = _.cloneDeep(this.lastFieldState);

    this.updateMatrix(tetromino);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.draw();
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

  public saveFieldState() {
    this.lastFieldState = _.cloneDeep(this.field);
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
    console.log(this.field);
  }

  private drawGridCell(x: number, y: number) {
    this.ctx.strokeStyle = "gray";
    this.ctx.strokeRect(x, y, BOX_SIZE, BOX_SIZE);
  }

  private updateMatrix(tetromino: Tetromino) {
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

    this.saveFieldState();
  }
}

export { Field };

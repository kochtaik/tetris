import _ from "lodash";
import { BOX_SIZE, COLUMNS, ROWS } from "./config";
import { Tetromino } from "./tetromino";

class Field {
  public width: number;
  public height: number;
  public canvas: HTMLCanvasElement;
  public field: Matrix;
  private boxColor: string;
  private lastCanvasState: ImageData | null;
  private lastFieldState: Matrix;
  private ctx: CanvasRenderingContext2D;

  constructor(width = 512, height = 512) {
    this.width = width;
    this.height = height;
    this.canvas = document.querySelector("canvas");
    this.ctx = document.querySelector("canvas").getContext("2d");
    this.field = [];
    this.lastCanvasState = null;
    this.lastFieldState = [];

    this.canvas.width = width;
    this.canvas.height = height;
  }

  public render(tetromino: Tetromino) {
    this.field = _.cloneDeep(this.lastFieldState);

    this.ctx.putImageData(this.lastCanvasState, 0, 0);
    this.updateMatrix(tetromino);
    this.draw();
  }

  public saveFieldState() {
    this.lastCanvasState = this.ctx.getImageData(0, 0, this.width, this.height);
    this.lastFieldState = _.cloneDeep(this.field);
  }

  private draw() {
    for (let rowIdx = 0; rowIdx < this.field.length; rowIdx += 1) {
      const row = this.field[rowIdx];

      for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
        const col = row[colIdx];
        if (col) {
          this.ctx.fillStyle = this.boxColor;
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

  private updateMatrix(tetromino: Tetromino) {
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

  public setBoxColor(color: string) {
    this.boxColor = color;
  }

  public create() {
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

    this.saveFieldState();
  }
}

export { Field };

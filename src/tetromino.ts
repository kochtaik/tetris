import { BOX_SIZE, COLUMNS, ROWS } from "./config";

class Tetromino {
  public readonly name: string;
  public col: number;
  public row: number;
  public color: string;
  public matrix: Matrix;

  constructor(
    name: string,
    matrix: Matrix,
    col: number,
    row = -2,
    color = "#000000"
  ) {
    this.name = name;
    this.col = col;
    this.row = row;
    this.color = color;
    this.matrix = matrix;
  }

  moveDown() {
    this.row += 1;
  }

  moveLeft() {
    this.col -= 1;
  }

  moveRight() {
    this.col += 1;
  }

  /**
   * Rotates tetrominos matrix clockwise
   */
  rotate() {
    const result = [];
    for (let i = 0; i < this.matrix[0].length; i++) {
      let row = this.matrix.map((e) => e[i]).reverse();
      result.push(row);
    }
    return result;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let rowIdx = 0; rowIdx < this.matrix.length; rowIdx += 1) {
      const row = this.matrix[rowIdx];

      for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
        const col = row[colIdx];

        if (col) {
          ctx.fillStyle = this.color;
          ctx.strokeRect(
            (this.col + colIdx) * BOX_SIZE,
            (this.row + rowIdx) * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
          ctx.fillRect(
            (this.col + colIdx) * BOX_SIZE,
            (this.row + rowIdx) * BOX_SIZE,
            BOX_SIZE,
            BOX_SIZE
          );
        }
      }
    }
  }
}

export { Tetromino };

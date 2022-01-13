import { BOX_SIZE } from "./config";
import { Field } from "./field";
class Tetromino {
  public readonly name: string;
  public col: number;
  public row: number;
  public color: string;
  public readonly matrix: Matrix;

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

  move(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  /**
   * Checks whether a tetromino hits other tetrominos or field ground
   * */
  isCollide(field: Matrix) {
    // Check if a tetromino hits the bottom
    if (this.row + 2 === field.length) {
      return true;
    }

    // Check if a tetromino hits other tetrominos vertically

    let offsetY = 1;
    for (let r = this.matrix.length - 1; r >= 0; r -= 1) {
      let offsetX = 1;
      const row = this.matrix[r];

      for (let c = row.length - 1; c >= 0; c -= 1) {
        const col = row[c];

        // Check if tetromino's item has 0 or undefined below in its matrix
        if (!this.matrix[r + 1] || !this.matrix[r + 1][c]) {
          const x = this.col + (this.matrix.length - offsetX);
          const y = this.row + (this.matrix.length - offsetY);

          if (col && field[y + 1]?.[x]) {
            return true;
          }
        }

        offsetX += 1;
      }

      offsetY += 1;
    }
  }
}

export { Tetromino };

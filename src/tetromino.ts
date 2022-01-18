import { BOX_SIZE, COLUMNS, ROWS } from "./config";

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
   * Rotates tetrominos matrix clockwise without changing it
   */
  rotate() {
    const n = this.matrix.length;
    const x = Math.floor(n / 2);
    const y = n - 1;

    for (let i = 0; i < x; i++) {
      for (let j = i; j < y - i; j++) {
        let k = this.matrix[i][j];
        this.matrix[i][j] = this.matrix[y - j][i];
        this.matrix[y - j][i] = this.matrix[y - i][y - j];
        this.matrix[y - i][y - j] = this.matrix[j][y - i];
        this.matrix[j][y - i] = k;
      }
    }
  }

  /**
   * Checks whether a tetromino hits other tetrominos or field ground
   * */
  isCollide(field: Matrix) {
    let offsetY = 1;
    for (let r = this.matrix.length - 1; r >= 0; r -= 1) {
      let offsetX = 1;
      const row = this.matrix[r];

      for (let c = row.length - 1; c >= 0; c -= 1) {
        const col = row[c];

        // Check if tetromino's item has 0 or undefined below in its matrix
        if (!this.matrix[r + 1] || !this.matrix[r + 1][c]) {
          // Coordinates of tetromino's items on the field
          const x = this.col + (this.matrix.length - offsetX);
          const y = this.row + (this.matrix.length - offsetY);

          // Check if a tetromino hits the bottom (first condition)
          // or other tetrominos (second conditions)
          if ((col && y + 1 === ROWS) || (col && field[y + 1]?.[x])) {
            return true;
          }
        }

        offsetX += 1;
      }

      offsetY += 1;
    }
  }

  isCollideLeft(field: Matrix) {
    for (let r = 0; r < this.matrix.length; r += 1) {
      const row = this.matrix[r];

      for (let c = 0; c < this.matrix.length; c += 1) {
        const tetrominosItem = row[c];

        /* coordinates of tetromino's item on the field */
        const x = this.col + c;
        const y = this.row + r;

        if (tetrominosItem) {
          if (x === 0) return true;

          /* 
            Check if there is no 0 or undefined from left of tetromino's item.
            If so, check if there is a 1 on the field from left.
          */
          if (!row[c - 1]) {
            if (field[y][x - 1]) {
              return true;
            }
          }
        }
      }
    }
  }

  isCollideRight(field: Matrix) {
    for (let r = 0; r < this.matrix.length; r += 1) {
      const row = this.matrix[r];

      for (let c = 0; c < this.matrix.length; c += 1) {
        const tetrominosItem = row[c];

        /* coordinates of tetromino's item on the field */
        const x = this.col + c;
        const y = this.row + r;

        if (tetrominosItem) {
          if (x === COLUMNS - 1) return true;

          /* 
            Check if there is no 0 or undefined from right of tetromino's item.
            If so, check if there is a 1 on the field from right.
          */
          if (!row[c + 1]) {
            if (field[y][x + 1]) {
              return true;
            }
          }
        }
      }
    }
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

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

    console.log(this.matrix);
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

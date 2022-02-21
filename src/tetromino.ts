class Tetromino {
  public name: string;
  public matrix: Matrix;
  public row: number;
  public column: number;

  constructor(name: string, matrix: Matrix, row: number, column: number) {
    this.name = name;
    this.matrix = matrix;
    this.row = row;
    this.column = column;
  }

  public moveLeft(): void {
    this.column -= 1;
  }

  public moveRight(): void {
    this.column += 1;
  }

  public moveDown(): void {
    this.row += 1;
  }

  /**
   * Get height of the tetromino
   * (number of rows that has at least one "1")
   */

  public getHeight(): number {
    let count = 0;

    for (let r = 0; r < this.matrix.length; r += 1) {
      const isNotEmpty = this.matrix[r].some((cell) => !!cell);
      if (isNotEmpty) count += 1;
    }

    return count;
  }


  /**
   *
   * Returns a new matrix rotated 90 degrees clockwise. It can be set instead of current one
   *
   */

  public rotate(): Matrix {
    return this.matrix.map((row, i) =>
      row.map((_, j) => this.matrix[this.matrix.length - 1 - j][i])
    );
  }
}

export default Tetromino;
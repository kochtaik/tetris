class Tetromino {
  public name: string
  public matrix: Matrix;
  public row: number
  public column: number;

  constructor(name: string, matrix: Matrix, row: number, column: number) {
    this.name = name;
    this.matrix = matrix;
    this.row = row;
    this.column = column;
  }

  public moveLeft() {
    this.column -= 1;
  }

  public moveRight() {
    this.column += 1;
  }

  public moveDown() {
    this.row += 1;
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
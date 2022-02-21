import Tetromino from "./Tetromino";

/**
 * A class that performs all manipulations with board matrix
 */
class Board {
  public matrix: Matrix;
  public rows: number;
  public columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];
  }

  public create(): void {
    /* start from -2 in order to start drawing elements behind upper border of the field */
    for (let r = -2; r < this.rows; r += 1) {
      const row: Array<number> = new Array(this.columns);
      this.matrix[r] = row.fill(0);
    }
  }

  public canCollide(matrix: Matrix, targetRow: number, targetCol: number): boolean {
    for (let r = 0; r < matrix.length; r += 1) {
      for (let c = 0; c < matrix[r].length; c += 1) {
        const col = matrix[r][c] as number;

        if (col && (
          r + targetRow >= this.matrix.length ||
          c + targetCol >= this.matrix[r].length ||
          c + targetCol < 0 ||
          this.matrix[targetRow + r][targetCol + c]
        )) {
          return true;
        }
      }
    }
  }

  /** 
   * Merges tetromino into matrix of board;
   * 
   * @returns number of destroyed rows 
   */
  public landTetromino(tetromino: Tetromino): number {
    for (let r = 0; r < tetromino.matrix.length; r += 1) {
      for (let c = 0; c < tetromino.matrix[r].length; c += 1) {
        const col = tetromino.matrix[r][c];
        const x = tetromino.column + c;
        const y = tetromino.row + r;

        if (col) {
          this.matrix[y][x] = tetromino.name;
        }
      }
    }
    return this.destroyFullRows();
  }

  private destroyFullRows(): number {
    let rowsDestroyed = 0;

    for (let r = 0; r < this.matrix.length; r += 1) {
      const row = this.matrix[r];
      const isFullRow = row.every((cell) => !!cell);
      if (isFullRow) {

        /* Move all rows above one row down */
        for (let row = r; row > 0; row -= 1) {
          for (let col = 0; col < this.matrix[row].length; col += 1) {
            this.matrix[row][col] = this.matrix[row - 1][col];
          }
        }

        rowsDestroyed += 1;
      }
    }
    return rowsDestroyed;
  }

  /**
   * Clears the matrix
   */
  public clear(): void {
    for (let r = 0; r < this.matrix.length; r += 1) {
      for (let c = 0; c < this.matrix[r].length; c += 1) {
        this.matrix[r][c] = 0;
      }
    }
  }
}

export default Board;
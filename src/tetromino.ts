import { BOX_SIZE } from "./config";

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
}

export { Tetromino };

import Renderer from "./Renderer";
import Tetromino from "./Tetromino";
import { CELL_SIZE } from "./config";

class NextPiece {
  private renderer: Renderer;
  private containerSize = 6;

  constructor() {
    this.renderer = new Renderer();
    const nextPieceCanvas = document.createElement('canvas');
    document.querySelector("#nextPiece").appendChild(nextPieceCanvas);

    this.renderer.setCanvas(nextPieceCanvas);
    this.renderer.setCanvasSize(CELL_SIZE * this.containerSize, CELL_SIZE * this.containerSize);
  }

  public set(tetromino: Tetromino): void {
    const tetrominoWidth = tetromino.matrix.length;
    const tetrominoHeight = tetromino.getHeight();

    /* Center tetromino. Subtract one row from "I" tetromino in order to center it properly */
    tetromino.column = (this.containerSize - tetrominoWidth) / 2;
    tetromino.row = (this.containerSize - tetrominoHeight) / 2;
    if (tetromino.name === "I") tetromino.row -= 1;

    this.renderer.clear();
    this.renderer.render(tetromino);
  }

  public clear(): void {
    this.renderer.clear();
  }
}

export default NextPiece;

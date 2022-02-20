import Tetromino from "./Tetromino";
import Matrix from "./Matrix";
class Controllers {
  private board: Matrix;
  private tetromino: Tetromino;
  public isPaused: boolean;

  constructor(board: Matrix) {
    this.board = board;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (this.isPaused) return;

        if (!this.board.canCollide(
          this.tetromino.matrix,
          this.tetromino.row,
          this.tetromino.column - 1
        )) {
          this.tetromino.moveLeft();
        }
      }

      if (e.key === 'ArrowRight') {
        if (this.isPaused) return;

        if (!this.board.canCollide(
          this.tetromino.matrix,
          this.tetromino.row,
          this.tetromino.column + 1
        )) {
          this.tetromino.moveRight();
        }
      }

      /* Soft drop */
      if (e.key === 'ArrowDown') {
        if (this.isPaused) return;

        if (!this.board.canCollide(
          this.tetromino.matrix,
          this.tetromino.row + 1,
          this.tetromino.column
        )) {
          this.tetromino.moveDown();
        }
      }

      /* Rotation */
      if (e.key === "ArrowUp") {
        if (this.isPaused) return;
        const rotatedTetrominoBoardMatrix = this.tetromino.rotate();

        if (!this.board.canCollide(
          rotatedTetrominoBoardMatrix,
          this.tetromino.row,
          this.tetromino.column,
        )) {
          this.tetromino.matrix = rotatedTetrominoBoardMatrix;
        }
      }

      /* Hard drop */
      if (e.key === " ") {
        if (this.isPaused) return;
        while (!this.board.canCollide(
          this.tetromino.matrix,
          this.tetromino.row + 1,
          this.tetromino.column
        )) {
          this.tetromino.moveDown();
        }
      }
    });
  }

  public setTetromino(tetromino: Tetromino) {
    this.tetromino = tetromino;
  }
}

export default Controllers;
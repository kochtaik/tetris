import Tetromino from "./Tetromino";

class Controllers {
  private tetromino: Tetromino;

  public initControllers() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row,
          this.currentTetromino.column - 1
        )) {
          this.currentTetromino.moveLeft();
        }
      }

      if (e.key === 'ArrowRight') {
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row,
          this.currentTetromino.column + 1
        )) {
          this.currentTetromino.moveRight();
        }
      }

      if (e.key === 'ArrowDown') {
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row + 1,
          this.currentTetromino.column
        )) {
          this.currentTetromino.moveDown();
        }
      }

      if (e.key === "ArrowUp") {
        const rotatedTetrominoMatrix = this.currentTetromino.rotate();

        if (!this.board.canCollide(
          rotatedTetrominoMatrix,
          this.currentTetromino.row,
          this.currentTetromino.column,
        )) {
          this.currentTetromino.matrix = rotatedTetrominoMatrix;
        }
      }

/*       if (e.key === " ") {
        while (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row + 1,
          this.currentTetromino.column
        )) {
          this.currentTetromino.moveDown();
        }

        this.board.landTetromino(this.currentTetromino);
      } */
      
    })
  }
}

export default Controllers;
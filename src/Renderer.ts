
import { CELL_SIZE, COLORS, OFFSET } from "./config";
import Tetromino from "./Tetromino";

/**
 * Class responsible for transferring data to the HTML canvas
 */
class Canvas {
  public canvas: HTMLCanvasElement | null;
  public context: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = null
    this.context = null;
  }

  public showGameOver(): void {
    const boxHeight = CELL_SIZE * 7;
    const boxWidth = this.canvas.width;
    const x  = 0;
    const y = (this.canvas.height / 2) - (boxHeight / 2);
    this.context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.context.fillRect(x, y, boxWidth, boxHeight);

    const message = 'GAME OVER';
    this.context.textAlign = 'center';
    this.context.textBaseline = "middle";
    this.context.font = "36px sans-serif"
    this.context.fillStyle = '#ffffff';
    this.context.fillText(message, this.canvas.width / 2, this.canvas.height / 2)
  }

  /**
   * Draws board on canvas according to the matrix 
   */
  public draw(matrix: Matrix): void {
    this.clear();
    for (let r = 0; r < matrix.length; r += 1) {
      for (let c = 0; c < matrix[r].length; c += 1) {
        const cell = matrix[r][c];
        const x = CELL_SIZE * c;
        const y = CELL_SIZE * r;

        if (cell) {
          this.context.fillStyle = COLORS[cell as keyof typeof COLORS];
          this.context.fillRect(x, y, CELL_SIZE - OFFSET, CELL_SIZE - OFFSET);
        }

        /* Draw grid */
        this.context.strokeStyle = '#ffffff';
        this.context.lineWidth = 0.1;
        this.context.strokeRect(x, y, CELL_SIZE, CELL_SIZE)
      }
    }
  }

  /**
   * Draws the tetromino on canvas.
   */
  public render(tetromino: Tetromino): void {
    for (let r = 0; r < tetromino.matrix.length; r += 1) {
      for (let c = 0; c < tetromino.matrix[r].length; c += 1) {
        const cell = tetromino.matrix[r][c];
        const x = (tetromino.column + c) * CELL_SIZE;
        const y = (tetromino.row + r) * CELL_SIZE;

        if (cell) {
          this.context.fillStyle = COLORS[tetromino.name as keyof typeof COLORS];
          this.context.fillRect(x, y, CELL_SIZE - OFFSET, CELL_SIZE - OFFSET)
        }
      }
    }
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  public setCanvasSize(width = 300, height = 150) {
    if (!this.canvas) {
      throw new Error('No canvas found. Please, provide canvas');
    }

    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * Clears the canvas
   */
  public clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Canvas
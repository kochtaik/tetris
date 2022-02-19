import BoardMatrix from "./Matrix"
import Tetromino from "./Tetromino";
import Controllers from "./controllers";
import { ROWS, COLUMNS, TETROMINOS, CELL_SIZE, POINTS_COEFFICIENT } from "./config";
import { getRandomInRange } from "./utils/getRandomInRange";
import Renderer from "./Renderer";
import Timer from "./Timer";

class Game {
  public board: BoardMatrix
  private sequence: Array<Tetromino>
  private currentTetromino: Tetromino;
  private animationId: number;
  private renderer: Renderer | null;
  public _points: number;
  public _level: number;
  public timer: Timer | null;
  private frameStamp: number;
  public speed: number;
  public linesBeforeNextLevel: number;
  public isPaused = false;

  constructor() {
    this.board = new BoardMatrix(ROWS, COLUMNS);
    this.renderer = null;
    this.timer = null;
    this.sequence = [];
    this.frameStamp = 0;
    this._points = 0;
    this._level = 1;
    this.speed = 48; // speed is measured in frames per cell
    this.linesBeforeNextLevel = this.level * 10;
  }

  get points(): number {
    return this._points
  }

  set points(value: number) {
    this._points = value;
    const pointsElement = document.querySelector('#points');
    pointsElement.textContent = value.toString();
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
    const levelElement = document.querySelector("#level");
    levelElement.textContent = value.toString();
  }


  private initControllers() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (this.isPaused) return;
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row,
          this.currentTetromino.column - 1
        )) {
          this.currentTetromino.moveLeft();
        }
      }

      if (e.key === 'ArrowRight') {
        if (this.isPaused) return;
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row,
          this.currentTetromino.column + 1
        )) {
          this.currentTetromino.moveRight();
        }
      }

      if (e.key === 'ArrowDown') {
        if (this.isPaused) return;
        if (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row + 1,
          this.currentTetromino.column
        )) {
          this.currentTetromino.moveDown();
        }
      }

      if (e.key === "ArrowUp") {
        if (this.isPaused) return;
        const rotatedTetrominoBoardMatrix = this.currentTetromino.rotate();

        if (!this.board.canCollide(
          rotatedTetrominoBoardMatrix,
          this.currentTetromino.row,
          this.currentTetromino.column,
        )) {
          this.currentTetromino.matrix = rotatedTetrominoBoardMatrix;
        }
      }

      if (e.key === " ") {
        if (this.isPaused) return;
        while (!this.board.canCollide(
          this.currentTetromino.matrix,
          this.currentTetromino.row + 1,
          this.currentTetromino.column
        )) {
          this.currentTetromino.moveDown();
        }

        this.handleGroundHit();
      }
    })
  }

  private generateTetrominoSequence() {
    const names = Object.keys(TETROMINOS);

    while (names.length) {
      const randomInt = getRandomInRange(0, names.length - 1);
      const [name] = names.splice(randomInt, 1);
      const matrix = TETROMINOS[name as keyof typeof TETROMINOS];
      const row = 0;
      const column = Math.floor((COLUMNS - matrix.length) / 2);
      const tetromino = new Tetromino(name, matrix, row, column);
      this.sequence.push(tetromino);
    }
  }

  getNextTetromino() {
    if (!this.sequence.length) {
      this.generateTetrominoSequence();
    }
    return this.sequence.pop();
  }

  play() {
    this.currentTetromino = this.getNextTetromino();
    this.timer.start();
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  pause(): void {
    /* Return if game is not started */
    if (!this.currentTetromino) return;
  
    if (this.isPaused) {
      (document.querySelector("#pause") as HTMLElement).textContent = "Pause";
      this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
      this.timer.start();
    } else {
      (document.querySelector("#pause") as HTMLElement).textContent = "Resume";
      this.timer.pause();
    }

    this.isPaused = !this.isPaused;
  }

  handleGroundHit() {
    const rowsDestroyed = this.board.landTetromino(this.currentTetromino);
    this.incrementLevel(rowsDestroyed);
    this.incrementPoints(rowsDestroyed);
    this.currentTetromino = this.getNextTetromino();

    if (!this.animationId) {
      this.animationId = requestAnimationFrame(this.gameLoop.bind(this))
    }
  }

  isGameOver() {
    return this.board.matrix[0].some((cell) => !!cell);
  }

  endGame() {
    cancelAnimationFrame(this.animationId);
    this.renderer.showGameOver();
  }

  incrementPoints(rowsNumber: number): void {
    this.points += rowsNumber * POINTS_COEFFICIENT;
  }

  incrementLevel(rowsNumber: number): void {
    this.linesBeforeNextLevel -= rowsNumber;

    if (this.linesBeforeNextLevel <= 0) {
      this.level += 1;
      this.linesBeforeNextLevel = (this.level * 10) - rowsNumber;
      this.speed -= 5;
    }
  }

  gameLoop(time: number) {
    if (this.isPaused) return; 
    this.frameStamp = (this.frameStamp + 1) % this.speed;

    if (this.frameStamp % this.speed === 0) {

      if (!this.board.canCollide(
        this.currentTetromino.matrix,
        this.currentTetromino.row + 1,
        this.currentTetromino.column
        )) {
          this.currentTetromino.moveDown()
        } else {
          this.handleGroundHit();
        }
    }
      
    if (this.isGameOver()) {
      return this.endGame();
    }
    this.renderer.draw(this.board.matrix); // update canvas accordingly to the existing matrix
    this.renderer.render(this.currentTetromino)
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this))
  }

  initRenderer() {
    this.renderer = new Renderer();
    const canvas = document.createElement('canvas');
    const canvasContainer = document.querySelector('#canvasContainer');

    if (!canvasContainer) {
      throw new Error('Canvas container must be provided');
    }
    
    canvasContainer.appendChild(canvas);
    this.renderer.setCanvas(canvas);
    this.renderer.setCanvasSize(CELL_SIZE * COLUMNS, CELL_SIZE * ROWS);
  }
  
  init() {
    this.initRenderer();
    this.board.create();
    this.renderer.draw(this.board.matrix); // initial render to draw grid
    this.initControllers();
    this.timer = new Timer();

    document.querySelector('#start').addEventListener('click', (e) => {
      (e.target as HTMLElement).blur();
      this.play()
    })
    
    document.querySelector('#pause').addEventListener('click', (e) => {
      (e.target as HTMLElement).blur();
      this.pause();
    })
  }
}

export { Game };

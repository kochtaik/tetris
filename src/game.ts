import BoardMatrix from "./Matrix";
import Tetromino from "./Tetromino";
import Controllers from "./controllers";
import { ROWS, COLUMNS, TETROMINOS, CELL_SIZE, POINTS_COEFFICIENT } from "./config";
import { getRandomInRange } from "./utils/getRandomInRange";
import Renderer from "./Renderer";
import Timer from "./Timer";
import NextPiece from "./NextPiece";
import _ from "lodash";
class Game {
  public board: BoardMatrix;
  public nextPiece: NextPiece;
  public sequence: Array<Tetromino>;
  public timer: Timer | null;
  public controllers: Controllers | null;
  public speed: number;
  public linesBeforeNextLevel: number;
  private renderer: Renderer | null;
  private animationId: number;
  private _currentTetromino: Tetromino;
  private _points: number;
  private _level: number;
  private _isPaused: boolean;
  private frameStamp: number;

  constructor() {
    this.board = new BoardMatrix(ROWS, COLUMNS);
    this.controllers = null;
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
    return this._points;
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

  get currentTetromino(): Tetromino {
    return this._currentTetromino;
  }

  set currentTetromino(value: Tetromino) {
    this._currentTetromino = value;
    this.controllers.setTetromino(value);
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  set isPaused(value: boolean) {
    this._isPaused = value;
    this.controllers.isPaused = value;
  }

  generateTetrominoSequence() {
    const names = Object.keys(TETROMINOS);

    while (names.length) {
      const randomInt = getRandomInRange(0, names.length - 1);
      const [name] = names.splice(randomInt, 1);
      const matrix = TETROMINOS[name as keyof typeof TETROMINOS];
      const row = name === "I" ? -2 : -1;
      const column = Math.floor((COLUMNS - matrix.length) / 2);
      const tetromino = new Tetromino(name, matrix, row, column);
      this.sequence.push(tetromino);
    }
  }

  getCurrentTetromino(): Tetromino {
    if (!this.sequence.length) {
      this.generateTetrominoSequence();
    }

    const currentTetromino = this.sequence.pop();
    this.setNextTetromino();

    return currentTetromino;
  }

  setNextTetromino(): void {
    if (!this.sequence.length) {
      this.getCurrentTetromino();
    }

    const nextTetromino = _.cloneDeep(this.sequence[this.sequence.length - 1]);
    this.nextPiece.set(nextTetromino);
  }

  reset() {
    this.timer.reset();
    this.renderer.clear();
    this.board.clear();
    this.nextPiece.clear();
    this.level = 1;
    this.points = 0;
    this.speed = 48;
    this.linesBeforeNextLevel = this.level * 10;
    this.frameStamp = 0;
    this.isPaused = false;
    (document.querySelector("#pause") as HTMLElement).textContent = "Pause";
    cancelAnimationFrame(this.animationId);
  }

  play() {
    this.reset();
    this.currentTetromino = this.getCurrentTetromino();
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
      this.renderer.showMessage("PAUSED");
      this.timer.pause();
    }

    this.isPaused = !this.isPaused;
  }

  handleGroundHit() {
    const rowsDestroyed = this.board.landTetromino(this.currentTetromino);
    this.incrementLevel(rowsDestroyed);
    this.incrementPoints(rowsDestroyed);
    this.currentTetromino = this.getCurrentTetromino();
  }

  isGameOver() {
    return this.board.matrix[0].some((cell) => !!cell);
  }

  endGame() {
    cancelAnimationFrame(this.animationId);
    this.timer.pause();
    this.currentTetromino = null;
    document.querySelector('#start').textContent = "Restart";
    this.renderer.showMessage("GAME OVER");
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


    /**
     * We have to check for collisions every time
     * screen is updated in order to remove rows
     * and drop new pieces immediately if needed.
     */
    if (!this.board.canCollide(
      this.currentTetromino.matrix,
      this.currentTetromino.row + 1,
      this.currentTetromino.column
    )) {

      this.frameStamp = (this.frameStamp + 1) % this.speed;
      if (this.frameStamp % this.speed === 0) {
        this.currentTetromino.moveDown();
      }
    } else {
      this.handleGroundHit();
    }

    if (this.isGameOver()) {
      return this.endGame();
    }

    this.renderer.draw(this.board.matrix);
    this.renderer.render(this.currentTetromino);
    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
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
    this.controllers = new Controllers(this.board);
    this.timer = new Timer();
    this.nextPiece = new NextPiece();

    const startButton: HTMLElement = document.querySelector("#start");
    startButton.addEventListener('click', (e) => {
      startButton.textContent = "Restart";
      startButton.blur();
      this.play();
    });

    document.querySelector('#pause').addEventListener('click', (e) => {
      (e.target as HTMLElement).blur();
      this.pause();
    });
  }
}

export { Game };

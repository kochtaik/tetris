import "./style.scss";
import { Game } from "./game";

const game = new Game();
game.init();

// function drawFigure(fig) {
//   const shape = fig.shape;
//   let y = fig.row;

//   for (let rowIdx = 0; rowIdx < shape.length; rowIdx += 1) {
//     let x = fig.col;
//     const row = shape[rowIdx];

//     for (let colIdx = 0; colIdx < row.length; colIdx += 1) {
//       const value = row[colIdx];
//       if (value) {
//         ctx.fillStyle = fig.color;
//         ctx.strokeRect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
//         ctx.fillRect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
//       }
//       x += 1;
//     }

//     y += 1;
//   }
// }

// let timestamp = 0;

// const lastCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
// const randomFig = getRandomFigure();

// function tick(now) {
//   const secondsPassed = Math.floor(now / 1000);
//   if (secondsPassed !== timestamp) {
//     timestamp = secondsPassed;
//     randomFig.row += 1;
//     ctx.putImageData(lastCanvasState, 0, 0);
//     drawFigure(randomFig);
//   }

//   requestAnimationFrame(tick);
// }

// tick();

// const randomFig = getRandomFigure();
// randomFig.row = 0;
// drawFigure(randomFig);

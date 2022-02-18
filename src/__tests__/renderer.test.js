import Renderer from "../Renderer";
import Matrix from "../Matrix";

describe('Renderer', () => {
  const renderer = new Renderer();

  test('canvas and its context are set correctly', () => {   
    const canvasElement = document.createElement('canvas');
    renderer.setCanvas(canvasElement);

    expect(renderer.canvas).toBe(canvasElement);
    expect(renderer.context).not.toBeNull();
  });

  test('matrix gets rendered on canvas', () => {
    const matrix = new Matrix(20, 10);
    matrix.create();
    renderer.draw(matrix.matrix);
    const events = renderer.context.__getEvents();

    expect(events).toMatchSnapshot();
  });

  test('"game over" message is displayed', () => {
    renderer.showGameOver();
    const events = renderer.context.__getEvents();

    expect(events).toMatchSnapshot();
  });
});
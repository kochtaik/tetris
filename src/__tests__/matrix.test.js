import Matrix from "../Matrix";

describe('Matrix', () => {
  let matrix;

  beforeEach(() => {
    matrix = new Matrix(20, 10);
    matrix.create();
  })

  test('checks that "createMatrix" is a function', () => {
    expect(typeof matrix.create).toBe("function");
  })
  
  test('checks that matrix has 20 rows and 10 columns', () => {
    expect(matrix.matrix).toHaveLength(20);
    expect(matrix.matrix[0]).toHaveLength(10);
  })
  
  test('checks that matrix has two "negative" additional rows', () => {
      expect(matrix.matrix).toHaveProperty("-1");
      expect(matrix.matrix).toHaveProperty("-2");
  });
});
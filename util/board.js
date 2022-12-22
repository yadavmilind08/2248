export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const nearestPowerOfTwo = (num) => {
  // dealing only with non-negative numbers
  if (num < 0) {
    num *= -1;
  }
  let base = 1;
  while (base < num) {
    if (num - base < Math.floor(base / 2)) {
      return base;
    }
    base *= 2;
  }
  return base;
};

export const generateRandom = (board) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      board[row][col] = nearestPowerOfTwo(randomInteger(2, 8));
    }
  }

  return board;
};

export const colors = {
  2: "orange",
  4: "rgb(39, 207, 207)",
  8: "pink",
  16: "gold",
  32: "greenyellow",
  64: "#e9c46a",
  128: "goldenrod",
  256: "rebeccapurple",
  512: "cyan",
  1024: "gold",
  2048: "aquamarine",
};

export const ranges = [
  { row: 0, col: 0, x1: 50, x2: 100, y1: 50, y2: 100 },
  { row: 0, col: 1, x1: 150, x2: 200, y1: 50, y2: 100 },
  { row: 0, col: 2, x1: 250, x2: 300, y1: 50, y2: 100 },
  { row: 0, col: 3, x1: 350, x2: 400, y1: 50, y2: 100 },

  { row: 1, col: 0, x1: 50, x2: 100, y1: 150, y2: 200 },
  { row: 1, col: 1, x1: 150, x2: 200, y1: 150, y2: 200 },
  { row: 1, col: 2, x1: 250, x2: 300, y1: 150, y2: 200 },
  { row: 1, col: 3, x1: 350, x2: 400, y1: 150, y2: 200 },

  { row: 2, col: 0, x1: 50, x2: 100, y1: 250, y2: 300 },
  { row: 2, col: 1, x1: 150, x2: 200, y1: 250, y2: 300 },
  { row: 2, col: 2, x1: 250, x2: 300, y1: 250, y2: 300 },
  { row: 2, col: 3, x1: 350, x2: 400, y1: 250, y2: 300 },

  { row: 3, col: 0, x1: 50, x2: 100, y1: 350, y2: 400 },
  { row: 3, col: 1, x1: 150, x2: 200, y1: 350, y2: 400 },
  { row: 3, col: 2, x1: 250, x2: 300, y1: 350, y2: 400 },
  { row: 3, col: 3, x1: 350, x2: 400, y1: 350, y2: 400 },

  { row: 4, col: 0, x1: 50, x2: 100, y1: 450, y2: 500 },
  { row: 4, col: 1, x1: 150, x2: 200, y1: 450, y2: 500 },
  { row: 4, col: 2, x1: 250, x2: 300, y1: 450, y2: 500 },
  { row: 4, col: 3, x1: 350, x2: 400, y1: 450, y2: 500 },

  { row: 5, col: 0, x1: 50, x2: 100, y1: 550, y2: 600 },
  { row: 5, col: 1, x1: 150, x2: 200, y1: 550, y2: 600 },
  { row: 5, col: 2, x1: 250, x2: 300, y1: 550, y2: 600 },
  { row: 5, col: 3, x1: 350, x2: 400, y1: 550, y2: 600 },
];

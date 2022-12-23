export const getEmptyBoard = () => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export const getRandomNumber = () => {
  return Math.pow(2, Math.floor(Math.random() * 3 + 1));
};

export const getNearestPowerOfTwo = (num) => {
  return Math.pow(2, Math.floor(Math.log(num) / Math.log(2)));
};

export const generateRandomBoard = (board) => {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      board[row][col] = getRandomNumber();
    }
  }

  return board;
};

export const colors = {
  2: "#ffa500",
  4: "#27cfcf",
  8: "#ffc0cb",
  16: "#ffd700",
  32: "#adff2f",
  64: "#e9c46a",
  128: "#daa520",
  256: "#663399",
  512: "#00ffff",
  1024: "#6a5ab0",
  2048: "#7fffd4",
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

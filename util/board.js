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

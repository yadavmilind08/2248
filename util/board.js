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

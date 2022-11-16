import { Coords, GameState, Player, Winner } from '../model/game.types';

export const initialGameState: GameState = {
  board: new Array(9).fill(null),
  turn: 'x'
};

export const detectWinner = (board: (Player | null)[]): Winner | undefined => {
  const possibleWinningLineIndices = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const winningLine = possibleWinningLineIndices.find((line) => {
    return board[line[0]] != null &&
      board[line[0]] === board[line[1]] &&
      board[line[1]] === board[line[2]];
  });

  if (!winningLine) {
    return undefined;
  }

  return {
    winningLine,
    player: board[winningLine[0]]!,
  };
};

export const coordsToCellIndex = (coords: Coords): number => {
  return coords.row * 3 + coords.column;
}
export type Player = 'x' | 'o';

export interface GameState {
  board: (Player | null)[];
  turn: Player;
  winner?: Winner;
}

export interface Winner {
  player: Player;
  winningLine: number[];
}

export interface Coords {
  row: number;
  column: number;
}
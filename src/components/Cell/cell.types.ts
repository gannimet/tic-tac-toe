import { Player } from '../../model/game.types';

export interface CellProps {
  cellClicked: () => void;
  state: Player | null;
  isWinner: boolean;
}
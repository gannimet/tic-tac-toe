import React from 'react';
import { CellProps } from './cell.types';
import './cell.scss';

const Cell = React.memo<CellProps>(
  ({ state, cellClicked, isWinner }) => {
    const cellContent = state ? state.toUpperCase() : '';

    return (
      <div
        className={`board__cell ${isWinner ? 'board__cell--winner' : ''}`}
        onClick={() => cellClicked()}
      >{cellContent}</div>
    );
  },
);

Cell.displayName = 'Cell';

export default Cell;

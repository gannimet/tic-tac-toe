import React, { useState } from 'react';
import Cell from '../Cell/cell';
import './board.scss';
import { GameState } from '../../model/game.types';
import { initialGameState, coordsToCellIndex, detectWinner } from '../../util/game.utils';

const Board = React.memo(
  () => {
    const [gameState, setGameState] = useState<GameState>(initialGameState);

    const handleCellClick = (cellIndex: number) => {
      if (gameState.winner) {
        // Game is already over
        return;
      }

      const board = [...gameState.board];

      if (!!board[cellIndex]) {
        // Cell is already taken
        return;
      }

      board[cellIndex] = gameState.turn;

      const winner = detectWinner(board);

      setGameState({
        board,
        winner,
        turn: gameState.turn === 'o' ? 'x' : 'o',
      });
    };

    const handleRestartClick = () => {
      setGameState(initialGameState);
    };

    const renderCell = (row: number, column: number) => {
      const cellIndex = coordsToCellIndex({ row, column });
      const cellState = gameState.board[cellIndex]
      const { winner } = gameState;

      return (
        <Cell
          key={row + '-' + column}
          state={cellState}
          cellClicked={() => handleCellClick(cellIndex)}
          isWinner={!!winner && winner.winningLine.indexOf(cellIndex) > -1}
        />
      )
    };

    const renderGameInfo = () => {
      const { turn, winner } = gameState;

      return (
        <div className='game-info'>
          {!winner && <span className='game-info__turn'>It's {turn.toUpperCase()}'s turn</span>}
          {winner && <span className='game-info__winner'>Player {winner.player.toUpperCase()} won!</span>}
        </div>
      );
    };

    const renderRestartButton = () => {
      return (
        <div className='restart'>
          <button className='restart-button' onClick={handleRestartClick}>Restart game</button>
        </div>
      );
    };
    
    return (
      <div className='board-container'>
        <div className='board'>
          {[0, 1, 2].map((row) => {
            return [0, 1, 2].map((column) => {
              return renderCell(row, column);
            });
          })}
        </div>

        {renderGameInfo()}
        {renderRestartButton()}
      </div>
    );
  },
);

Board.displayName = 'Board';

export default Board;

// src/components/GameControls.js
import React from 'react';
import { useGame } from '../context/GameContext';

export default function GameControls() {
  const { dispatch } = useGame();

  const startNewGame = () => {
    if (window.confirm('Are you sure you want to start a new game?')) {
      dispatch({ type: 'NEW_GAME' });
    }
  };

  const undoLastScore = () => {
    dispatch({ type: 'UNDO_LAST_SCORE' });
  };

  return (
    <div>
      <button onClick={startNewGame}>New Game</button>
      <button onClick={undoLastScore}>Undo Last Score</button>
    </div>
  );
}

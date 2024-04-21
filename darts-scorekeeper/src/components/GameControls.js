// src/components/GameControls.js

import React from 'react';
import { useGame } from '../context/GameContext';

export default function GameControls() {
  const { dispatch } = useGame();

  // Function to handle starting a new game
  const startNewGame = () => {
    if (window.confirm('Are you sure you want to start a new game? All current progress will be lost.')) {
      dispatch({ type: 'NEW_GAME' });
    }
  };

  // Function to handle undoing the last score
  const undoLastScore = () => {
    dispatch({ type: 'UNDO_LAST_SCORE' });
  };

  return (
    <div className="game-controls">
      <button onClick={startNewGame}>New Game</button>
      <button onClick={undoLastScore}>Undo Last Score</button>
    </div>
  );
}

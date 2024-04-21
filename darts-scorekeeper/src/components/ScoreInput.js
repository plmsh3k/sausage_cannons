// src/components/ScoreInput.js
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (score) {
      dispatch({
        type: 'UPDATE_SCORE',
        payload: { playerName: currentPlayer, score: parseInt(score, 10) }
      });
      setScore('');
    }
  };

  if (state.players.length === 0 || state.currentTurn === null) {
    // Don't show score input if no players have been added or the game hasn't started.
    return null;
  }

  return (
    <form onSubmit={handleScoreSubmit}>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Enter player score"
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}

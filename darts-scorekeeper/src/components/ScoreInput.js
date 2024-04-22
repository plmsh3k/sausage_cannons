// src/components/ScoreInput.js

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    // Convert input to an integer and ensure it's a valid score.
    const scoreInt = parseInt(score, 10);
    
    // Check if the score is a number and positive
    if (!isNaN(scoreInt) && scoreInt > 0) {
      dispatch({
        type: 'UPDATE_SCORE',
        payload: { playerName: currentPlayer, score: scoreInt }
      });
      setScore(''); // Reset the score input after submission
    } else {
      // Provide feedback for invalid input
      alert('Please enter a valid score.');
    }
  };

  // Render form only if the game has started, there are players, and it's someone's turn
  if (!state.gameStarted || state.players.length === 0 || state.currentTurn === null) {
    return null;
  }

  return (
    <form onSubmit={handleScoreSubmit}>
      <label htmlFor="scoreInput">{`Enter ${currentPlayer}'s score:`}</label>
      <input
        id="scoreInput"
        type="number"
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Score"
        min="1" // Enforce positive numbers only
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}

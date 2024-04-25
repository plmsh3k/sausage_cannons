// src/components/ScoreInput.js

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];
  const currentPlayerScore = state.scores[currentPlayer];

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    const scoreInt = parseInt(score, 10);
  
    if (isNaN(scoreInt) || scoreInt < 0) {
      alert('Please enter a valid positive number for the score.');
      return;
    }
    
    if (scoreInt > 180) {
      alert('The maximum score in a single round is 180.');
      return;
    }
  
    const potentialNewScore = currentPlayerScore - scoreInt;
  
    if (potentialNewScore === 1) {
      alert('Score cannot be reduced to 1 as the last dart must be a double.');
      return;
    }
  
    // Check if the score is being finished and if the final throw is a double
    if (potentialNewScore === 0 && !isDouble(scoreInt)) {
      alert('The final dart must land in a double.');
      return;
    }
  
    // Proceed with updating the score
    dispatch({
      type: 'UPDATE_SCORE',
      payload: { playerName: currentPlayer, score: scoreInt }
    });
    setScore(''); // Reset the score input after submission
  };
  
  // Helper function to determine if the score is a double
  function isDouble(score) {
    return score <= 40 && score % 2 === 0 || score === 50;
  }
  

  // Render form only if the game has started, there are players, and it's someone's turn!? //
  if (!state.gameStarted || state.players.length === 0 || state.currentTurn === null) {
    return null;
  }

  return (
    <form onSubmit={handleScoreSubmit}>
      <label htmlFor="scoreInput">{`Enter ${currentPlayer}'s score: `}</label>
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

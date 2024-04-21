// src/components/ScoreInput.js

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];
  
  const handleScoreSubmit = (e) => {
    e.preventDefault();
    const scoreInt = parseInt(score, 10);
    
    // Ensure score is a positive number and not more than the starting score
    if (!isNaN(scoreInt) && scoreInt > 0 && scoreInt <= state.startingScore) {
      dispatch({
        type: 'UPDATE_SCORE',
        payload: { playerName: currentPlayer, score: scoreInt }
      });
      setScore(''); // Reset the score input after submission
    } else {
      alert('Please enter a valid score that is positive and does not exceed the starting score.');
    }
  };

  if (!state.gameStarted || state.players.length === 0 || state.currentTurn === null) {
    return null; // Do not display the form if the game hasn't started or there are no players
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
      />
      <button type="submit">Submit Score</button>
    </form>
  );
}

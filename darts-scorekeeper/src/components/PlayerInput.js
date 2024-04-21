// ScoreInput.js
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const { currentTurn, players } = state;

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'UPDATE_SCORE', 
      payload: { player: players[currentTurn], score: parseInt(score, 10) }
    });
    setScore('');
    // Rotate to next player's turn
    dispatch({
      type: 'NEXT_TURN'
    });
  };

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

// ScoreInput.js
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function ScoreInput() {
  const [score, setScore] = useState('');
  const { state, dispatch } = useGame();
  const currentPlayer = state.players[state.currentTurn];

  const submitScore = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_SCORE',
      payload: { player: currentPlayer, score: parseInt(score, 10) }
    });
    setScore(''); // Clear the input after submission
  };

  // Only show score input if players exist
  if (state.players.length > 0) {
    return (
      <form onSubmit={submitScore}>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
          required
        />
        <button type="submit">Submit Score</button>
      </form>
    );
  } else {
    return null; // Render nothing if no players are added
  }
}

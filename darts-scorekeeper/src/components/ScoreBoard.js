import React from 'react';
import { useGame } from '../context/GameContext';

export default function Scoreboard() {
  const { state } = useGame();

  return (
    <div>
      <h2>Scoreboard</h2>
      // Modified part of Scoreboard.js
        {state.players.map((player, index) => (
        <div key={player} className={index === state.currentTurn ? 'currentTurn' : ''}>
            <h3>{player} {index === state.currentTurn && '(Your Turn)'}</h3>
            <p>Scores: {state.scores[player].join(", ")}</p>
        </div>
        ))}
    </div>
  );
}

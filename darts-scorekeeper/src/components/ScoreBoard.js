// Scoreboard.js
import React from 'react';
import { useGame } from '../context/GameContext';

export default function Scoreboard() {
    const { state } = useGame();
    const { players, scores, currentTurn } = state;
  
    return (
      <div>
        <h2>Scoreboard</h2>
        {players.map((player, index) => (
          <div key={player} className={index === currentTurn ? 'currentTurn' : ''}>
            <h3>{player} {index === currentTurn && '(Your Turn)'}</h3>
            <p>Remaining: {501 - scores[player].reduce((acc, score) => acc + score, 0)}</p>
            <p>Scores: {scores[player].join(', ')}</p>
          </div>
        ))}
      </div>
    );
  }

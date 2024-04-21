// Scoreboard.js
import React from 'react';
import { useGame } from '../context/GameContext';

export default function Scoreboard() {
    const { state } = useGame();
    const { players, scores, currentTurn } = state;
  
    return (
      <div>
        {players.map((player, index) => {
        const totalScore = scores[player].reduce((acc, round) => acc + round, 0);
        const remaining = 501 - totalScore; // Assuming starting score is 501

        return (
            <div key={player} className={index === currentTurn ? 'currentTurn' : ''}>
            <h3>{player} {index === currentTurn && '(Your Turn)'}</h3>
            <p>Remaining: {remaining}</p>
            <p>Scores: {scores[player].join(', ')}</p>
            </div>
        );
        })}
      </div>
    );
  }

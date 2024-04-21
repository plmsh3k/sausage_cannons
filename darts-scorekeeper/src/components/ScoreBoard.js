// src/components/Scoreboard.js
import React from 'react';
import { useGame } from '../context/GameContext';

const Scoreboard = () => {
  const { state: { players, scores } } = useGame();

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      {players.map((player) => (
        <div key={player} className="player-score">
          <span className="player-name">{player}</span>
          <span className="player-points">Points left: {scores[player]}</span>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;

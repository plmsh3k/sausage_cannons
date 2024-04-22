// src/components/Scoreboard.js
import React from 'react';
import { useGame } from '../context/GameContext';
import dartboardImage from '../images/darts1.jpeg'; // Adjust the path as necessary


const Scoreboard = () => {
  const { state: { players, scores } } = useGame();

  return (
    <div className="scoreboard">
      <img src={dartboardImage} alt="Dartboard" className="header-image" />
      <h2>Scoreboard</h2>
      {players.map((player) => (
        <div key={player} className="player-score">
          <span className="player-name">{player}: </span>
          <span className="player-points">Points left: {scores[player]}</span>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;

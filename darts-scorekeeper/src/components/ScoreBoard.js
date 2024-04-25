// src/components/Scoreboard.js
import React from 'react';
import { useGame } from '../context/GameContext';
import Legs from './Legs';


const Scoreboard = () => {
  const { state: { players, scores, currentLeg, totalLegs } } = useGame();

  return (
    <div className="scoreboard">
      <img src={'/darts1.jpeg'} alt="Dartboard" className="header-image" />
      <h2>Scoreboard</h2>
      <Legs currentLeg={currentLeg} totalLegs={totalLegs} />
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

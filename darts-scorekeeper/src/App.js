import React from 'react';
import { GameProvider } from './context/GameContext';
import PlayerInput from './components/PlayerInput';
import Scoreboard from './components/ScoreBoard';
import GameControls from './components/GameControls';

function App() {
  return (
    <GameProvider>
      <div>
        <h1>Darts Scorekeeper</h1>
        <PlayerInput />
        <Scoreboard />
        <GameControls />
      </div>
    </GameProvider>
  );
}

export default App;

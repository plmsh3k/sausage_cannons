// src/App.js
import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import SetupForm from './components/SetupForm';
import Scoreboard from './components/ScoreBoard';
import ScoreInput from './components/ScoreInput';
import GameControls from './components/GameControls';

const App = () => {
  const { state, dispatch } = useGame();

  const handleStartGame = (gameType, players) => {
    dispatch({ type: 'SET_GAME_TYPE', payload: gameType });
    players.forEach((player) => dispatch({ type: 'ADD_PLAYER', payload: player }));
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="App">
      {!state.gameStarted ? (
        <SetupForm startGame={handleStartGame} />
      ) : (
        <>
          <Scoreboard />
          <ScoreInput />
          <GameControls />
        </>
      )}
    </div>
  );
};

export default () => (
  <GameProvider>
    <App />
  </GameProvider>
);

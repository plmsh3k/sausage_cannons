// src/App.js
import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import SetupForm from './components/SetupForm';
import Scoreboard from './components/ScoreBoard';
import ScoreInput from './components/ScoreInput';
import GameControls from './components/GameControls';
import Header from './components/Header';

const App = () => {
  const { state, dispatch } = useGame();

  const handleStartGame = (gameType, players, legs) => {
    dispatch({ type: 'SET_GAME_TYPE', payload: gameType });
    players.forEach((player) => dispatch({ type: 'ADD_PLAYER', payload: player }));
    dispatch({ type: 'SET_LEGS', payload: legs });
    dispatch({ type: 'START_GAME' });
  };

  return (
    <div className="app-container">
      {!state.gameStarted ? (
        <SetupForm startGame={handleStartGame} />
      ) : (
        <>
          <Scoreboard />
          <ScoreInput />
          <GameControls />
        </>
      )}
      <Header
        text="Darts Gaming "
        logoSrc="/logo.png"
        altText="Logo"
      />
    </div>
  );
};

export default () => (
  <GameProvider>
    <App />
  </GameProvider>
);

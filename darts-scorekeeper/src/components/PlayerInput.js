// src/components/PlayerInput.js

import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function PlayerInput() {
  const [playerName, setPlayerName] = useState('');
  const { dispatch } = useGame();

  const addPlayer = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      dispatch({ type: 'ADD_PLAYER', payload: playerName.trim() });
      setPlayerName('');  // Clear the input field after adding the player
    } else {
      alert('Player name cannot be empty');
    }
  };

  return (
    <form onSubmit={addPlayer} className="player-input-form">
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
        className="player-input"
      />
      <button type="submit" className="add-player-button">Add Player</button>
    </form>
  );
}

// PlayerInput.js
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export default function PlayerInput() {
  const [playerName, setPlayerName] = useState('');
  const { dispatch } = useGame();

  const addPlayer = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      dispatch({ type: 'ADD_PLAYER', payload: playerName.trim() });
      setPlayerName('');
    }
  };

  return (
    <form onSubmit={addPlayer}>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter player name"
      />
      <button type="submit">Add Player</button>
    </form>
  );
}

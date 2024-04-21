// src/components/SetupForm.js

import React, { useState } from 'react';

function SetupForm({ startGame }) {
  const [gameType, setGameType] = useState('301'); // Default game type
  const [players, setPlayers] = useState(['']); // Start with one empty player

  // Handles the addition of a new player input field
  const addPlayerInput = () => {
    setPlayers([...players, '']); // Add another empty string to the players array
  };

  // Updates the specific player's name based on the input field's index
  const handlePlayerNameChange = (index, newName) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = newName;
    setPlayers(updatedPlayers);
  };

  // When the form is submitted, call the startGame function passed from the App component
  const handleSubmit = (event) => {
    event.preventDefault();
    startGame(gameType, players.filter(name => name.trim() !== '')); // Filter out empty names
  };

  return (
    <div className="setup-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gameType">Select game type:</label>
          <select
            id="gameType"
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
          >
            <option value="301">301</option>
            <option value="501">501</option>
          </select>
        </div>

        <div className="player-inputs">
          {players.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(e) => handlePlayerNameChange(index, e.target.value)}
              placeholder={`Player ${index + 1} name`}
            />
          ))}
        </div>
        
        <button type="button" onClick={addPlayerInput}>Add Player</button>
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default SetupForm;

import React, { useState } from 'react';

export function Darts() {
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [gameMode, setGameMode] = useState('301'); 

  function startGame() { 
    const startingScore = gameMode === '301' ? 301 : 501;
    setPlayers(players.map(player => ({ ...player, score: startingScore })));
  }

  function throwDart() {
    let dartScore = parseInt(prompt("Enter the dart score:"));

    while (dartScore > 180 || dartScore < 0) { 
      alert("Invalid score. Please enter a score between 0 and 180.");
      dartScore = parseInt(prompt("Enter the dart score:"));
    }
     
    const newPlayers = [...players]; 
    newPlayers[currentPlayer].score -= dartScore;

    if (newPlayers[currentPlayer].score < 0) {
      newPlayers[currentPlayer].score += dartScore;
    }

    setPlayers(newPlayers);
    setCurrentPlayer(currentPlayer === players.length - 1 ? 0 : currentPlayer + 1);
  }

  function addPlayer() {
    if (newPlayerName) {
      setPlayers([...players, { name: newPlayerName, score: 301 }]); // Default to 301 initially
      setNewPlayerName(''); 
    }
  }

  return (
    <div>
      <h1>Darts</h1> 
      <select value={gameMode} onChange={e => setGameMode(e.target.value)}>
        <option value="301">301</option>
        <option value="501">501</option>
      </select>
      <button onClick={startGame}>Start Game</button>

      {players.map((player, index) => (
        <p key={index}>
          {player.name} score: {player.score}
        </p>
      ))}
      <p>Current player: {currentPlayer >= players.length ? "None" : players[currentPlayer].name}</p>
      {players.some(player => player.score === 0) && (
        <p>Winner: {players.find(player => player.score === 0).name}</p>
      )}
      <button onClick={throwDart}>Throw dart</button>

      <br/>
      <input 
        type="text" 
        value={newPlayerName} 
        onChange={e => setNewPlayerName(e.target.value)} 
        placeholder="Enter player name" 
      />
      <button onClick={addPlayer}>Add Player</button>
    </div>
  );
}


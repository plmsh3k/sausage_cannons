import React, { useState } from 'react';

export function Darts301() {
  const [scores, setScores] = useState([301, 301]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  function throwDart() {
    const dartScore = parseInt(prompt("Enter the dart score:")); // User input for dart score
    const newScores = [...scores];
    newScores[currentPlayer] -= dartScore;

    if (newScores[currentPlayer] < 0) {
      newScores[currentPlayer] += dartScore; // If score goes below 0, the throw is not valid
    }

    setScores(newScores);
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0); // Switch player
  }

  return (
    <div>
      <h1>Darts 301</h1>
      <p>Player 1 score: {scores[0]}</p>
      <p>Player 2 score: {scores[1]}</p>
      <p>Current player: {currentPlayer + 1}</p>
      {scores[0] === 0 && <p>Player 1 wins!</p>}
      {scores[1] === 0 && <p>Player 2 wins!</p>}
      <button onClick={throwDart}>Throw dart</button>
    </div>
  );
}
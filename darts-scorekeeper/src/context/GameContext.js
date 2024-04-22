// src/context/GameContext.js

import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  gameStarted: false,
  players: [], // No players initially
  currentTurn: 0,
  startingScore: 301,
  scores: {}, // No scores initially
  scoreHistory: [] // No history initially
};


const ActionTypes = {
  SET_GAME_TYPE: 'SET_GAME_TYPE',
  ADD_PLAYER: 'ADD_PLAYER',
  START_GAME: 'START_GAME',
  UPDATE_SCORE: 'UPDATE_SCORE',
  UNDO_LAST_SCORE: 'UNDO_LAST_SCORE',
  NEW_GAME: 'NEW_GAME',
};

function gameReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_GAME_TYPE:
  const startingScore = parseInt(action.payload, 10); // Parse as integer to ensure it's a number
  return {
    ...state,
    startingScore,
    scores: state.players.reduce((acc, player) => {
      acc[player] = startingScore; // Set as a numeric value
      return acc;
    }, {}),
  };

  case ActionTypes.ADD_PLAYER:
    return {
      ...state,
      players: [...state.players, action.payload],
      scores: {
        ...state.scores,
        [action.payload]: state.startingScore // Make sure this is a number
      },
    };
  

    case ActionTypes.START_GAME:
      if (state.players.length < 1) {
        alert('You must add at least one player to start the game.');
        return state;
      }
      return {
        ...state,
        gameStarted: true,
        currentTurn: 0,
      };

      case ActionTypes.UPDATE_SCORE:
        const { playerName, score } = action.payload;
        // Get the current score from the state.
        const currentScore = state.scores[playerName];
        const currentPlayer = state.players[state.currentTurn];
        // Calculate what the new score would be.
        const newScore = currentScore - score;
      
        // Check for a valid new score.
        if (newScore < 0 || (newScore === 1 && state.gameType === '01')) {
          // If new score is below zero or equal to 1 in '01 games (which is not allowed),
          // it's a "bust," so the score should not change, and it's the next player's turn.
          alert('Bust! Score cannot go below zero or end on 1.');
          return {
            ...state,
            currentTurn: (state.currentTurn + 1) % state.players.length,
            // Optionally handle score history here for undoing a "bust" turn.
          };
        } else if (newScore === 0) {
          // Handle winning condition
          alert(`${currentPlayer} wins!`); // or use a modal/dialogue box for a more polished UI
      
          // Use `window.confirm` to ask the user if they want to start a new game
          if (window.confirm('Game over. Do you want to start a new game?')) {
            // Reset the game state to initial state
            return {
              ...initialState,
              players: [], // Clear players if you want to start fresh
              scores: {}, // Clear scores
            };
          } else {
            // If the user does not want to start a new game, you can set a flag or navigate away
            return {
              ...state,
              isGameOver: true, // You can use this flag to block new scores being submitted
            };
          }
        } else {
          // If new score is valid, update the score and proceed to the next player's turn.
          return {
            ...state,
            scores: {
              ...state.scores,
              [playerName]: newScore,
            },
            currentTurn: (state.currentTurn + 1) % state.players.length,
            // Update score history for undo functionality.
            scoreHistory: [...state.scoreHistory, { playerName, score }],
          };
        }

    case ActionTypes.UNDO_LAST_SCORE:
      const history = [...state.scoreHistory];
      const lastTurn = history.pop();
      if (lastTurn) {
        return {
          ...state,
          scores: {
            ...state.scores,
            [lastTurn.player]: state.scores[lastTurn.player] + lastTurn.score,
          },
          currentTurn: state.players.indexOf(lastTurn.player),
          scoreHistory: history,
        };
      }
      return state;

    case ActionTypes.NEW_GAME:
      // Reset to a completely new game state
      return {
          ...initialState,  // Ensure that initialState is a clean slate
          // If you want to keep the player names for the new game, do not reset 'players' and 'scores'.
          // If you want to start fresh with no players (as per your issue), you can reset these as well:
        players: [],
        scores: {},
        scoreHistory: []
      };
    }}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);

export default GameContext;

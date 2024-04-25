// src/context/GameContext.js

import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  gameStarted: false,
  players: [], // No players at start
  currentTurn: 0,
  startingScore: 301,
  scores: {}, // No scores at the start
  scoreHistory: [], // No history at start
  legs: 1, // Initialize legs to 1
  currentLeg: 1, // Initialize currentLeg to 1
};


const ActionTypes = {
  SET_GAME_TYPE: 'SET_GAME_TYPE',
  ADD_PLAYER: 'ADD_PLAYER',
  START_GAME: 'START_GAME',
  UPDATE_SCORE: 'UPDATE_SCORE',
  UNDO_LAST_SCORE: 'UNDO_LAST_SCORE',
  NEW_GAME: 'NEW_GAME',
  SET_LEGS: 'SET_LEGS',
};

function gameReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_GAME_TYPE:
      const startingScore = parseInt(action.payload, 10);
      return {
        ...state,
        startingScore,
        scores: state.players.reduce((acc, player) => {
          acc[player] = startingScore;
          return acc;
        }, {}),
      };

    case ActionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.payload],
        scores: {
          ...state.scores,
          [action.payload]: state.startingScore,
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
          alert('Bust! Score cannot go below zero or end on 1.');
          return {
            ...state,
            currentTurn: (state.currentTurn + 1) % state.players.length,
          };
        } else if (newScore === 0) {
          // Handle winning condition
          alert(`${currentPlayer} wins!`);

          // JUNNU EDIT >>> Here should be a part for the legs before window.confirm comes?


          
      
          // Use `window.confirm` to ask the user if they want to start a new game
          if (window.confirm('Game over. Do you want to start a new game?')) {
            // Reset the game state to initial state
            return {
              ...initialState,
              players: [],
              scores: {},
            };
          } else {
            return {
              ...state,
              isGameOver: true, // Block new scores being submitted //
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
      const lastTurn = history.pop(); // Remove and retrieve the last turn //
    
      if (lastTurn) {
        const { playerName, score } = lastTurn;
        // Revert the score
        const revertedScores = {
          ...state.scores,
          [playerName]: state.scores[playerName] + score,
        };
        
        // Set the current turn to the player whose turn was undone //
        const currentPlayerIndex = state.players.indexOf(playerName);
        
        return {
          ...state,
          scores: revertedScores,
          currentTurn: currentPlayerIndex,
          scoreHistory: history,
        };
      } else {
        // No history to undo or some other error handling //
        alert('No more actions to undo.'); 
        return state;
      }

    case ActionTypes.NEW_GAME:
      // Reset to a completely new game state
      return {
        ...initialState,
        players: [],
        scores: {},
        scoreHistory: []
      };

    case ActionTypes.SET_LEGS:
      return {
        ...state,
        legs: action.payload,
        currentLeg: 1, // Reset currentLeg to 1 when legs are set
      };

    default:
      return state;
  }
}

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

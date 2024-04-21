// src/context/GameContext.js

import React, { createContext, useContext, useReducer } from 'react';

const GameContext = createContext();

const initialState = {
  gameStarted: false,
  players: [],
  currentTurn: 0,
  startingScore: 301, // Default to 301 game
  scores: {},
  scoreHistory: [], // To keep track of each turn to allow undo
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
      if (state.players.includes(action.payload)) {
        alert('Player names must be unique.');
        return state;
      }
      return {
        ...state,
        players: [...state.players, action.payload],
        scores: {
          ...state.scores,
          [action.payload]: state.startingScore
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
      const updatedScores = { ...state.scores };
      const currentPlayer = state.players[state.currentTurn];
      const scoreSubtraction = updatedScores[currentPlayer] - action.payload;
      
      // Prevent negative scores or scores that cannot win the game (e.g., left with 1 point)
      if (scoreSubtraction < 0 || scoreSubtraction === 1) {
        alert('Bust! Score cannot go below zero or end on 1.');
        return {
          ...state,
          currentTurn: (state.currentTurn + 1) % state.players.length,
        };
      }

      updatedScores[currentPlayer] = scoreSubtraction;
      
      // Track score history for undo functionality
      const newHistory = [...state.scoreHistory, { player: currentPlayer, score: action.payload }];

      return {
        ...state,
        scores: updatedScores,
        scoreHistory: newHistory,
        currentTurn: (state.currentTurn + 1) % state.players.length,
      };

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
      return {
        ...initialState,
        players: state.players,
        startingScore: state.startingScore,
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

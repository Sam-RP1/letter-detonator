// Store difficulties and modifiers and multipliers

// Difficulties:
// Easy, Normal, Hard, Insane
// Cadet, Soldier, Veteran, Elite, Legendary
// Rookie, Novice, Expert, Master, Grandmaster
// Apprentice, Journeyman, Artisan, Master, Grandmaster
// Beginner, Intermediate, Advanced, Expert, Master
// Trainee, Recruit, Soldier, Veteran, Elite
// Novice, Adept, Expert, Master, Grandmaster
// Cosmonaut,

// First Flight, Cruising Altitude, Perilous Expedition, One way journey
// Lift Off, Cruising Altitude, Perilous Encounters, One way journey

// First Flight, Orbital Patrol, Perilous Expedition, One way journey

// Different ships could have different perks or abilities
// Gotta unlock ships
// Ship selection or customisation screen

// Modifiers:
// - No shop
// - I'm broke (no money)
// -

// Main Menu:
// Launch (Play)
// Load
// Leaderboards
// Logbook
// Codex
// Profile (Account)
// Stats
// Settings

// Pause Menu:
// Resume
// Restart
// Save
// Settings
// Quit

import React, { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    status: "loading",
    canvas: {},
    difficulty: {},
    score: 0,
  });

  // Context value
  const value = { gameState, setGameState };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Custom hook for easy context consumption
export const useGameContext = () => useContext(GameContext);

// Game-wide configuration
export const GAME_CONFIG = {
  // Travel settings
  travel: {
    defaultDistance: 5,
    defaultSpeed: 1,
  },

  // Ship settings
  ship: {
    defaultCargoSize: 100,
  },

  // Starting conditions
  starting: {
    playerCredits: 100,
    shipName: "Base Ship",
  },
} as const;

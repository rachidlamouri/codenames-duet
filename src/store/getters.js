export const getters = {
  turnsTaken: (state) => {
    const successfulTurns = state.players.reduce(
      (turnsTaken, player) => turnsTaken + player.successfulTurnCount,
      0,
    );

    const failedTurns = state.cards.reduce(
      (turnsTaken, card) => {
        const player0TurnsTaken = card.isBystander[0] ? 1 : 0;
        const player1TurnsTaken = card.isBystander[1] ? 1 : 0;

        return turnsTaken + player0TurnsTaken + player1TurnsTaken;
      },
      0,
    );

    return successfulTurns + failedTurns;
  },
};

export const getters = {
  turnsTaken: (state) => {
    const successfulTurns = state.players.reduce(
      (turnsTaken, player) => turnsTaken + player.successfulTurnCount,
      0,
    );

    const failedTurns = state.cards.reduce(
      (turnsTaken, card) => (
        turnsTaken
        + (card.status[0] === 'bystander' ? 1 : 0)
        + (card.status[1] === 'bystander' ? 1 : 0)
      ),
      0,
    );

    return successfulTurns + failedTurns;
  },
};

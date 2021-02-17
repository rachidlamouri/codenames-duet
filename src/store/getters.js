export const getters = {
  turnsTaken: (state) => {
    const successfulTurns = state.players.reduce(
      (turnsTaken, player) => turnsTaken + player.successfulTurnCount,
      0,
    );

    const failedTurns = state.cards.reduce(
      (turnsTaken, card) => (
        turnsTaken
        + (['bystander', 'assassin'].includes(card.status[0]) ? 1 : 0)
        + (['bystander', 'assassin'].includes(card.status[1]) ? 1 : 0)
      ),
      0,
    );

    return successfulTurns + failedTurns;
  },
};

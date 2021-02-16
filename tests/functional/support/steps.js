const { defineStep } = require('@cucumber/cucumber');

const usedWords = [];

defineStep('there are 25 cards', async function () {
  const cards = await this.model.cards();
  expect(cards).to.have.lengthOf(25);
});
defineStep('I refresh the page', async function () {
  await this.page.reload();
});

defineStep('I see 25 unique random words', async function () {
  const cards = await this.model.cards();
  const words = await Promise.mapSeries(cards, (card) => card.word());
  expect(words).to.have.lengthOf(25);

  words.forEach((word) => {
    expect(word, `"${word}"`).to.be.jsonSchema({
      type: 'string',
      minLength: 1,
      pattern: '^[A-Z][A-Z ]*[A-Z]$',
    });
  });

  // any set is a superset of the empty set
  if (usedWords.length > 0) {
    expect(words, 'words are not unique').to.not.include.members(usedWords);
  }
  usedWords.push(...words);

  await Promise.each(
    cards,
    async (card) => {
      const topHalf = await card.topHalf();
      const bottomHalf = await card.bottomHalf();

      expect(await topHalf.word()).to.equal(await bottomHalf.word());
    },
  );
});

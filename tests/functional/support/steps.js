const { defineStep } = require('@cucumber/cucumber');

const usedWords = [];

defineStep('I wait for {int} ms', async function (duration) {
  await this.page.waitForTimeout(duration);
});

defineStep('there are 25 cards', async function () {
  const cards = await this.model.cards();
  expect(cards).to.have.lengthOf(25);
});

defineStep('there are 2 reset buttons', async function () {
  await this.model.topResetButton();
  await this.model.bottomResetButton();
});

defineStep('I refresh the page', async function () {
  await this.page.reload();
});

defineStep('I press the {string} reset button', async function (label) {
  let resetButton;

  switch (label) {
    case 'top':
      resetButton = await this.model.topResetButton();
      break;
    case 'bottom':
      resetButton = await this.model.bottomResetButton();
      break;
    default: throw Error(`unexpected "${label}"`);
  }

  await resetButton.element.click();
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

defineStep('I see the same 25 words', async function () {
  const last25Words = usedWords.slice(usedWords.length - 25, usedWords.length);
  const cards = await this.model.cards();
  const words = await Promise.mapSeries(cards, (card) => card.word());
  expect(words).to.eql(last25Words);
});

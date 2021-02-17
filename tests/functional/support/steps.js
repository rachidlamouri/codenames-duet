const _ = require('lodash');
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

defineStep('there are {int} side counters', async function (count) {
  const sideCounters = await this.model.sideCounters();
  expect(sideCounters).to.have.lengthOf(count);
});

defineStep('there are {int} error side counters', async function (count) {
  const errorSideCounters = await this.model.errorSideCounters();
  expect(errorSideCounters).to.have.lengthOf(count);
});

defineStep('I see the player {int} "add counter" button', async function (playerId) {
  const playerBoard = await this.model.playerBoard(playerId);
  await playerBoard.addCounterButton();
});

defineStep(/^player (\d+) takes (\d+) successful turns\s*$/, async function (playerId, turnCount) {
  const playerBoard = await this.model.playerBoard(playerId);
  const addCounterButton = await playerBoard.addCounterButton();
  await Promise.each(
    _.range(turnCount),
    async () => {
      await addCounterButton.element.click();
    },
  );
});

defineStep(/^player (\d+) takes (\d+) (bystander|failed) turns on cards (.*)$/, async function (playerId, turnCount, turnType, indicesClause) {
  const cards = await this.model.cards();
  const cardIndicesText = indicesClause.replace(/on cards /, '');
  const selectedCards = cardIndicesText.split(', ')
    .map((textIndex) => parseInt(textIndex, 10))
    .map((cardIndex) => cards[cardIndex]);

  expect(selectedCards.length, 'cardIndices length should match turn count').to.equal(turnCount);

  await Promise.each(
    selectedCards,
    async (card) => {
      const cardHalf = await card.playerHalf(playerId);
      await cardHalf.element.click();

      let colorButton;
      switch (turnType) {
        case 'bystander':
          colorButton = await cardHalf.bystanderButton();
          break;
        case 'failed':
          colorButton = await cardHalf.assassinButton();
          break;
        default: throw Error(`Unknown turnType "${turnType}"`);
      }
      await colorButton.element.click();
    },
  );
});

defineStep(/^player (\d+) has (\d+) (successful|bystander|failed) turn counters$/, async function (playerId, turnCount, turnType) {
  const cards = await this.model.cards();

  let turnCounters;
  switch (turnType) {
    case 'successful': {
      const playerBoard = await this.model.playerBoard(playerId);
      turnCounters = await playerBoard.successfulTurnCounters();
      break;
    }
    case 'bystander':
      turnCounters = await Promise.filter(
        cards,
        async (card) => {
          const cardHalf = await card.playerHalf(playerId);
          const type = await cardHalf.type();
          return type === 'bystander';
        },
      );
      break;
    case 'failed':
      turnCounters = await Promise.filter(
        cards,
        async (card) => {
          const cardHalf = await card.playerHalf(playerId);
          const type = await cardHalf.type();
          return type === 'assassin';
        },
      );
      break;
    default: throw Error(`Unknown turnType "${turnType}"`);
  }

  expect(turnCounters).to.have.lengthOf(turnCount);
});

defineStep(/^player (\d+) removes 1 successful turn counter\s*$/, async function (playerId) {
  const playerBoard = await this.model.playerBoard(playerId);
  const turnCounters = await playerBoard.successfulTurnCounters();
  await _.sample(turnCounters).element.click();
});

defineStep(/^player (\d+) removes 1 (bystander|failed) turn counter on card (\d+)$/, async function (playerId, turnType, cardId) {
  const cards = await this.model.cards();
  const card = cards[cardId];

  const cardHalf = await card.playerHalf(playerId);
  await cardHalf.element.click();
  const cardResetButton = await cardHalf.resetButton();
  await cardResetButton.element.click();
});

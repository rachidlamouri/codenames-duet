const { Element } = require('./element');

class Word {
  static async get(parentHandle) {
    return parentHandle.$eval('.word', (element) => element.textContent.trim());
  }
}

class CardHalf extends Element {
  word() {
    return Word.get(this.element);
  }

  type() {
    return this.element.getProperty('className')
      .then((handle) => handle.jsonValue())
      .then((value) => value.split(' '))
      .then((classes) => {
        if (classes.includes('agent')) {
          return 'agent';
        }

        if (classes.includes('bystander')) {
          return 'bystander';
        }

        if (classes.includes('assassin')) {
          return 'assassin';
        }

        return 'none';
      });
  }

  async agentButton() {
    return new Element(await this.element.$('.agent'));
  }

  async bystanderButton() {
    return new Element(await this.element.$('.bystander'));
  }

  async assassinButton() {
    return new Element(await this.element.$('.assassin'));
  }

  async resetButton() {
    return new Element(await this.element.$('.reset'));
  }
}

class Card extends Element {
  static async getAll(page) {
    const handles = await page.$$('.card');
    return handles.map((handle) => new Card(handle));
  }

  async topHalf() {
    return new CardHalf(await this.element.$('.card-half.top'));
  }

  async bottomHalf() {
    return new CardHalf(await this.element.$('.card-half.bottom'));
  }

  playerHalf(playerId) {
    switch (playerId) {
      case 0: return this.bottomHalf();
      case 1: return this.topHalf();
      default: throw Error(`Unknown playerId ${playerId}`);
    }
  }

  word() {
    return Word.get(this.element);
  }
}

module.exports = {
  Card,
};

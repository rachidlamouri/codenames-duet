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

  word() {
    return Word.get(this.element);
  }
}

module.exports = {
  Card,
};

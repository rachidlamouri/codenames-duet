const { Element } = require('./element');

class ResetButton extends Element {
  static async top(page) {
    return new ResetButton(await page.$('.reset-button.top'));
  }

  static async bottom(page) {
    return new ResetButton(await page.$('.reset-button.bottom'));
  }
}

module.exports = { ResetButton };

const { Card } = require('./card');
const { ResetButton } = require('./resetButton');

module.exports.Model = class {
  constructor(page) {
    this.page = page;
  }

  async cards() {
    return Card.getAll(this.page);
  }

  async topResetButton() {
    return ResetButton.top(this.page);
  }

  async bottomResetButton() {
    return ResetButton.bottom(this.page);
  }
};

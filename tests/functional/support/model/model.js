const { Card } = require('./card');

module.exports.Model = class {
  constructor(page) {
    this.page = page;
  }

  async cards() {
    return Card.getAll(this.page);
  }
};

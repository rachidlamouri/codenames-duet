const { Element } = require('./element');

class SideCounter extends Element {
  static async getAll(page) {
    const handles = await page.$$('#side-board .turn-counter');
    return handles.map((handle) => new SideCounter(handle));
  }

  static async getAllError(page) {
    const handles = await page.$$('#side-board .turn-counter.error');
    return handles.map((handle) => new SideCounter(handle));
  }
}

module.exports = { SideCounter };

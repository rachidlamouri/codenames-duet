module.exports.Element = class {
  constructor(elementHandle) {
    if (elementHandle === null) {
      throw Error('elementHandle is null');
    }

    this.element = elementHandle;
  }

  async click() {
    await this.element.click();
  }
};

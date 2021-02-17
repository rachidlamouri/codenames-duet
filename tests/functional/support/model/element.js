module.exports.Element = class {
  constructor(elementHandle) {
    if (elementHandle === null) {
      throw Error('elementHandle is null');
    }

    if (elementHandle instanceof global.nativePromise) {
      throw Error('elementHandle is Promise');
    }

    this.element = elementHandle;
  }
};

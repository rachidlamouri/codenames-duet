global.nativePromise = Promise;
const fs = require('fs');
global.Promise = require('bluebird');
global.expect = require('chai')
  .use(require('chai-json-schema-ajv'))
  .expect;
const puppeteer = require('puppeteer');
const {
  BeforeAll,
  AfterAll,
  Before,
  After,
  AfterStep,
  Status,
} = require('@cucumber/cucumber');
const { Model } = require('./model/model');

const REPORTS_DIR = 'reports/';
if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR);
}

BeforeAll(async function () {
  global.browser = await puppeteer.launch();
});

Before(async function () {
  this.page = await browser.newPage();
  this.model = new Model(this.page);
  await this.page.setViewport({
    width: 1920,
    height: 1080,
  });
  await this.page.goto('http://localhost:8080');
});

AfterStep(async function ({ pickle, result }) {
  if (result.status === Status.FAILED) {
    const filepath = `${REPORTS_DIR}${pickle.name}.png`.replace(/ /g, '_');
    await this.page.screenshot({ path: filepath });
    console.log(`Error screenshot: ./${filepath}`); // eslint-disable-line no-console
  }
});

After(async function () {
  await this.page.close();
  return new Promise((resolve) => setTimeout(resolve, 2000));
});

AfterAll(async function () {
  await browser.close();
});

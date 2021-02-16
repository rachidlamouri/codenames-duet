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
} = require('@cucumber/cucumber');
const { Model } = require('./model/model');

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

After(async function () {
  await this.page.close();
  return new Promise((resolve) => setTimeout(resolve, 2000));
});

AfterAll(async function () {
  await browser.close();
});

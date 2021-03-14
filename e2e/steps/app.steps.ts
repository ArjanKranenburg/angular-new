const { Given, When, Then } = require('@cucumber/cucumber');
const { browser } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const searchFormPO = require('../page-objects/search-form.po');

Given('I navigate to {string}', { timeout: 60 * 1000 }, async (host: string) => {
    await browser.get('http://' + host + ':4401/');
    await browser.sleep(2000);
});

When('I search for Luke Skywalkers name', { timeout: 60 * 1000 }, async () => {
    await searchFormPO.input.sendKeys('Luke Skywalker');
    await searchFormPO.searchBtn.click();
    await browser.sleep(2000);
});

Then('I see Lukes details', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchFormPO.firstCharacterName.getAttribute('innerText'))
        .to.eventually.contain('Skywalker');
});

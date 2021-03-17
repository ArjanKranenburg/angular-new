const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const { browser } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const expect = chai.expect;

import { SearchFormPage } from '../page-objects/search-form.po';

let searchPage: SearchFormPage;

BeforeAll(async function() {
    searchPage = new SearchFormPage();
});

Given('I open the Star Wars Search web application', { timeout: 60 * 1000 }, async function() {
    await searchPage.navigateTo();
});


When('I search with an empty search-box', { timeout: 60 * 1000 }, async () => {
    await searchPage.searchForCharacter('');
    await browser.sleep(2000);
});

Then('a(n) {string} message is shown', { timeout: 60 * 1000 }, async function(message:string) {
    await expect(searchPage.errorMessage).to.eventually.be.equal(message);
});

Then('the details are removed', { timeout: 60 * 1000 }, async function() {
    await expect(searchPage.characters).to.eventually.be.empty;
    await expect(searchPage.planets).to.eventually.be.empty;
});

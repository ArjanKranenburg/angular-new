const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const { browser, protractor } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

import { SearchFormPage } from '../page-objects/search-form.po';

let searchPage: SearchFormPage;

BeforeAll(async function(){
    searchPage = new SearchFormPage();
});

Given('I open the Star Wars Search web application', { timeout: 60 * 1000 }, async () => {
    await searchPage.navigateTo();
});

When('I search for an item and hit enter', { timeout: 60 * 1000 }, async () => {
    await searchPage.characterRadioBtn.click();
    await searchPage.inputField.sendKeys('Solo');
    await searchPage.inputField.sendKeys(protractor.Key.ENTER);
});

Then('a {string} message is shown', { timeout: 60 * 1000 }, async (message:string) => {
    await chai.expect(searchPage.errorMessage).to.eventually.be.equal(message);
});

Then('the details are also shown', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchPage.characters).to.eventually.have.lengthOf.at.least(1);
});

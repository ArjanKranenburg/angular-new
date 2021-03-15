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

Given('I search for an item', { timeout: 60 * 1000 }, async () => {
    await searchPage.searchForCharacter('Solo');
    
    await browser.sleep(2000);
});

When('I search for an item and hit enter', { timeout: 60 * 1000 }, async () => {
    await searchPage.characterRadioBtn.click();
    await searchPage.inputField.sendKeys('Chewbacca');
    await searchPage.inputField.sendKeys(protractor.Key.ENTER);

    await browser.sleep(2000);
});

When('I search with an empty search-box', { timeout: 60 * 1000 }, async () => {
    await searchPage.searchForCharacter('');
    await browser.sleep(2000);
});

Then('a {string} message is shown', { timeout: 60 * 1000 }, async (message:string) => {
    await chai.expect(searchPage.errorMessage).to.eventually.be.equal(message);
});

Then('the details are removed', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchPage.characters).to.eventually.be.empty;
    await chai.expect(searchPage.planets).to.eventually.be.empty;
});

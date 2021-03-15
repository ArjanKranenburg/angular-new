const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const { browser, protractor } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

import { SearchFormPage } from '../page-objects/search-form.po';

let searchPage: SearchFormPage;

BeforeAll(async function(){
    searchPage = new SearchFormPage();
});

When('I search for character {string}', { timeout: 60 * 1000 }, async (name: string) => {
    await searchPage.searchForCharacter(name);
    
    await browser.sleep(2000);
});

Then('I see its Gender, Birth year, Eye color, and Skin color', { timeout: 60 * 1000 }, async () => {
 
    await chai.expect(searchPage.firstCharacterGender).to.eventually.be.a('string');
    await chai.expect(searchPage.firstCharacterBirthYear).to.eventually.be.a('string');
    await chai.expect(searchPage.firstCharacterEyeColor).to.eventually.be.a('string');    
    await chai.expect(searchPage.firstCharacterSkinColor).to.eventually.be.a('string');
});

Then('I see {int} characters', { timeout: 60 * 1000 }, async (numberOfCharacters:number) => {
    await chai.expect(searchPage.characters).to.eventually.have.length(numberOfCharacters);
});

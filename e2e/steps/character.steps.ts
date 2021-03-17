const { Given, When, Then, BeforeAll  } = require('@cucumber/cucumber');
const { browser } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const expect = chai.expect;

import { SearchFormPage } from '../page-objects/search-form.po';
import { DataTable } from '@cucumber/cucumber';

let searchPage: SearchFormPage;

BeforeAll(async function(){
    searchPage = new SearchFormPage();
});

When('I search for character {string}', { timeout: 60 * 1000 }, async function (name: string) {
    await searchPage.searchForCharacter(name);
    
    await browser.sleep(2000);
});

Then('I see these personal details', { timeout: 60 * 1000 }, async function(expectedCharacters:DataTable) {
    await expect(searchPage.characters).to.eventually.have.length(expectedCharacters.rows().length);

    var expectedCharacterHashes = expectedCharacters.hashes();
    for (var i = 0; i < expectedCharacterHashes.length; i++) {
        var expectedCharacterHash = expectedCharacterHashes[i];

        await expect(searchPage.characterName(i)).to.eventually.be.equal(expectedCharacterHash['name']);
        await expect(searchPage.characterGender(i)).to.eventually.be.equal(expectedCharacterHash['gender']);
        await expect(searchPage.characterBirthYear(i)).to.eventually.be.equal(expectedCharacterHash['birth year']);
        await expect(searchPage.characterEyeColor(i)).to.eventually.be.equal(expectedCharacterHash['eye color']);
        await expect(searchPage.characterSkinColor(i)).to.eventually.be.equal(expectedCharacterHash['skin color']);
    }
});

Then('the details for {int} character(s) is/are shown', { timeout: 60 * 1000 }, async function(numberOfCharacters:number) {
    await expect(searchPage.characters).to.eventually.have.length(numberOfCharacters);
});

const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const { browser, protractor } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const expect = chai.expect;

import { SearchFormPage } from '../page-objects/search-form.po';
import { DataTable } from '@cucumber/cucumber';

let searchPage: SearchFormPage;

BeforeAll(async function(){
    searchPage = new SearchFormPage();
});

When('I search for planet {string}', { timeout: 60 * 1000 }, async (name: string) => {
    await searchPage.searchForPlanet(name);
    
    await browser.sleep(2000);
});

When('I search for planet {string} and hit enter', { timeout: 60 * 1000 }, async (name: string) => {
    await searchPage.planetRadioBtn.click();
    await searchPage.inputField.sendKeys(name);
    await searchPage.inputField.sendKeys(protractor.Key.ENTER);

    await browser.sleep(2000);
});

When('I leave the search-box filled and use it to search for a planet', { timeout: 60 * 1000 }, async () => {
    await searchPage.planetRadioBtn.click();
    await searchPage.searchBtn.click();  
    await browser.sleep(2000);
});

Then('I see this/these planet details', { timeout: 60 * 1000 }, async function(expectedPlanets:DataTable) {
    await expect(searchPage.planets).to.eventually.have.length(expectedPlanets.rows().length);

    var expectedPlanetHashes = expectedPlanets.hashes();
    for (var i = 0; i < expectedPlanetHashes.length; i++) {
        var expectedPlanetHash = expectedPlanetHashes[i];

        await expect(searchPage.planetName(i)).to.eventually.be.equal(expectedPlanetHash['name']);
        await expect(searchPage.planetPopulation(i)).to.eventually.be.equal(expectedPlanetHash['population']);
        await expect(searchPage.planetClimate(i)).to.eventually.be.equal(expectedPlanetHash['climate']);
        await expect(searchPage.planetGravity(i)).to.eventually.be.equal(expectedPlanetHash['gravity']);
    }
});

Then('the details for {int} planet(s) is/are shown', { timeout: 60 * 1000 }, async (numberOfPlanets:number) => {
    await expect(searchPage.planets).to.eventually.have.length(numberOfPlanets);
});


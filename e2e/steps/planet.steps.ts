const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
const { browser, protractor } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

import { SearchFormPage } from '../page-objects/search-form.po';

let searchPage: SearchFormPage;

BeforeAll(async function(){
    searchPage = new SearchFormPage();
});

When('I search for planet {string}', { timeout: 60 * 1000 }, async (name: string) => {
    await searchPage.searchForPlanet(name);
    
    await browser.sleep(2000);
});
  
Then('I see its Population, Climate and Gravity', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchPage.firstPlanetPopulation).to.eventually.be.a('string');
    await chai.expect(searchPage.firstPlanetClimate).to.eventually.be.a('string');
    await chai.expect(searchPage.firstPlanetGravity).to.eventually.be.a('string');    
});

Then('I see {int} planets', { timeout: 60 * 1000 }, async (numberOfPlanets:number) => {
    await chai.expect(searchPage.planets).to.eventually.have.length(numberOfPlanets);
});

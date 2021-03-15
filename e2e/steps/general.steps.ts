const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber');
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

Then('a {string} message is shown', { timeout: 60 * 1000 }, async (message:string) => {
    await chai.expect(searchPage.errorMessage).to.eventually.be.equal(message);
});

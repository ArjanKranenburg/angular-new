const { Given, When, Then } = require('@cucumber/cucumber');
const { browser, by } = require('protractor');
const chai = require('chai');
chai.use(require('chai-as-promised'));

const searchFormPO = require('../page-objects/search-form.po');


Given('I open the Star Wars Search web application', { timeout: 60 * 1000 }, async () => {
    await browser.get('http://localhost:4401/');
    await browser.sleep(2000);
});

When('I search for character {string}', { timeout: 60 * 1000 }, async (name: string) => {
    await searchFormPO.characterRadioBtn.click();
    await searchFormPO.input.sendKeys(name);
    await searchFormPO.searchBtn.click();
    await browser.sleep(2000);
});

Then('I see its Gender, Birth year, Eye color, and Skin color', { timeout: 60 * 1000 }, async () => {
    await chai.expect(searchFormPO.firstCharacterGender.getAttribute('innerText'))
        .to.eventually.be.a('string');
    await chai.expect(searchFormPO.firstCharacterBirthYear.getAttribute('innerText'))
        .to.eventually.be.a('string');
    await chai.expect(searchFormPO.firstCharacterEyeColor.getAttribute('innerText'))
        .to.eventually.be.a('string');    
    await chai.expect(searchFormPO.firstCharacterSkinColor.getAttribute('innerText'))
        .to.eventually.be.a('string');
});

import { browser, by, element, ElementFinder } from 'protractor';

export class SearchFormPage {
    async navigateTo(): Promise<unknown> {
        return browser.get('http://localhost:4401/');
    }

    async searchForCharacter( searchText: string) {
        this.characterRadioBtn.click();
        this.inputField.clear()
        this.inputField.sendKeys(searchText);
        this.searchBtn.click();  
    }

    async searchForPlanet( searchText: string) {
        this.planetRadioBtn.click();
        this.inputField.clear()
        this.inputField.sendKeys(searchText);
        this.searchBtn.click();  
    }

    // Page fields
    get searchBtn() {
        return element(by.css('button'));
    }
    get inputField() {
        return element(by.id('query'));
    }
    get characterRadioBtn() {
        return element(by.id('people'));
    }
    get planetRadioBtn() {
        return element(by.id('planets'));
    }

    // Characters
    get characters() {
      return element.all(by.css('app-character'));
    }

    character(index:number) {
        return this.characters.get(index);
    }

    characterName(index:number) {
        return this.character(index).element(by.css('h6')).getAttribute('innerText');
    }

    characterGender(index:number) {
        return this.getDetailValue(this.getDetailItem(this.characters.get(index), 0));
    }

    characterBirthYear(index:number) {
       return this.getDetailValue(this.getDetailItem(this.characters.get(index), 1));
    }

    characterEyeColor(index:number) {
        return this.getDetailValue(this.getDetailItem(this.characters.get(index), 2));
    }

    characterSkinColor(index:number) {
        return this.getDetailValue(this.getDetailItem(this.characters.get(index), 3));
    }


    // Planets
    get planets() {
      return element.all(by.css('app-planet'));
    }

    planet(index:number) {
        return this.planets.get(index);
    }

    planetName(index:number) {
        return this.planet(index).element(by.css('h6')).getAttribute('innerText');
    }

    planetPopulation(index:number) {
        return this.getDetailValue(this.getDetailItem(this.planet(index), 0));
    }

    planetClimate(index:number) {
      return this.getDetailValue(this.getDetailItem(this.planet(index), 1));
    }

    planetGravity(index:number) {
      return this.getDetailValue(this.getDetailItem(this.planet(index), 2));
    }


    // General
    getDetailItem(resultElement:ElementFinder, detailItemNr:number) {
      return resultElement.all(by.css('div.row')).get(detailItemNr);
    }

    getDetailValue(detailItemElement:ElementFinder) {
      return detailItemElement
        .element(by.css('div:nth-child(2)'))
        .getAttribute('innerText');
    }

    get errorMessage() {
      return element.all(by.css('div.col > div')).first().getAttribute('innerText');
    }
}

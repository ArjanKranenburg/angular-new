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

  get firstCharacter() {
      return this.characters.first();
  }

  get firstCharacterGender() {
      return this.getDetailValue(this.getDetailItem(this.firstCharacter, 0));
  }
  get firstCharacterBirthYear() {
    return this.getDetailValue(this.getDetailItem(this.firstCharacter, 1));
  }
  get firstCharacterEyeColor() {
    return this.getDetailValue(this.getDetailItem(this.firstCharacter, 2));
  }
  get firstCharacterSkinColor() {
    return this.getDetailValue(this.getDetailItem(this.firstCharacter, 3));
  }

  // Planets
  get planets() {
    return element.all(by.css('app-planet'));
  }

  get firstPlanet() {
    return this.planets.first();
  }

  get firstPlanetPopulation() {
      return this.getDetailValue(this.getDetailItem(this.firstPlanet, 0));
  }
  get firstPlanetClimate() {
    return this.getDetailValue(this.getDetailItem(this.firstPlanet, 1));
  }
  get firstPlanetGravity() {
    return this.getDetailValue(this.getDetailItem(this.firstPlanet, 2));
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

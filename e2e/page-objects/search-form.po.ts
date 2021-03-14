import { browser, by, element, ElementFinder } from 'protractor';

export class SearchFormPage {
  async navigateTo(): Promise<unknown> {
      return browser.get('http://localhost:4401/');
  }

  async searchForCharacter( searchText: string) {
      this.characterRadioBtn.click();
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

  get characters() {
    return element.all(by.css('app-character'));
  }

  get firstCharacter() {
      return this.characters.first();
  }

  getCharacterDetailItem(characterElement:ElementFinder, detailItemNr:number) {
      return characterElement.all(by.css('div.row')).get(detailItemNr);
  }

  getDetailValue(characterDetailItemElement:ElementFinder) {
    return characterDetailItemElement
      .element(by.css('div:nth-child(2)'))
      .getAttribute('innerText');
  }

  get firstCharacterGender() {
      return this.getDetailValue(this.getCharacterDetailItem(this.firstCharacter, 0));
  }
  get firstCharacterBirthYear() {
    return this.getDetailValue(this.getCharacterDetailItem(this.firstCharacter, 1));
  }
  get firstCharacterEyeColor() {
    return this.getDetailValue(this.getCharacterDetailItem(this.firstCharacter, 2));
  }
  get firstCharacterSkinColor() {
    return this.getDetailValue(this.getCharacterDetailItem(this.firstCharacter, 3));
  }

  get errorMessage() {
    return element.all(by.css('div.col > div')).first().getAttribute('innerText');
  }
}

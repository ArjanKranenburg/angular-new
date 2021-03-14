import { element, by } from 'protractor';
// import { CharacterDetails } from './character-details.po';

module.exports = {
    get input() {
        return element(by.id('query'));
    },
    get searchBtn() {
        return element(by.css('button'));
    },
    get characterRadioBtn() {
        return element(by.id('people'));
    },
    get planetRadioBtn() {
        return element(by.id('planets'));
    },
    get firstCharacterName() {
        return element(by.css('app-character h6'));
    },

    get firstCharacter() {
        return element.all(by.css('app-character')).first();
    },
    get firstCharacterGender() {
        return this.firstCharacter
            .all(by.css('div.row')).first()
            .element(by.css('div:nth-child(2)'));
     },
    get firstCharacterBirthYear() {
        return this.firstCharacter
            .all(by.css('div.row')).get(1)
            .element(by.css('div:nth-child(2)'));
    },
    get firstCharacterEyeColor() {
        return this.firstCharacter
            .all(by.css('div.row')).get(2)
            .element(by.css('div:nth-child(2)'));
    },
    get firstCharacterSkinColor() {
        return this.firstCharacter
            .all(by.css('div.row')).get(3)
            .element(by.css('div:nth-child(2)'));
    }
   
};

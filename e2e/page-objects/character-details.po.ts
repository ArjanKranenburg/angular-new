import { by, element } from 'protractor';

export class CharacterDetails {

    getCharacterDetails() {
      return element(by.css('app-character'));
    }

    gender() {
        return element(by.css('app-character h6'));
    }

    birthYear() {
        return element(by.css('app-character h6'));
    }

    eyeColor() {
        return element(by.css('app-character h6'));
    }
    
    skinColor() {
        return element(by.css('app-character h6'));
    }

}

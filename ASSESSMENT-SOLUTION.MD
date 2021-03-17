# QA Engineer Assessment Solution

## Introduction

Use this file to document your solution and findings.

Name: Arjan Kranenburg

## Remarks 
### Findings:
- Bug: Search with empty search-box does not clear the previous results
- 33 vulnerabilities (22 low, 4 moderate, 7 high)
- Old versions are used. Apart from the vulnerabilities, it's an update you have to do someday. Better to keep it up-to-date than wait for the big-bang.
- Unit tests are missing
- Advice: Finding the "Not found."-message is very hard and susceptible to break tests when the application changes
- ReadMe.md line 47: 'search by' is duplicated


### Other issues
I could not get the tests to start:
[12:53:24] E/launcher - spawn Unknown system error -86

I suspect that there is a difference in versions of my system. Perhaps MacOS (I have Big Sur) or Chrome itself.
I choose to start the application on port 4401 and test from a new angular project (this project). The versions of all dev-dependencies are therefor newer than in the original project.

# First exploration
> node -v
v15.11.0

> npm install node@10.24.0 --save-exact
33 vulnerabilities (22 low, 4 moderate, 7 high)
--> Hmmm

> ng serve
--> starts OK, seems to work at very first sight - OK

> ng test
Executed 0 of 0 SUCCESS
--> Unit tests are missing

> ng e2e
/configParser - pattern ./e2e/features/*/*.feature did not match any files.
Error: Spec patterns did not match any files.

# Fixing e2e tests

## Spec patterns did not match any files
Changed protractor.conf.js:
  specs: [
    './e2e/features/**/*.feature'
  ],

New error:
[12:53:24] E/launcher - spawn Unknown system error -86
From: Task: WebDriver.createSession()


## Workaround for spawn Unknown system error -86
Workaround by starting the application on port 4401:
> ng serve --port 4401

Then setting up a new project, with the latest versions of node (~11.2.5), angular (), protractor (), and cucumber ().
Copied the e2e directory there (adjusted some difference due to newer versions) and:
1 scenario (1 passed)
3 steps (3 passed)
0m04.936s (executing steps: 0m04.918s)

# Assessment
## Rewritten existing scenario
### Rewritten the Given step to:
"Given I open the Star Wars Search web application"
- It is not usefull to include server locations in the feature file. That would limit the execution to only localhost
- For now, I've put it in the steps file, but even better would be to put it in a configuration, which is parsed at runtime with a run-profile or something like that

### Rewritten the When step to:
"When I search for character 'Luke Skywalker'"
- This is better english, so reads better
- I've made the name an input string, so that the step can be reused for other characters
- Added this line to the step to make sure we are searching for characters and not planets:
    await searchFormPO.characterRadioBtn.click();

And added these radioButtons to the PageObject:
    get characterRadioBtn() {
        return element(by.Id('people'));
    },
    get planetRadioBtn() {
        return element(by.Id('planets'));
    },

### Rewritten the Then step to:
"Then I see its Gender, Birth year, Eye color, and Skin color"
- So that it is clear which details are shown
- I've added these checks to the step definition as well:
    await chai.expect(searchFormPO.firstCharacterGender.getAttribute('innerText'))
        .to.eventually.be.a('string');
    await chai.expect(searchFormPO.firstCharacterBirthYear.getAttribute('innerText'))
        .to.eventually.be.a('string');
    await chai.expect(searchFormPO.firstCharacterEyeColor.getAttribute('innerText'))
        .to.eventually.be.a('string');    
    await chai.expect(searchFormPO.firstCharacterSkinColor.getAttribute('innerText'))
        .to.eventually.be.a('string');

And added these to the PageObject:
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

- Note for now I just check that the field is present, but not that the field is correct.
  I will add that later (see refactoring).

### Rewritten page-object
- The search-form.po.ts now contains a class 'SearchFormPage'
- The '.getAttribute('innerText')' in the then-steps is moved to the page-object
- Also browser.get('http://localhost:4401/') is moved to the page-object
- The sleep in the Given step is removed. It is not needed.

Notes:
- The page-object could be split into new page-objects named 'search-form', 'character-details' and 'planet-details'
- the 2nd sleep in the when-step could be replaced by a ExpectedCondition. The sleep makes the test slow, but while developing also easier to follow.

I'll continue with the tests first (for now).

## More tests for search characters
### Search for unknown character
(Note: I mean Star Wars characters here, not ASCII characters)
- Added this scenario:
    Scenario: Search for unknown character results in "Not found"
        Given I open the Star Wars Search web application
        When I search for character 'Spock'
        Then a 'Not found.' message is shown

- Added this step:
    Then('a(n) {string} message is shown', { timeout: 60 * 1000 }, async (message:string) => {
        await chai.expect(searchPage.errorMessage).to.eventually.be.equal(message);
    });

- Added this field to the page-object:
    get errorMessage() {
        return element.all(by.css('div.col > div')).first().getAttribute('innerText');
    }

Note: Finding the "Not found."-message is very hard and susceptible to break when the application changes. I would ask the developers if is possible to add an id or class to the HTML element.

### Search for part of a name
- Added this scenario:
    Scenario: Search by part of a name
        Given I open the Star Wars Search web application
        When I search for character 'darth'
        Then I see 2 characters

- Added this step:
    Then('I see {int} characters', { timeout: 60 * 1000 }, async (numberOfCharacters:number) => {
        await chai.expect(searchPage.characters).to.eventually.have.length(numberOfCharacters);
    });

- Added this field to the page-object:
    get characters() {
        return element.all(by.css('app-character'));
    }

## Search for Planets
### Created a search-planet.feature
Copied it from search-character.feature and replaced character with planet.
Of course also details are changed for planets
app.steps.ts is extended for planet-steps
search-form.po.ts is extended for planets

### Split the steps-file in 3:
general.steps.ts
character.steps.ts
planet.steps.ts

### Test for using <enter> in stead of the search button
Choice to make a seperate .feature file for the additional flow scenario's or add these scenario's in one or both feature files.
Since it is essentially 1 search field, I create a search-star-wars.feature

I added this scenario:
    Scenario: Search for an item with <enter>
        Given I open the Star Wars Search web application
        When I search for an item and hit enter
        Then the details are also shown


### Test for search with empty search-box to clear previous results
I added this scenario:
    Scenario: Search with emty search-box will clear previous results
        Given I open the Star Wars Search web application
        And I search for an item
        And the details are also shown
        When I search with an empty search-box
        Then the details are removed

- my first PageObject had this function:
  async searchForCharacter( searchText: string) {
      this.characterRadioBtn.click();
      this.inputField.sendKeys(searchText);
      this.searchBtn.click();  
  }
(and a similar searchForPlanet(...))
This scenario showed that the sendKeys only adds keys to the keys already present in the search-box, so I put this before:
     this.inputField.clear()
 
The previous search results are not removed in this scenario. Also not when doing this manual. This is a deviation from the specs (aka bug).

### Test for switch from character to planet and vice-versa
I added this scenario to search-star-wars.feature:
    Scenario: Switch from character to planet will clear previous results and show "Not found"
        Given I open the Star Wars Search web application
        And I search for character 'Leia'
        And the details are also shown
        When I leave the search-box and use it to search for a planet
        Then the details are removed
        And a 'Not found.' message is shown

A scenario for the reverse is not needed. In stead I added scenario's to do a search after a search for both characters and planets:
    Scenario: A new search for characters will clear the previous results
        And I search for character 'Skywalker'
        And the details are also shown
        When I search for character 'Anakin Skywalker'
        Then I see 1 character


### Test for partial matches
Already done before

### Refatoring
- Use of table in character/planet, like this
        Then I see these personal details
            | name           | gender | birth year | eye color  | skin color |
            | Luke Skywalker | male   | 19BBY      | blue       | fair       |

Then refactored the page-object to return the i-th result-item and then give the respective detail-item.
It allows for these kind of checks:
        await expect(searchPage.planetPopulation(i)).to.eventually.be.equal(expectedPlanetHash['population']);

- Added optional characters and alternative words where needed in the step name, like this:
Then('the details for {int} planet(s) is/are shown', ...

- const expect = chai.expect; -> replaced 'chai.expect' with 'expect'


# Adding unit tests
Adding unit tests is outside the scope of this assignment
However, it should be part of a good project. So I would discuss with the developers how to proceed in order to add unit-tests.


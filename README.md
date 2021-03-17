# FedEx Frontend QA - Javascript Test Assessment


# App specs

Note: this app is the default angular app. The original Star Wars Search web application should be run on port 4401 (ng serve --port 4401).
Then the end-to-end tests can be run from this project (ng e2e)


So, what you should expect when using the Star Wars Search web application are the following:

## Main features

### Search for character (person)
*	When you search for **a character** and it’s a valid one, then you should be able to see his / her “Gender”, “Birth year”, “Eye color” and “Skin color”.
*	When you search for a character and it’s not a valid one, then you should be able to see “Not found” in the results.

### Search for planet
*	When you search for **a planet** and it’s a valid one, then you should be able to see its “Population”, “Climate” and “Gravity”.
*	When you search for a planet and it’s not a valid one, then you should be able to see “Not found” in the results.

### Additional flows
*	When you search for either a character or a planet and you get one or more results for it, clear the “Search form” and hit the Search button again, you should then get an empty result list (previous search results are removed).
*	You can search for results by clicking the “Search” button or by pressing “enter” on the search field.
*	When for example you have searched for a full planet name and you’ve got results, if you switch to People and search for the same thing (that has no matching people based on a partial name), you should get a “Not found” in the results.
*	You can have more than one results, for both Planets and Names (partial matching)

## Installation

```
npm install 
```

## Run

Run `ng serve` and navigate to `http://localhost:4200/`. 
 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` or `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


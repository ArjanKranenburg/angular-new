Feature: Search for a Star Wars planet
    
    Scenario: Search a planet by name
        Given I open the Star Wars Search web application
        When I search for planet 'Tatooine'
        Then I see its Population, Climate and Gravity

    Scenario: Search a planet by part of a name
        Given I open the Star Wars Search web application
        When I search for planet 'oo'
        Then I see 3 planets

    Scenario: Search for an unknown planet results in "Not found"
        Given I open the Star Wars Search web application
        When I search for planet 'Mars'
        Then a 'Not found.' message is shown
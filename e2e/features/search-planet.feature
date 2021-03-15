Feature: Search for a Star Wars planet
    
    Scenario: Search a planet by name
        Given I open the Star Wars Search web application
        When I search for planet 'Tatooine'
        Then I see its Population, Climate and Gravity

    Scenario: Search a planet by part of a name
        Given I open the Star Wars Search web application
        When I search for planet 'oo'
        Then I see 3 planets

    Scenario: A new search for planets will clear the previous results
        Given I open the Star Wars Search web application
        And I search for planet 'Coruscant'
        And I see its Population, Climate and Gravity
        When I search for planet 'Dagobah'
        Then I see 1 planet

    Scenario: Search for an unknown planet results in "Not found"
        Given I open the Star Wars Search web application
        When I search for planet 'Vulcan'
        Then a 'Not found.' message is shown
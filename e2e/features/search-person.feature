Feature: Search for a Star Wars character
    
    Scenario: Search by full name
        Given I open the Star Wars Search web application
        When I search for character 'Luke Skywalker'
        Then I see its Gender, Birth year, Eye color, and Skin color

    Scenario: Search by part of a name
        Given I open the Star Wars Search web application
        When I search for character 'darth'
        Then I see 2 characters

    Scenario: Search for unknown character results in "Not found"
        Given I open the Star Wars Search web application
        When I search for character 'Spock'
        Then a 'Not found.' message is shown
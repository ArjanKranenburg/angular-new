Feature: Search for a Star Wars character
    
    Scenario: Search a character by full name
        Given I open the Star Wars Search web application
        When I search for character 'Luke Skywalker'
        Then I see its Gender, Birth year, Eye color, and Skin color

    Scenario: Search a character by part of a name
        Given I open the Star Wars Search web application
        When I search for character 'darth'
        Then I see 2 characters

    Scenario: A new search for characters will clear the previous results
        Given I open the Star Wars Search web application
        And I search for character 'Skywalker'
        And the character details are also shown
        When I search for character 'Anakin Skywalker'
        Then I see 1 characters

    Scenario: Search for an unknown character results in "Not found"
        Given I open the Star Wars Search web application
        When I search for character 'Spock'
        Then a 'Not found.' message is shown
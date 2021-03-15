Feature: Search for Star Wars items
    
    Scenario: Search for an item with <enter>
        Given I open the Star Wars Search web application
        When I search for an item and hit enter
        Then the details are also shown

    Scenario: Search with emty search-box will clear previous results
        Given I open the Star Wars Search web application
        And I search for an item
        And the details are also shown
        When I search with an empty search-box
        Then the details are removed

    Scenario: Switch from character to planet will clear previous results and show "Not found"
        Given I open the Star Wars Search web application
        And I search for character 'Leia'
        And the character details are also shown
        When I leave the search-box and use it to search for a planet
        Then the details are removed
        And a 'Not found.' message is shown

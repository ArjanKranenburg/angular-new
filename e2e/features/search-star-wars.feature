Feature: Search for Star Wars items

    Background:
        Given I open the Star Wars Search web application

    Scenario: Search for an item with <enter>
        When I search for planet 'Endor' and hit enter
        Then the details for 1 planet is shown

    Scenario: Search with empty search-box will clear previous results
        Given I search for character 'Yoda'
        And the details for 1 character is shown
        When I search with an empty search-box
        Then the details are removed

    Scenario: Switch from character to planet will clear previous results and show "Not found"
        Given I search for character 'Leia'
        And the details for 1 character is shown
        When I leave the search-box filled and use it to search for a planet
        Then the details are removed
        And a 'Not found.' message is shown

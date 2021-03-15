Feature: Search for a Star Wars items
    
    Scenario: Search for an item with <enter>
        Given I open the Star Wars Search web application
        When I search for an item and hit enter
        Then the details are also shown


Feature: Search for a Star Wars character
    
    Scenario: Search by full name
        Given I open the Star Wars Search web application
        When I search for character 'Skywalker'
        Then I see its Gender, Birth year, Eye color, and Skin color
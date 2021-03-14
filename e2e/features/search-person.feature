Feature: Search for a Star Wars character
    
    Scenario: Search by full name
        Given I navigate to "localhost"
        When I search for Luke Skywalkers name
        Then I see Lukes details
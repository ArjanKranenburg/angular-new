Feature: Search for a Star Wars character

    Background:
        Given I open the Star Wars Search web application

    Scenario: Search a character by full name
        When I search for character 'Luke Skywalker'
        Then I see these personal details
            | name           | gender | birth year | eye color  | skin color |
            | Luke Skywalker | male   | 19BBY      | blue       | fair       |

    Scenario: Search a character by part of a name
        When I search for character 'darth'
        Then I see these personal details
            | name        | gender | birth year | eye color  | skin color |
            | Darth Vader | male   | 41.9BBY    | yellow     | white      |
            | Darth Maul  | male   | 54BBY      | yellow     | red        |

    Scenario: A new search for characters will clear the previous results
        And I search for character 'Skywalker'
        And the details for 3 characters are shown
        When I search for character 'Anakin Skywalker'
        Then I see these personal details
            | name             | gender | birth year | eye color  | skin color |
            | Anakin Skywalker | male   | 41.9BBY    | blue       | fair       |
 
    Scenario: Search for an unknown character results in "Not found"
        When I search for character 'Spock'
        Then a 'Not found.' message is shown
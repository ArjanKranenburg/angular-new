Feature: Search for a Star Wars planet

    Background:
        Given I open the Star Wars Search web application

    Scenario: Search a planet by name
        When I search for planet 'Tatooine'
        Then I see this planet details
            | name     | population | climate | gravity    |
            | Tatooine | 200000     | arid    | 1 standard |

    Scenario: Search a planet by part of a name
        When I search for planet 'oo'
        Then I see these planet details
            | name      | population | climate   | gravity    |
            | Tatooine  | 200000     | arid      | 1 standard |
            | Naboo     | 4500000000 | temperate | 1 standard |
            | Dantooine | 1000       | temperate | 1 standard |

    Scenario: A new search for planets will clear the previous results
        And I search for planet 'Coruscant'
        And the details for 1 planet is shown
        When I search for planet 'Dagobah'
        Then I see this planet details
            | name    | population | climate | gravity |
            | Dagobah | unknown    | murky   | N/A     |

    Scenario: Search for an unknown planet results in "Not found"
        When I search for planet 'Vulcan'
        Then a 'Not found.' message is shown
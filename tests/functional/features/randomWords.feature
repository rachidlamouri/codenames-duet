Feature: Random Words

  Scenario: Starting words
    Given there are 25 cards
    Then I see 25 unique random words

  Scenario: New game words
    Given there are 25 cards
    And I see 25 unique random words
    When I refresh the page
    Then I see 25 unique random words

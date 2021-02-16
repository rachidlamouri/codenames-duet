Feature: Reset

  Background:
    Given there are 25 cards
    And there are 2 reset buttons
    And I see 25 unique random words

  Scenario: Only press top reset button
    When I press the "top" reset button
    Then I see the same 25 words

  Scenario: Only press bottom reset button
    When I press the "bottom" reset button
    Then I see the same 25 words

  Scenario: Press top and bottom reset buttons
    When I press the "top" reset button
    And I press the "bottom" reset button
    And I wait for 100 ms
    Then I see 25 unique random words

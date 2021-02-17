Feature: Turn Counters

  Scenario: Starting counters
    Then there are 9 side counters
    Then I see the player 0 "add counter" button
    Then I see the player 1 "add counter" button

  Scenario Outline: Players taking turns
    Given there are 9 side counters
    When player <playerId> takes <turnCount> <turnType> turns <indicesClause>
    Then player <playerId> has <turnCount> <turnType> turn counters
    And there are <remainingCount> side counters

    Examples:
      | playerId | turnCount | turnType   | remainingCount | indicesClause                 |
      | 0        | 1         | successful | 8              |                               |
      | 0        | 3         | bystander  | 6              | on cards 13, 14, 16           |
      | 0        | 5         | failed     | 4              | on cards 1, 6, 9, 17, 23      |
      | 1        | 2         | successful | 7              |                               |
      | 1        | 4         | bystander  | 5              | on cards 8, 13, 17, 23        |
      | 1        | 6         | failed     | 3              | on cards 3, 5, 10, 12, 14, 18 |

  Scenario Outline: All turns taken
    Given there are 9 side counters
    And player 0 takes 2 successful turns
    And player 0 takes 2 bystander turns on cards 12, 17
    And player 0 takes 1 failed turns on cards 22
    And player 1 takes 2 successful turns
    And player 1 takes 2 bystander turns on cards 9, 20
    Then there are 0 side counters

  Scenario Outline: Removing turn counters
    Given there are 9 side counters
    And player <playerId> takes 3 <turnType> turns <indicesClause>
    When player <playerId> removes 1 <turnType> turn counter <indexClause>
    Then player <playerId> has 2 <turnType> turn counters
    And there are 7 side counters

    Examples:
      | playerId | turnType   | remainingCount | indicesClause      | indexClause |
      | 0        | successful | 8              |                    |             |
      | 0        | bystander  | 6              | on cards 6, 8, 22  | on card 8  |
      | 0        | failed     | 4              | on cards 6, 11, 19 | on card 19 |
      | 1        | successful | 7              |                    |             |
      | 1        | bystander  | 5              | on cards 2, 11, 21 | on card 2  |
      | 1        | failed     | 3              | on cards 5, 10, 13 | on card 10 |

  Scenario Outline: Excess turns taken
    Given there are 9 side counters
    And player <playerIdA> takes 9 successful turns
    When player <playerIdB> takes <extraTurnCount> <turnType> turns <indicesClause>
    Then there are <extraTurnCount> error side counters

    Examples:
      | playerIdA | playerIdB | extraTurnCount | turnType   | indicesClause                   |
      | 0         | 1         | 2              | successful |                                 |
      | 0         | 1         | 3              | bystander  | on cards 6, 7, 14               |
      | 0         | 1         | 4              | failed     | on cards 7, 8, 19, 24           |
      | 1         | 0         | 5              | successful |                                 |
      | 1         | 0         | 6              | bystander  | on cards 2, 8, 10, 11, 19, 23   |
      | 1         | 0         | 7              | failed     | on cards 4, 6, 7, 9, 16, 20, 23 |

import { operationStore } from "@urql/svelte";

export const runQuizQuery = () =>
  operationStore(`#graphql
  query GetQuiz {
    ManUtd: Club(teamName: "Manchester United") {
      # Top goalscorers for all competitions
      TopGoalScorers: AllTimeTopGoalScorers(first: 30) {
        ...GoalScorerFields
      }

      # Top goalscorers in FA Cup

      # FA Cup winning seasons

      # Get fixtures against West Ham
      # WestHamResults: FixturesByOpposition(opponent: "West Ham", first: 200, offset: 0) {
      #   Competition
      #   # Result is always "[Man Utd Goals]:[West Ham Goals]"
      #   Result
      #   YearStart
      #   Place
      # }
    }
  }

  fragment GoalScorerFields on Player {
    surname: Surname
    firstname: Firstname
    totalGoals: TotalGoals
  }
`);

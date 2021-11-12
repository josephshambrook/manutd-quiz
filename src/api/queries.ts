import { operationStore } from "@urql/svelte";

export const topGoalscorers = operationStore(`#graphql
  query {
    Club(teamName: "Manchester United"){
      AllTimeTopGoalScorers(first: 10){
        Surname
        Firstname
        TotalGoals
      }
    }
  }
`);

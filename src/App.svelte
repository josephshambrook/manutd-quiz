<script>
  import {
    initClient,
    operationStore,
    query,
    dedupExchange,
    cacheExchange,
    fetchExchange,
  } from "@urql/svelte";
  import { authExchange } from "@urql/exchange-auth";

  // components
  import Quiz from "./Quiz.svelte";

  // helpers
  import {
    getAuth,
    addAuthToOperation,
    willAuthError,
    didAuthError,
  } from "./auth";

  // stuff to do as soon as the component is loaded
  initClient({
    url: process.env.MANUTD_API_URL,
    exchanges: [
      dedupExchange,
      cacheExchange,
      authExchange({
        addAuthToOperation,
        getAuth,
        willAuthError,
        didAuthError,
      }),
      fetchExchange,
    ],
  });

  const resultsAgainstWestHam = operationStore(`#graphql
    query {
      Club(teamName: "Manchester United") {
        # Get fixtures against West Ham
        FixturesByOpposition(opponent: "West Ham", first: 200, offset: 0) {
          Competition
          # Result is always "[Man Utd Goals]:[West Ham Goals]"
          Result
          YearStart
          Place
        }
      }
    }
  `);

  const topGoalscorers = operationStore(`#graphql
    query {
      Club(teamName: "Manchester United"){
        AllTimeTopGoalScorers(first: 30){
          Surname
          Firstname
          TotalGoals
        }
      }
    }
  `);

  query(topGoalscorers);

  // const quizData = getAllData();
</script>

{#if $topGoalscorers.fetching}
  <p>Loading...</p>
{:else if $topGoalscorers.error}
  <p>Oh no... {$topGoalscorers.error.message}</p>
{:else}
  <Quiz topGoalscorers={$topGoalscorers} />
{/if}

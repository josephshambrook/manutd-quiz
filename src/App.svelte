<script>
  import {
    initClient,
    query,
    dedupExchange,
    cacheExchange,
    fetchExchange,
  } from "@urql/svelte";
  import { authExchange } from "@urql/exchange-auth";
  import { Router } from "svelte-navigator";

  // components
  import Quiz from "./Quiz.svelte";

  // helpers
  import {
    getAuth,
    addAuthToOperation,
    willAuthError,
    didAuthError,
  } from "./api/auth";
  import { runQuizQuery } from "./api/queries";
  import { createQuiz } from "./data/createQuiz";

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

  const apiData = runQuizQuery();

  const generateQuiz = new Promise((resolve, reject) => {
    $apiData.subscribe((data) => {
      if (data.error) {
        return reject(data.error);
      }

      if (!data.fetching && data.data) {
        const quiz = createQuiz(data.data);
        return resolve(quiz);
      }
    });

    query(apiData);
  });
</script>

{#await generateQuiz}
  <p>Loading quiz...</p>
{:then data}
  <Router>
    <Quiz quiz={data} />
  </Router>
{:catch err}
  <p>
    Ah dang, hit an error! Sorry about that - give this page a refresh in case
    it's something temporary.
  </p>
{/await}

<script lang="ts">
  // packages
  import { onMount } from "svelte";
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
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";

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

  const data = operationStore(`#graphql
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

  query(data);

  console.log("data", data);
</script>

<style>
  :root {
    /* #DA291C */
    --color-red: hsla(4, 77%, 48%, 1);
    /* #FBE122 */
    --color-yellow: hsla(53, 96%, 56%, 1);
  }

  :global(body) {
    --theme-primary: var(--color-red);
    --theme-secondary: var(--color-yellow);

    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<Header />

<main>
  <h1>Hello!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
</main>

<Footer />

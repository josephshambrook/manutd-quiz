<script lang="ts">
  import { Link, Route } from "svelte-navigator";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";
  import Question from "./components/Question.svelte";
  import MultiInputQuestion from "./components/MultiInputQuestion.svelte";
  import Card from "./components/Card.svelte";

  // props
  export let quiz = [];

  console.log("quiz", quiz);

  const getQuestion = (id: string) => {
    return quiz.find((q) => q.id === id);
  };
</script>

<style>
  :root {
    /* #DA291C */
    --color-red: hsla(4, 77%, 48%, 1);
    /* #FBE122 */
    --color-yellow: hsla(53, 96%, 56%, 1);

    --theme-primary: var(--color-red);
    --theme-secondary: var(--color-yellow);

    --page-padding: 1rem;
  }

  :global(body) {
    background-color: #f4f7f5;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }

  main {
    padding: 1rem;
  }
</style>

<Header />

<main>
  <Route path="/">
    <h2>Top 10 Questions</h2>

    {#each quiz as question}
      <Card>
        <Link to={`/${question.id}`} slot="card-title">
          {question.question}
        </Link>
      </Card>
    {/each}
  </Route>

  <!-- Perfect reasoning for using SvelteKit here -->
  <Route path=":questionId" let:params>
    <Question question={getQuestion(params.questionId)} />
  </Route>
</main>

<Footer />

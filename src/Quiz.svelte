<script lang="ts">
  // props
  export let topGoalscorers = [];

  // components
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Question from "./components/Question.svelte";

  // helpers
  import { populateQuiz } from "./data/populateQuiz";

  const quiz = populateQuiz({ topGoalscorers });

  console.log("quiz", quiz);
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
  {#each quiz as question, i}
    <Question
      question={question.question}
      allAnswers={[...question.possibleAnswers, question.correctAnswer]}
      correctAnswer={question.correctAnswer}
    />
  {/each}
</main>

<Footer />

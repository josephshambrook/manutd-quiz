<script type="ts">
  import { onMount } from "svelte";

  import { getPlayerName, isAcceptablePlayerAnswer } from "../helpers";
  import type { Player, QuizMultiInputQuestion } from "../types";

  // props
  export let question: QuizMultiInputQuestion<Player>;

  $: guess = "";

  const guessSubmitted = () => {
    question.answers = question.answers.map((answer) => {
      const isAcceptableAnswer = isAcceptablePlayerAnswer({
        firstname: answer.firstname,
        surname: answer.surname,
        guess,
      });

      if (isAcceptableAnswer) {
        guess = "";
      }

      return {
        ...answer,
        show: isAcceptableAnswer || answer.show,
      };
    });
  };

  // focus the input when component mounts
  onMount(() => {
    const input = document.querySelector("input");
    if (input) {
      input.focus();
    }
  });
</script>

<style>
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  form > input {
    margin-bottom: 0;
  }
</style>

<form on:submit|preventDefault={guessSubmitted}>
  <label for={`guess-${question.id}`}>Enter a guess here:</label>
  <input
    type="text"
    id={`guess-${question.id}`}
    name="guess"
    bind:value={guess}
    disabled={question.state === "finished"}
  />
  <button type="submit">Submit</button>
</form>

<ol>
  {#each question.answers as answer}
    <li>{answer.show ? getPlayerName(answer) : ""}</li>
  {/each}
</ol>

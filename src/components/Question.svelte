<script type="ts">
  import { Link } from "svelte-navigator";
  import { formatTimeLeft } from "../helpers";
  import type {
    Player,
    QuizMultiInputQuestion,
    QuizSingleChoiceQuestion,
  } from "../types";
  import MultiInputQuestion from "./MultiInputQuestion.svelte";

  export let question:
    | QuizMultiInputQuestion<Player>
    | QuizSingleChoiceQuestion;

  $: timeLeft = question.timeLimit;

  let timer: number;

  const startTimer = () => {
    question.state = "running";

    timer = window.setInterval(() => {
      timeLeft -= 1;

      if (timeLeft <= 0) {
        finishQuiz();
      }
    }, 1000);
  };

  const finishQuiz = () => {
    question.state = "finished";
    clearInterval(timer);
    timer = 0;
  };

  const revealAnswers = () => {
    question.answers = question.answers.map((a) => ({
      ...a,
      show: true,
    }));
  };
</script>

<style>
  :global(button) {
    cursor: pointer;
  }
</style>

<Link to="/">Back</Link>

<h2>{question.question}</h2>

<p>{question.description}</p>

{#if question.state === "initial"}
  <div>
    <button type="button" on:click={startTimer}>Start</button>
  </div>
{:else}
  {#if question.state === "running"}
    <div>Time left: {formatTimeLeft(timeLeft)}</div>
    <button type="button" on:click={finishQuiz}>Give up</button>
  {/if}
  {#if question.state === "finished"}
    <div>Time's up!</div>
    <button type="button" on:click={revealAnswers}>Reveal answers</button>
  {/if}

  {#if question.type === "multi-input"}
    <MultiInputQuestion {question} />
  {/if}
{/if}

<script>
  export let question;
  export let allAnswers;
  export let correctAnswer;

  import { shuffle } from "../data/helpers";

  const shuffledAnswers = shuffle(allAnswers);

  let isCorrect;
  let isAnswered;

  let answerSelected = (answer) => {
    // return answer === correctAnswer;
    isAnswered = true;
    isCorrect = answer === correctAnswer;
    console.log(answer === correctAnswer);
  };
</script>

<style>
  div {
    margin-bottom: 10px;
    padding: 10px;
  }

  h3 {
    margin-top: 0;
  }

  h5.wrong {
    color: red;
  }

  h5.isCorrect {
    color: green;
  }
</style>

<div>
  <h3>Question: {question}</h3>

  {#each shuffledAnswers as answer}
    <button on:click={() => answerSelected(answer)} disabled={isAnswered}>
      {answer}
    </button>
  {/each}

  {#if isAnswered}
    <h5 class:isCorrect class:wrong={!isCorrect}>
      {#if isCorrect}You got it right{:else}You goofed up{/if}
    </h5>
  {/if}
</div>

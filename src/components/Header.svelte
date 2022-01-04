<script>
  import octicons from "@primer/octicons";
</script>

<style>
  header {
    align-items: center;
    background-color: transparent;
    border-bottom: 2px solid var(--theme-primary);
    display: flex;
    justify-content: space-between;
    padding: 2rem 1rem;

    /* reset from simple.css */
    left: initial;
    margin-left: 0;
    margin-right: 0;
    right: initial;
    width: auto;
  }

  h1 {
    color: var(--theme-primary);
    font-weight: bold;
  }
</style>

<header>
  <h1>Manchester United Quiz</h1>
  <a href="https://github.com/josephshambrook/manutd-quiz"
    >{@html octicons["mark-github"].toSVG({ width: 36 })}</a
  >
</header>

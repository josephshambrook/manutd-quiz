<style>
  .card {
    border-radius: 5px;
    background: #ffffff;
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    padding: 2rem 1rem;
  }

  h3 {
    margin: 0;
  }
</style>

<div class="card">
  <h3>
    <slot name="card-title" />
  </h3>
</div>

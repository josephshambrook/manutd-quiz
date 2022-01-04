<style>
  .card {
    background-color: #fff;
    border-radius: 5px;
    padding: 1rem;
  }
</style>

<div class="card">
  <h3>
    <slot name="card-title" />
  </h3>

  <p>
    <slot name="card-description" />
  </p>
</div>

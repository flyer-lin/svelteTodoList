<script>
  export let todos;
  $: completedTodos = todos.filter((todo) => todo.completed).length;
  $: totalTodos = todos.length;
  let headingEl;
  export function focus() {
    headingEl.focus();
  }
</script>

<h2 id="list-heading" bind:this={headingEl} tabindex="-1">
  {completedTodos} out of {totalTodos} items completed
</h2>

<script>
  import FilterButton from "./FilterButton.svelte";
  import MoreActions from "./MoreActions.svelte";
  import NewTodo from "./NewTodo.svelte";
  import Todo from "./Todo.svelte";
  import TodoStatus from "./TodoStatus.svelte";
  import { alert } from "../stores";
  export let todos = [];
  let newTodoId;
  let todoStatus;
  $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  let filter = "all";
  $: {
    if (filter === "all") {
      $alert = "Browsing all to-dos";
    } else if (filter === "active") {
      $alert = "Browsing active to-dos";
    } else if (filter === "completed") {
      $alert = "Browsing completed to-dos";
    }
  }
  const filterTodos = (filter, todos) => {
    return filter === "active"
      ? todos.filter((todo) => !todo.completed)
      : filter === "completed"
        ? todos.filter((todo) => todo.completed)
        : todos;
  };
  function removeTodos(t) {
    todos = todos.filter((todo) => todo.id !== t.id);
    todoStatus.focus(); // 删除待办事项后，聚焦到待办状态标题
    $alert = `Todo '${t.name}' has been deleted`;
  }
  function addTodo(name) {
    const newTodo = {
      id: newTodoId,
      name,
      completed: false,
    };
    todos = [...todos, newTodo];
    $alert = `Todo '${name}' has been added`;
  }
  function updateTodo(todo) {
    const i = todos.findIndex((t) => t.id === todo.id);
    if (todos[i].name !== todo.name)
      $alert = `todo '${todos[i].name}' has been renamed to '${todo.name}'`;
    if (todos[i].completed !== todo.completed)
      $alert = `todo '${todos[i].name}' marked as ${
        todo.completed ? "completed" : "active"
      }`;
    todos[i] = { ...todo[i], ...todo };
  }
  function checkAll(completed) {
    todos = todos.map((todo) => ({ ...todo, completed }));
    $alert = `${completed ? "Checked" : "Unchecked"} ${todos.length} to-dos`;
  }
  function removeCompleted() {
    $alert = `Removed ${todos.filter((t) => t.completed).length} to-dos`;
    todos = todos.filter((t) => !t.completed);
  }
</script>

<!-- Todos.svelte -->
<div class="todoapp stack-large">
  <!-- 新待办 -->
  <NewTodo on:addTodo={(e) => addTodo(e.detail.name)} autofocus />
  <!-- 过滤按钮 -->
  <FilterButton bind:filter />

  <!-- 待办状态 -->
  <TodoStatus {todos} bind:this={todoStatus} />

  <!-- 待办 -->
  <ul class="todo-list stack-large" aria-labelledby="list-heading">
    {#each filterTodos(filter, todos) as todo (todo.id)}
      <li class="todo">
        <Todo
          {todo}
          on:remove={(e) => removeTodos(e.detail)}
          on:update={(e) => updateTodo(e.detail)}
        />
      </li>
    {:else}
      <li>Nothing to do here!</li>
    {/each}
  </ul>

  <hr />
  <MoreActions
    {todos}
    on:checkAll={(e) => checkAll(e.detail)}
    on:removeCompleted={removeCompleted}
  />
</div>

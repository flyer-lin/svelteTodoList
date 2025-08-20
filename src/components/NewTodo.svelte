<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { selectOnFocus } from "../actions";
  const dispatch = createEventDispatcher();
  export let autofoucus = true;
  let name = "";
  let nameEl;
  const addTodo = () => {
    dispatch("addTodo", { name });
    name = "";
    nameEl.focus(); // 添加完待办事项后，重新聚焦到输入框
  };
  const onCancel = () => {
    name = "";
    nameEl.focus(); // 取消时也重新聚焦到输入框
  };
  onMount(() => {
    if (autofoucus) {
      nameEl.focus();
    }
  });
</script>

<form
  on:submit|preventDefault={addTodo}
  on:keydown={(e) => e.key === "Escape" && onCancel()}
>
  <h2 class="label-wrapper">
    <label for="todo-0" class="label__lg"> What needs to be done? </label>
  </h2>
  <input
    bind:this={nameEl}
    bind:value={name}
    use:selectOnFocus
    type="text"
    id="todo-0"
    autocomplete="off"
    class="input input__lg"
  />
  <button type="submit" disabled="{!name}" class="btn btn__primary btn__lg">
    Add
  </button>
</form>

import { handler } from "../_fns/custom_functions.js";
import { deleteLocalStorage } from "../hooks/delete_local_storage.js";

export const deleteTodoList = (e) => {
  e.stopPropagation();

  const item = e.target;
  if(item.classList.contains('trash--btn')){
    const todo = item.parentElement;
    todo.classList.add('fall');

    deleteLocalStorage(todo);

    handler(todo, 'transitionend', () => todo.remove())
  }
}
import { handler } from "../_fns/custom_functions.js";
import { deleteLocalStorage } from "../hooks/delete_local_storage.js";

export const deleteTodoList = (event) => {
  const item = event.target;
  const todoItem = item.closest('.list--items');

  if(event.stopPropagation) event.stopPropagation();

  if(todoItem){
    todoItem.remove()
  }

  if(item.classList.contains('trash--btn')){
    const todo = item.parentElement;
    const checkbox = todoItem.querySelector('input[type="checkbox"]');

    if(!checkbox.checked){
      alert('You must check the task before deleting it!');
      return
    }else{
      todo.classList.add('fall');
      todoItem.remove()
    }

    deleteLocalStorage(todo);

    handler(todo, 'transitionend', () => todo.remove())
  }
}
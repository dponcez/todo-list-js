import { handler } from "../_fns/custom_functions.js";
import { deleteLocalStorage } from "../hooks/delete_local_storage.js";
import { createElement } from '../_fns/custom_functions.js';
import { selector } from '../_fns/custom_functions.js';

const container = selector('.container');

export const deleteTodoList = (event) => {
  const item = event.target;
  const todoItem = item.closest('.list--items');
  console.log(container)

  if(!todoItem) return; 
  if(event.stopPropagation) event.stopPropagation();

  if(item.classList.contains('trash--btn')){
    const todo = item.parentElement;
    const checkbox = todoItem.querySelector('input[type="checkbox"]');

    if(!checkbox.checked){
      const template = createElement('div');
      template.classList.add('delete--container');

      container.appendChild(template);
      const alert = selector('.delete--container');

      alert.innerHTML = `
        <div class="alert--container">
          <p class="alert--text">You must check the task before deleting it!</p>
          <button class="btn alert--btn">OK</button>
        </div>
      `;

      const closeAlert = selector('.alert--btn');
      handler(closeAlert, 'click', () => alert.remove());
      return
    }else{
      todo.classList.add('fall');
      todoItem.remove()
    }

    deleteLocalStorage(todo);

    handler(todo, 'transitionend', () => todo.remove())
  }
}
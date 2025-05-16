import { handler } from "../_fns/custom_functions.js";
import { deleteLocalStorage } from "../hooks/delete_local_storage.js";
import { createElement } from '../_fns/custom_functions.js';
import { selector } from '../_fns/custom_functions.js';

export const deleteTodoList = (event) => {
  const item = event.target;
  const todoItem = item.closest('.list--items');
  const todo = item.parentElement;

  // if(!todoItem) return; 
  if(!item.classList.contains('trash--btn')) return;
  if(event.stopPropagation) event.stopPropagation();

  const checkbox = todoItem.querySelector('input[type="checkbox"]');

  if(!checkbox.checked){
    if(!document.querySelector('.delete--container')){
      const htmlRefs = {
        template: createElement('div'),
        alertText: createElement('p'),
        alertBtn: createElement('button')
      }

      const { template, alertText, alertBtn } = htmlRefs;

      template.classList.add('delete--container');
      alertText.classList.add('alert--text');
      alertBtn.classList.add('btn', 'alert--btn');

      alertText.textContent = 'You must check the task before deleting it!';
      alertBtn.textConten = 'OK';

      handler(alertBtn, 'click', () => template.remove());
      template.appendChild(alertText);
      template.appendChild(alertBtn);

      (document.body || parentElement).appendChild(template);
    }

    return
  }
  todo.classList.add('fall');
  todoItem.remove();

  deleteLocalStorage(todo);

  handler(todo, 'transitionend', () => todo.remove());
}
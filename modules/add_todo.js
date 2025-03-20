import { selector } from "../_fns/custom_functions.js";
import { createElement } from "../_fns/custom_functions.js";
import { handler } from "../_fns/custom_functions.js";
import { debounce } from "../utils/debounce.js";
import { saveLocalStorage } from "../hooks/save_local_storage.js";

export const initTodoList = () => {
  const dataRefs = {
    addTodoBtn: selector('[data-submit]'),
    todoInput: selector('[data-input]'),
    todoList: selector('[data-list]')
  }

  const { addTodoBtn, todoInput, todoList } = dataRefs;

  const addTodo = (event) => {
    // event.preventDefault();

    const inputValue = todoInput.value;
    let trash_icon = '<i class="icon fa-solid fa-trash"></i>'

    if(inputValue === ''){
      alert('Task cannot be empty')
    }else{
      const htmlRefs = {
        listItem: createElement('div'),
        newItem: createElement('li'),
        trashBtn: createElement('button')
      }
  
      const { listItem, newItem, trashBtn } = htmlRefs;
  
      newItem.innerText = String(inputValue.toUpperCase());
  
      listItem.classList.add('list--items');
      newItem.classList.add('item');
      trashBtn.classList.add('btn', 'trash--btn');
      trashBtn.innerHTML = trash_icon
  
      listItem.appendChild(newItem);
      listItem.appendChild(trashBtn);
      todoList.appendChild(listItem);

      todoInput.value = '';
      todoInput.focus();
    }
  }
  handler(addTodoBtn, 'click', debounce(addTodo, 300))
}
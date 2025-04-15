import { selector } from "../_fns/custom_functions.js";
import { createElement } from "../_fns/custom_functions.js";
import { handler } from "../_fns/custom_functions.js";
import { debounce } from "../utils/debounce.js";
import { saveLocalStorage } from "../hooks/save_local_storage.js";
import { deleteTodoList } from "./delete_todo.js";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const initTodoList = () => {
  const dataRefs = {
    addTodoBtn: selector('[data-submit]'),
    todoInput: selector('[data-input]'),
    todoList: selector('[data-list]')
  }

  const container = selector('.container');

  const { addTodoBtn, todoInput, todoList } = dataRefs;
  const DEGREES = 180;

  const addTodo = () => {
    const inputValue = todoInput.value.trim();
    let trash_icon = '<i class="icon fa-solid fa-trash"></i>';
    
    if(inputValue){
      const htmlRefs = {
        listItem: createElement('div'),
        newItem: createElement('li'),
        trashBtn: createElement('button')
      }
  
      const { listItem, newItem, trashBtn } = htmlRefs;

      if(inputValue.length <= 5){
        newItem.textContent = inputValue.toUpperCase();
      }else{
        newItem.textContent = capitalizeFirstLetter(inputValue)
      }
  
      listItem.classList.add('list--items');
      newItem.classList.add('item');
      trashBtn.classList.add('btn', 'trash--btn');
      trashBtn.innerHTML = trash_icon;

      handler(trashBtn, 'click', deleteTodoList);
      saveLocalStorage(inputValue);
  
      listItem.appendChild(newItem)
      listItem.appendChild(trashBtn);
      todoList.appendChild(listItem);

      todoInput.value = '';
      todoInput.focus();
    }else{
      try{
        const template = createElement('div');

        template.classList.add('alert');
        container.appendChild(template);

        const alert = selector('.alert');

        alert.innerHTML = `
          <p class="alert--msg">!Task cannot be empty¡</p>
          <button class="btn close--alert">
            <i class="fa-solid fa-xmark"></i>
          </button>
        `;

        const closeAlertBtn = selector('.close--alert');

        handler(closeAlertBtn, 'click', () => {
          todoInput.disabled = false;
          addTodoBtn.disabled = false;

          addTodoBtn.style.cursor = 'pointer';
          addTodoBtn.style.pointerEvents = 'all';
          addTodoBtn.style.background = `linear-gradient(
            ${DEGREES}deg,
            hsl(195, 87%, 58%),
            hsl(201, 79%, 50%),
            hsl(198, 78%, 41%)
          )`;
          addTodoBtn.style.boxShadow = `1.25vmin 1.25vmin 0.25lh hsl(195, 87%, 50%) inset, 1vmin 1vmin 0 0 rgba(0,0,0,.7) inset, -1.25vmin -1.25vmin 0.25lh hsl(210, 100%, 34%)inset, -1vmin -1vmin 0 0 rgba(0,0,0,.7) inset, 0 0 0 0.125lh rgba(0,0,0,.75)`;
          
          alert.remove();
          todoInput.focus();
        });

        todoInput.disabled = true;
        addTodoBtn.disabled = true;

        addTodoBtn.style.cursor = 'default';
        addTodoBtn.style.pointerEvents = 'none';
        addTodoBtn.style.background = `linear-gradient(
          ${DEGREES}deg,
          hsl(213, 7.20%, 70%),
          hsl(210, 18%, 53%),
          hsl(202, 18%, 47%)
        )`;
        addTodoBtn.style.boxShadow = `1.25vmin 1.25vmin 0.25lh hsl(213, 7.20%, 70%) inset, 1vmin 1vmin 0 0 rgba(0,0,0,.7) inset, -1.25vmin -1.25vmin 0.25lh hsl(210, 18%, 30%) inset, -1vmin -1vmin 0 0 rgba(0,0,0,.7) inset, 0 0 0 0.125lh rgba(0,0,0,.75)`; 
      }catch(error){
        console.log(`Error while handling alert: ${error.message}`)
      }
    }
  }
  
  handler(addTodoBtn, 'click', debounce(addTodo, 300));
}
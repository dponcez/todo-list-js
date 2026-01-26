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
    todoList: selector('[data-list]'),
    form: selector('[data-form]')
  }

  const container = selector('.container');

  const { addTodoBtn, todoInput, todoList, form } = dataRefs;
  const DEGREES = 180;

  const addTodo = () => {
    const inputValue = todoInput.value.trim();
    let trash_icon = '<i class="icon fa-solid fa-trash"></i>';

    if(inputValue){
      const createHTMLRefs = {
        listItem: createElement('li'),
        item: createElement('div'),
        info: createElement('p'),
        trashBtn: createElement('button'),
        checkTask: createElement('input')
      }

      const { listItem, item, info, trashBtn, checkTask } = createHTMLRefs;

      inputValue.length < 5 ?
        info.textContent = inputValue.toUpperCase() :
        info.textContent = capitalizeFirstLetter(inputValue);

      listItem.classList.add('list--items');
      item.classList.add('item');
      info.classList.add('info');
      trashBtn.classList.add('btn', 'trash--btn');
      checkTask.classList.add('check');

      checkTask.type = 'checkbox';
      trashBtn.innerHTML = trash_icon;

      handler(checkTask, 'input', debounce((event) => {
        const check = event.target.checked;
        const item = event.target.parentElement.querySelector('.item');

        check ? 
          item.classList.add('line--through') :
          item.classList.remove('line--through')
      }));

      handler(trashBtn, 'click', deleteTodoList);
      saveLocalStorage(inputValue);

      listItem.appendChild(checkTask);
      item.appendChild(info);
      listItem.appendChild(item);
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
          <button class="btn close--alert" data-close-alert>
            <i class="fa-solid fa-xmark"></i>
          </button>
        `;

        const closeAlertBtn = selector('[data-close-alert]');
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
          addTodoBtn.style.boxShadow = `
            1.25vmin 1.25vmin 0.25lh hsl(195, 87%, 50%) inset, 
            1vmin 1vmin 0 0 rgba(0,0,0,.7) inset, 
            -1.25vmin -1.25vmin 0.25lh hsl(210, 100%, 34%)inset, 
            -1vmin -1vmin 0 0 rgba(0,0,0,.7) inset, 
            0 0 0 0.125lh rgba(0,0,0,.75)
          `;
          
          alert.remove();
          todoInput.focus();
        });

        todoInput.disabled = true;
        addTodoBtn.disabled = true;

        addTodoBtn.style.cursor = 'not-allowed';
        addTodoBtn.style.pointerEvents = 'none';
        addTodoBtn.style.background = `linear-gradient(
          ${DEGREES}deg,
          hsl(213, 7.20%, 70%),
          hsl(210, 18%, 53%),
          hsl(202, 18%, 47%)
        )`;
        addTodoBtn.style.boxShadow = `
          1.25vmin 1.25vmin 0.25lh hsl(213, 7.20%, 70%) inset, 
          1vmin 1vmin 0 0 rgba(0,0,0,.7) inset, 
          -1.25vmin -1.25vmin 0.25lh hsl(210, 18%, 30%) inset, 
          -1vmin -1vmin 0 0 rgba(0,0,0,.7) inset, 
          0 0 0 0.125lh rgba(0,0,0,.75)
        `;
      }catch(error){
        console.log(`Error handling alert message: ${error.message}`)
      }
    }
  }

  handler(addTodoBtn, 'click', debounce(addTodo, 300));
  handler(form, 'submit', event => event.preventDefault());
}
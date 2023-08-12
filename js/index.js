const initApp = () => {

  // Selectors
  const elements = {
    todoInput: document.querySelector('[data-input]'),
    todoList: document.querySelector('[data-list]'),
    addBtn: document.querySelector('[data-submit]')
  }

  const { 
    todoInput, 
    todoList, 
    addBtn,
  } = elements;

  const addTodos = (event) => {

    // Prevent default form behaviour
    event.preventDefault();

    const INPUT_VALUE = todoInput.value;
    const EMPTY_STRING = '';

    if(INPUT_VALUE === EMPTY_STRING){
      alert('Task cannot be empty')
    }else{

      // Create elements
      const createElements = {
        listItems: document.createElement('div'),
        newItem: document.createElement('li'),
        trashBtn: document.createElement('button')
      }
  
      const { 
        listItems, 
        newItem, 
        trashBtn 
      } = createElements;
  
      newItem.innerText = todoInput.value;
  
      // add classes
      listItems.classList.add('list--items');
      newItem.classList.add('item');
      trashBtn.className = 'btn trash--btn';
  
      trashBtn.innerHTML = '<i class="icon fa-solid fa-trash"></i>'
  
      trashBtn.addEventListener('click', deleteTodo);

      // Save todo to localStorage
      saveLocalStorage(INPUT_VALUE);
  
      // append to current element
      listItems.appendChild(newItem);
      listItems.appendChild(trashBtn);
      todoList.appendChild(listItems);
  
      // clear input
      todoInput.value = '';

      // input focus
      todoInput.focus();
    }
  }

  const deleteTodo = (e) => {

    e.stopPropagation();

    const item = e.target;
    if(item.className === 'btn trash--btn'){

      const todo = item.parentElement;
      todo.classList.add('fall');

      // Delete todo saved in localStorage
      deleteLocalStorage(todo);

      todo.addEventListener('transitionend', () => todo.remove())
      
    }
  }

  const saveLocalStorage = (todo) => {
    let todos;
    localStorage.getItem('todos') === null ? 
      todos = [] :
      todos = JSON.parse(localStorage.getItem('todos'))
    
    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const deleteLocalStorage = (todo) => {
    let todos;
    localStorage.getItem('todos') === null ?
      todos = [] :
      todos = JSON.parse(localStorage.getItem('todos'))
    
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index), 1);

    localStorage.setItem('todos', JSON.stringify(todos))
  }

  // Event handler function
  const handleEvent = (element, event, callback) => {
    element.addEventListener(event, callback)
  }

  handleEvent(addBtn, 'click', addTodos)
}

document.addEventListener('DOMContentLoaded', initApp)
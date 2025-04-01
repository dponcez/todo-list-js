const { initTodoList } = require('../modules/add_todo.js');

jest.mock('../utils/debounce.js', () => ({
  debounce: (fn) => fn, // Mockea debounce para que ejecute la función inmediatamente
}));

describe('addTodo', () => {
  let todoList;
  let button;
  let input;

  beforeEach(() => {
    // Configura el DOM simulado
    document.body.innerHTML = `
      <div class="form--container">
        <form action="#" data-form>
          <input class="todo todo--input" type="text" placeholder="Type your todo..." data-input>
          <button class="btn add--btn" type="submit" data-submit>
            <i class="icon fa-solid fa-plus"></i>
          </button>
        </form>
        <ul class="todo todo--list" data-list></ul>
      </div>
    `;

    // Obtén referencias a los elementos del DOM
    todoList = document.querySelector('[data-list]');
    button = document.querySelector('[data-submit]');
    input = document.querySelector('[data-input]');

    // Prevenir el comportamiento predeterminado del formulario
    const form = document.querySelector('[data-form]');
    form.addEventListener('submit', (e) => e.preventDefault());

    initTodoList()
  });

  test('should add a new todo to the list when the button is clicked', () => {
    input.value = 'buy groceries';
    console.log('Clicking the button...');
    button.click();

    console.log('Todo list innerHTML after click:', todoList.innerHTML);

    const todos = todoList.querySelectorAll('li');
    expect(todos).toHaveLength(1);
    expect(todos[0].textContent).toBe('BUY GROCERIES');
  });

  test('should not add an empty todo when the button is clicked', () => {
    input.value = '';
    button.click();

    console.log('Todo list innerHTML after empty input:', todoList.innerHTML);

    const todos = todoList.querySelectorAll('li');
    expect(todos).toHaveLength(0);
  });

  test('should trim whitespace from the todo before adding', () => {
    input.value = '   learn javascript   ';
    button.click();

    console.log('Todo list innerHTML after trimming whitespace:', todoList.innerHTML);

    const todos = todoList.querySelectorAll('li');
    expect(todos).toHaveLength(1);
    expect(todos[0].textContent).toBe('LEARN JAVASCRIPT');
  });
});
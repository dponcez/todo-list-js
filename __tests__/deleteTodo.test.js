const { deleteTodoList } = require('../modules/delete_todo.js');

describe('deleteTodoList', () => {
  let container, todoItem, deleteButton, checkbox;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="list--items">
          <input type="checkbox" class="check"/>
          <li class="item">Test Todo</li>
          <button class="btn trash--btn"></button>
        </div>
      </div>
    `;
    container = document.querySelector('.container');
    todoItem = document.querySelector('.list--items');
    deleteButton = document.querySelector('.trash--btn');
    checkbox = document.querySelector('.check');
  });

  test('should not delete anything if the event is not triggered by the delete button', () => {
    const event = { 
      target: { 
        classList: { contains: () => false }, 
        closest: jest.fn(), 
      }, 
      stopPropagation: jest.fn() 
    };
    deleteTodoList(event);

    // No debe eliminar nada
    expect(container.querySelector('.list--items')).not.toBeNull();
  });

  test('displays an alert if you try to delete without checking the checkbox', () => {
    checkbox.checked = false;
    deleteTodoList({ target: deleteButton, stopPropagation: jest.fn() });

    const alert = document.querySelector('.delete--container');
    expect(alert).not.toBeNull();
    expect(alert.textContent).toMatch(/must check the task/i);

    // Simula click en el botón OK de la alerta
    const okBtn = document.querySelector('.alert--btn');
    okBtn.click();
    expect(document.querySelector('.delete--container')).toBeNull();
  });

  test('delete the task if the checkbox is checked', () => {
    checkbox.checked = true;
    deleteTodoList({ target: deleteButton, stopPropagation: jest.fn() });
  
    // El elemento debe ser eliminado del DOM
    expect(container.querySelector('.list--items')).toBeNull();
  });

  test('should stop propagation when the delete button is clicked', () => {
    const event = {
      target: deleteButton,
      stopPropagation: jest.fn()
    };

    deleteTodoList(event);

    expect(event.stopPropagation).toHaveBeenCalled();
  })
});
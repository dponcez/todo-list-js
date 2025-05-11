const { deleteTodoList } = require('../modules/delete_todo.js');

describe('deleteTodoList', () => {
  let todoItem;
  let deleteButton;
  let checkItem;

  beforeEach(() => {
    // Configura el DOM simulado
    document.body.innerHTML = `
      <div class="list--items">
        <input type="checkbox" class="check"/>
        <li class="item">Test Todo</li>
        <button class="btn trash--btn"></button>
      </div>
    `;

    // Obtén referencias a los elementos del DOM
    checkItem = document.querySelector('.check');
    todoItem = document.querySelector('.list--items');
    deleteButton = document.querySelector('.trash--btn');
  });

  test('should remove the todo item when the delete button is clicked', () => {
    deleteTodoList({ target: deleteButton });

    // Verifica que el elemento ya no esté en el documento
    expect(document.body.contains(todoItem)).toBe(false);
  });

  test('should stop propagation when the delete button is clicked', () => {
    const event = {
      target: deleteButton,
      stopPropagation: jest.fn()
    }

    deleteTodoList(event);

    // Verifca que stopPropagation haya sido llamado
    expect(event.stopPropagation).toHaveBeenCalled();
  });
})
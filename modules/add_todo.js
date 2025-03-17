import { selector } from "../_fns/custom_functions.js";
import { createElement } from "../_fns/custom_functions.js";
import { handler } from "../_fns/custom_functions.js";

export const initTodoList = () => {
  const htmlRefs = {
    addTodoBtn: selector('[data-submit]'),
    todoInput: selector('[data-input]'),
    todoList: selector('[data-list]')
  }

  const { addTodoBtn, todoInput, todoList } = htmlRefs

  const addTodo = (event) => {
    event.preventDefault();
  }
}
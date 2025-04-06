export const deleteLocalStorage = (todo) => {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach((item, index) => {
    if(item === todo.children[0].textContent){
      todos.splice(todos.indexOf(index), 1)
    }
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}
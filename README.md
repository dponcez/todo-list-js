# Todo List JS

This project is a task list application developed with JavaScript. It allows users to easily add and delete tasks.

## Features
----

- **Add tasks**: Allows adding new tasks to the list.
- **Delete tasks**: Ability to delete specific tasks.
- **User-friendly interface**: Simple and easy-to-use design.

## Technologies Used
----

__Developer tools__

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML): Application structrue.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS): Interface styling.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): Application logic.

__Source code editor__

- [VSCode](https://code.visualstudio.com)

__Tool__

- [GIT](https://git-scm.com)

## Installation
----

1. Clone this repository:
  ```bash
  git clone https://github.com/your-username/todo-list-js.git
  ```
2. Navigate to the project directory:
  ```bash
  cd todo-list-js
  ```
3. Open the `index.html` file in your browser.

## Usage
----

1. Enter a task in the input field.
2. Click the "Add" button to add it to the list.
3. Delete tasks using the corresponding button.

## Contributions
----

Contributions are welcome! If you want to improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
  ```bash
  git checkout -b feature/new-feature
  ```
3. Make your changes and commit them:
  ```bash
  git commit -m "Add new feature"
  ```
4. Push your changes:
  ```bash
  git push origin feature/new-feature
  ```
5. Open a Pull Request.

## Project Structure
----

```
└── 📁todo-list-js
    └── 📁__tests__
        └── addTodo.test.js
        └── deleteTodo.test.js
        └── example.test.js
    └── 📁_fns
        └── custom_functions.js
    └── 📁coverage
    └── 📁css
        └── index.css
    └── 📁hooks
        └── delete_local_storage.js
        └── save_local_storage.js
    └── 📁js
        └── index.js
    └── 📁modules
        └── add_todo.js
        └── delete_todo.js
    └── 📁utils
        └── debounce.js
    └── .babelrc
    └── .gitignore
    └── index.html
    └── jest.config.js
    └── jest.setup.js
    └── LICENSE
    └── package-lock.json
    └── package.json
    └── README.md
```

## Tests
----

This project includes unit tests located in the `__tests__` folder. The following examples are not part of this project, they are taken as a references to be used in this file:

- **`addTodo.test.js`**: Verifies the functionality of adding tasks.
  ```javascript
  const { addTodo } = require('../src/taskManager');

  test('should add a new task to the list', () => {
    const tasks = [];
    const newTask = 'Buy groceries';
    const updatedTasks = addTodo(tasks, newTask);
    expect(updatedTasks).toContain(newTask);
  });
  ```

- **`deleteTodo.test.js`**: Ensures tasks are correctly removed from the list.
  ```javascript
  const { deleteTodo } = require('../src/taskManager');

  test('should delete a task from the list', () => {
    const tasks = ['Buy groceries', 'Clean the house'];
    const taskToDelete = 'Buy groceries';
    const updatedTasks = deleteTodo(tasks, taskToDelete);
    expect(updatedTasks).not.toContain(taskToDelete);
  });
  ```

To run the tests, use the following command:

```bash
npm test
```

If you installed jest as a *Dev Dependencies* in your project, you can use the following command to run the tests.

```bash
npx jest
```

## License
----

This project is licensed under the MIT License. See the `LICENSE` file for more details.
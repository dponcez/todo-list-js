import {initTodoList} from '../modules/add_todo.js';
import { handleDarkMode } from '../hooks/theme.js';
initTodoList();
handleDarkMode('dark--mode', 'active', '[data-state="dark-mode"]', 'body')
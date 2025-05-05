import { selector } from '../_fns/custom_functions.js';
import { handler } from '../_fns/custom_functions.js';

export const handleDarkMode = (dark, active, state, main) => {
  const htmlRefs = {
    darkModeButton: selector(`${state}`),
    body: selector(`${main}`)
  }

  const { darkModeButton, body } = htmlRefs;

  handler(darkModeButton, 'click', () => {
    body.classList.toggle(`${dark}`);
    darkModeButton.classList.toggle(`${active}`);

    const storage = (key, value) => localStorage.setItem(key, value);
    body.classList.contains('dark--mode') ? 
      storage('theme', 'true') :
      storage('theme', 'false')
  });

  const darkMode = (key, value) => {
    const localTheme = localStorage.getItem(key);

    if(localTheme === value){
      darkModeButton.classList.add(`${active}`);
      body.classList.add(`${dark}`);
    }else{
      darkModeButton.classList.remove(`${active}`);
      body.classList.remove(`${dark}`)
    }
  }

  darkMode('theme', 'true')
}

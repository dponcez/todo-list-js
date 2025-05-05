import { selector } from '../_fns/custom_functions.js';
import { handler } from '../_fns/custom_functions.js';

export const handleDarkMode = (dark, active, state, main) => {
  const htmlRefs = {
    darkModeButton: selector(`${state}`),
    body: selector(`${main}`),
    submitBtn: selector('[data-submit]'),
    trashBtn: selector('.trash--btn')
  }

  const { darkModeButton, body, submitBtn, trashBtn } = htmlRefs;

  handler(darkModeButton, 'click', (event) => {
    const target = event.target;

    target.classList.toggle(`${active}`);
    body.classList.toggle(`${dark}`);

    submitBtn.classList.toggle(`${dark}`);
    trashBtn.classList.toggle(`${dark}`);
  
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

      submitBtn.classList.add(`${dark}`);
      trashBtn.classList.add(`${dark}`);
    }else{
      darkModeButton.classList.remove(`${active}`);
      body.classList.remove(`${dark}`);

      submitBtn.classList.remove(`${dark}`);
      trashBtn.classList.remove(`${dark}`);
    }
  }

  darkMode('theme', 'true')
}

import { selector } from '../_fns/custom_functions.js';
import { handler } from '../_fns/custom_functions.js';

export const handleDarkMode = (dark, active, [state, main]) => {
  const htmlRefs = {
    toggleDark: selector(`${state}`),
    container: selector(`${main}`)
  }

  const { toggleDark, container } = htmlRefs;

  handler(toggleDark, 'click', () => {
    container.classList.toggle(`${dark}`);
    console.log('working')
  })
}

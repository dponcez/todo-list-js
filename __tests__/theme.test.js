const { handleDarkMode } = require('../hooks/theme.js');

describe('handleDarkMode', () => {
  let darkModeButton, body, submitBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="darkModeButton"></button>
      <div id="body"></div>
      <button data-submit></button>
    `;

    darkModeButton = document.getElementById('darkModeButton');
    body = document.getElementById('body');
    submitBtn = document.querySelector('[data-submit]');
  });

  it('should toggle dark mode classes and update localStorage when clicked', () => {
    const darkClass = 'dark--mode';
    const activeClass = 'active';
    const state = '#darkModeButton';
    const main = '#body';

    handleDarkMode(darkClass, activeClass, state, main);

    // Simulate click event
    darkModeButton.click();

    // Check if classes are toggled
    expect(darkModeButton.classList.contains(activeClass)).toBe(true);
    expect(body.classList.contains(darkClass)).toBe(true);
    expect(submitBtn.classList.contains(darkClass)).toBe(true);

    // Check if localStorage is updated
    expect(localStorage.getItem('theme')).toBe('true');

    // Simulate another click event
    darkModeButton.click();

    // Check if classes are toggled back
    expect(darkModeButton.classList.contains(activeClass)).toBe(false);
    expect(body.classList.contains(darkClass)).toBe(false);
    expect(submitBtn.classList.contains(darkClass)).toBe(false);

    // Check if localStorage is updated
    expect(localStorage.getItem('theme')).toBe('false');
  });

  it('should initialize dark mode based on localStorage value', () => {
    const darkClass = 'dark--mode';
    const activeClass = 'active';
    const state = '#darkModeButton';
    const main = '#body';

    // Set localStorage to enable dark mode
    localStorage.setItem('theme', 'true');

    handleDarkMode(darkClass, activeClass, state, main);

    // Check if classes are added based on localStorage
    expect(darkModeButton.classList.contains(activeClass)).toBe(true);
    expect(body.classList.contains(darkClass)).toBe(true);
    expect(submitBtn.classList.contains(darkClass)).toBe(true);

    // Set localStorage to disable dark mode
    localStorage.setItem('theme', 'false');

    handleDarkMode(darkClass, activeClass, state, main);

    // Check if classes are removed based on localStorage
    expect(darkModeButton.classList.contains(activeClass)).toBe(false);
    expect(body.classList.contains(darkClass)).toBe(false);
    expect(submitBtn.classList.contains(darkClass)).toBe(false);
  });
});
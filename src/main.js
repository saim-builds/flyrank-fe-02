import { submitSettings } from './settings.js';
import './styles.css';

const form = document.querySelector('#settings-form');
const nameInput = document.querySelector('#display-name');
const emailInput = document.querySelector('#email');
const saveButton = document.querySelector('#save-button');
const status = document.querySelector('#form-status');
const errorElements = {
  displayName: document.querySelector('#display-name-error'),
  email: document.querySelector('#email-error'),
};

function renderErrors(errors) {
  for (const [field, element] of Object.entries(errorElements)) {
    const message = errors[field] || '';
    element.textContent = message;
    const input = field === 'displayName' ? nameInput : emailInput;
    input.setAttribute('aria-invalid', String(Boolean(message)));
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  saveButton.disabled = true;

  const result = submitSettings({
    displayName: nameInput.value,
    email: emailInput.value,
  });

  renderErrors(result.errors);

  if (result.isValid) {
    nameInput.value = result.values.displayName;
    status.textContent = result.successMessage;
  }

  saveButton.disabled = false;
});
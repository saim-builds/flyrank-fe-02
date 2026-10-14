const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSettings({ displayName = '', email = '' }) {
  const trimmedName = displayName.trim();
  const errors = {};

  if (trimmedName.length < 2) {
    errors.displayName = 'Display name must contain at least 2 characters.';
  }

  if (!email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailPattern.test(email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return {
    errors,
    values: { displayName: trimmedName, email: email.trim() },
    isValid: Object.keys(errors).length === 0,
  };
}

export function submitSettings(values) {
  const result = validateSettings(values);

  return {
    ...result,
    successMessage: result.isValid ? 'Your settings are valid. Changes are ready for this session.' : '',
  };
}
import test from 'node:test';
import assert from 'node:assert/strict';
import { submitSettings, validateSettings } from '../src/settings.js';

test('accepts a valid submission and trims the display name', () => {
  const result = submitSettings({ displayName: '  Ada Lovelace  ', email: 'ada@example.com' });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.values, { displayName: 'Ada Lovelace', email: 'ada@example.com' });
  assert.equal(result.successMessage, 'Your settings are valid. Changes are ready for this session.');
});

test('rejects an empty display name', () => {
  const result = validateSettings({ displayName: '', email: 'ada@example.com' });

  assert.equal(result.errors.displayName, 'Display name must contain at least 2 characters.');
  assert.equal(result.isValid, false);
});

test('rejects a whitespace-only display name', () => {
  const result = validateSettings({ displayName: '   ', email: 'ada@example.com' });

  assert.equal(result.errors.displayName, 'Display name must contain at least 2 characters.');
  assert.equal(result.isValid, false);
});

test('rejects an invalid email', () => {
  const result = validateSettings({ displayName: 'Ada', email: 'not-an-email' });

  assert.equal(result.errors.email, 'Enter a valid email address.');
  assert.equal(result.isValid, false);
});

test('does not return success feedback for an invalid submission', () => {
  const result = submitSettings({ displayName: 'Ada', email: '' });

  assert.equal(result.isValid, false);
  assert.equal(result.successMessage, '');
});
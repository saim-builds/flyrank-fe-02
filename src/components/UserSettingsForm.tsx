import { FormEvent, useMemo, useState } from "react";
import {
  loadSettings,
  saveSettings,
  type UserSettings,
} from "../settingsStorage";
import "./UserSettingsForm.css";

type FieldErrors = {
  name?: string;
  email?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: UserSettings): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function UserSettingsForm() {
  const initial = useMemo(() => loadSettings(), []);
  const [values, setValues] = useState<UserSettings>(initial);
  const [saved, setSaved] = useState<UserSettings>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved">("idle");

  const isDirty =
    values.name !== saved.name ||
    values.email !== saved.email ||
    values.notificationsEnabled !== saved.notificationsEnabled;

  function updateField<K extends keyof UserSettings>(
    field: K,
    value: UserSettings[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setStatus("idle");
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    const nextSettings: UserSettings = {
      name: values.name.trim(),
      email: values.email.trim(),
      notificationsEnabled: values.notificationsEnabled,
    };

    await new Promise((resolve) => setTimeout(resolve, 450));
    saveSettings(nextSettings);
    setValues(nextSettings);
    setSaved(nextSettings);
    setIsSaving(false);
    setStatus("saved");
  }

  return (
    <section className="settings-card" aria-labelledby="settings-title">
      <header className="settings-header">
        <p className="eyebrow">Account</p>
        <h1 id="settings-title">User settings</h1>
        <p className="lede">
          Update your profile details and choose how you want to hear from us.
        </p>
      </header>

      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Full Name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="abc@example.com"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="toggle-row">
          <div>
            <p className="toggle-title" id="notifications-label">
              Email notifications
            </p>
            <p className="toggle-copy" id="notifications-hint">
              Get product updates, reminders, and account alerts.
            </p>
          </div>
          <button
            type="button"
            className={`switch ${values.notificationsEnabled ? "on" : ""}`}
            role="switch"
            aria-checked={values.notificationsEnabled}
            aria-labelledby="notifications-label"
            aria-describedby="notifications-hint"
            onClick={() =>
              updateField("notificationsEnabled", !values.notificationsEnabled)
            }
          >
            <span className="switch-thumb" />
          </button>
        </div>

        <div className="actions">
          <button type="submit" className="save-button" disabled={isSaving || !isDirty}>
            {isSaving ? "Saving…" : "Save changes"}
          </button>
          {status === "saved" ? (
            <p className="success" role="status">
              Settings saved.
            </p>
          ) : isDirty ? (
            <p className="hint">You have unsaved changes.</p>
          ) : (
            <p className="hint">No changes to save.</p>
          )}
        </div>
      </form>
    </section>
  );
}

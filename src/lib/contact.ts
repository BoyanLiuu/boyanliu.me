/**
 * Shared rules for the contact form. Dependency-free and pure on purpose: the client imports it
 * for instant feedback and the Server Action imports the same functions to re-check what arrives,
 * so there is one definition of a valid message and no zod in the client bundle.
 */

export type ContactFields = { name: string; email: string; message: string };
export type ContactFieldName = keyof ContactFields;

export type ContactResult = {
  sent: boolean;
  /** Why the whole send failed (not a field problem). Shown next to the button. */
  note?: string;
  errors?: Partial<Record<ContactFieldName, string>>;
  /** Echoed back so a rejected message keeps what was typed. */
  values?: Partial<ContactFields>;
};

export const limits = {
  name: 80,
  email: 254,
  message: 2000,
  messageMin: 10,
} as const;

/**
 * Hidden input that only a bot fills in. Named so no browser or password-manager autofill
 * heuristic targets it, because a human who tripped it would lose their message.
 */
export const honeypotField = "message-id";

/** Hidden input holding the time the form was mounted, set by the browser after hydration. */
export const startedField = "started-at";

/** Nobody writes a real message in three seconds, so anything faster is automated. */
export const minFillMs = 3000;

const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field errors, keyed by field. An empty object means the message is good to send. */
export const validateContact = (fields: ContactFields) => {
  const errors: Partial<Record<ContactFieldName, string>> = {};
  if (!fields.name) errors.name = "Tell me who you are.";
  else if (fields.name.length > limits.name)
    errors.name = `Keep it under ${limits.name} characters.`;

  if (!fields.email) errors.email = "I need somewhere to reply.";
  else if (fields.email.length > limits.email)
    errors.email = "That address is too long.";
  else if (!emailShape.test(fields.email))
    errors.email = "That doesn’t look like an email address.";

  if (!fields.message) errors.message = "Say a few words about what you need.";
  else if (fields.message.length < limits.messageMin)
    errors.message = "A little more detail would help.";
  else if (fields.message.length > limits.message)
    errors.message = `Keep it under ${limits.message.toLocaleString("en-US")} characters.`;

  return errors;
};

/** The three fields, trimmed, out of a submitted form. */
export const readContactFields = (data: FormData): ContactFields => ({
  name: String(data.get("name") ?? "").trim(),
  email: String(data.get("email") ?? "").trim(),
  message: String(data.get("message") ?? "").trim(),
});

/**
 * The hidden field carries a value, which only an automated client would do. Safe to drop
 * silently: a person cannot see the field, so a person cannot trip this.
 */
export const trippedHoneypot = (data: FormData): boolean =>
  String(data.get(honeypotField) ?? "").length > 0;

/**
 * The form was submitted sooner than a person could have written it. Unlike the honeypot this
 * can catch a real, very fast sender, so it asks them to send again rather than dropping the
 * message. A missing or unusable timestamp is never held against the sender: the form still
 * submits with JavaScript off, and only the browser can set it.
 */
export const submittedTooFast = (data: FormData, now = Date.now()): boolean => {
  const started = Number(data.get(startedField));
  if (!Number.isFinite(started) || started <= 0) return false;
  return now - started < minFillMs;
};

/** `site` is the host the message came from, so the subject reads the same for any deployment. */
export const contactEmailSubject = (fields: ContactFields, site: string) =>
  `${site} — message from ${fields.name}`;

export const contactEmailBody = (fields: ContactFields, sentAt = new Date()) =>
  [
    `From: ${fields.name} <${fields.email}>`,
    `Sent: ${sentAt.toISOString()}`,
    "",
    fields.message,
  ].join("\n");

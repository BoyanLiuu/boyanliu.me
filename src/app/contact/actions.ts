"use server";

import { siteConfig } from "@/config/site";
import {
  type ContactResult,
  contactEmailBody,
  contactEmailSubject,
  readContactFields,
  submittedTooFast,
  trippedHoneypot,
  validateContact,
} from "@/lib/contact";

const resendEndpoint = "https://api.resend.com/emails";

/** A failed send always hands back a way through, so the visitor is never left at a dead end. */
const undeliverable = `That didn’t send — please email me directly at ${siteConfig.author.email}.`;

/**
 * Deliberately public: this is a contact form on a public site, so there is no caller to
 * authenticate. What it does guard is the inbox behind it — a hidden-field and timing check for
 * bots, the same validation the browser ran, and a hard stop when the credentials are missing.
 */
export const sendContactMessage = async (
  _previous: ContactResult,
  data: FormData,
): Promise<ContactResult> => {
  // A bot is told nothing: reporting success teaches it less than reporting a block.
  if (trippedHoneypot(data)) return { sent: true };

  const fields = readContactFields(data);
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0)
    return { sent: false, errors, values: fields };

  // Checked after the fields so a fast sender sees one clear thing to do, not two.
  if (submittedTooFast(data))
    return {
      sent: false,
      note: "That came in faster than a person usually types — press send once more.",
      values: fields,
    };

  const subject = contactEmailSubject(fields, new URL(siteConfig.url).host);

  // Purpose-named opt-in so tests can exercise the form without sending. Off unless set to "1".
  if (process.env.CONTACT_DRY_RUN === "1") {
    console.info(`Contact form dry run, nothing sent: ${subject}`);
    return { sent: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    // Fail closed: never report a message as sent when it was not.
    console.error(
      "Contact form: RESEND_API_KEY or CONTACT_FROM_EMAIL is missing, so nothing was sent.",
    );
    return { sent: false, note: undeliverable, values: fields };
  }

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [siteConfig.author.email],
        // Replying in the mail client goes to the visitor, not to the form's own address.
        reply_to: fields.email,
        subject,
        text: contactEmailBody(fields),
      }),
    });
    if (!response.ok) {
      console.error(
        `Contact form: Resend returned ${response.status}: ${await response.text()}`,
      );
      return { sent: false, note: undeliverable, values: fields };
    }
  } catch (error) {
    console.error("Contact form: the send failed.", error);
    return { sent: false, note: undeliverable, values: fields };
  }

  return { sent: true };
};

"use client";

import { PaperPlaneTiltIcon } from "@phosphor-icons/react/ssr";
import {
  type ReactNode,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { sendContactMessage } from "@/app/contact/actions";
import { Mark } from "@/components/swiss/layout";
import { PillButton } from "@/components/ui/pill";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import {
  type ContactFieldName,
  type ContactResult,
  honeypotField,
  limits,
  readContactFields,
  startedField,
  validateContact,
} from "@/lib/contact";

const unsent: ContactResult = { sent: false };

const unreachable = `That didn’t send — check your connection, or email me directly at ${siteConfig.author.email}.`;

/**
 * What a click on "Send message" sets off. The browser never talks to Resend: the API key would
 * be readable by anyone, so only the Server Action ever sees it.
 *
 *   Browser ──POST /contact──► your Vercel function ──POST api.resend.com──► Resend
 *                                                                              │
 *                                                             delivers to your Gmail
 *
 * Checks the fields in the browser first so mistakes do not cost a round trip, then hands the
 * form to the Server Action, which repeats every check on what actually arrives. A request that
 * never lands is caught here: letting it reject would tear the form down and lose the message.
 */
const send = async (
  previous: ContactResult,
  data: FormData,
): Promise<ContactResult> => {
  const values = readContactFields(data);
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) return { sent: false, errors, values };
  try {
    return await sendContactMessage(previous, data);
  } catch {
    return { sent: false, note: unreachable, values };
  }
};

const fieldClasses =
  "w-full rounded-sm border border-rule bg-paper px-4 py-3 text-body text-ink transition-colors duration-200 placeholder:text-muted hover:border-muted aria-[invalid=true]:border-accent";

const cardClasses = "rounded-card border border-rule bg-wash p-6 md:p-10";

/** A labelled field with its error message underneath. */
const Field = ({
  name,
  label,
  hint,
  error,
  children,
  className,
}: {
  name: ContactFieldName;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <label
      htmlFor={name}
      className="flex items-baseline gap-2 text-label font-medium text-muted"
    >
      {label}
      {hint ? <span className="text-muted/70">{hint}</span> : null}
    </label>
    {children}
    {error ? (
      <p id={`${name}-error`} className="text-small font-medium text-accent">
        {error}
      </p>
    ) : null}
  </div>
);

const Form = ({
  onClear,
  className,
}: {
  onClear: () => void;
  className?: string;
}) => {
  const [state, submit, pending] = useActionState(send, unsent);
  const startedAt = useRef<HTMLInputElement>(null);

  // Set after hydration, not during render: the page is prerendered, so build time is not a
  // start time, and a server-rendered clock would mismatch the client's. It goes in
  // defaultValue as well, so React's post-submit form reset keeps it for a retry.
  useEffect(() => {
    const field = startedAt.current;
    if (!field) return;
    field.defaultValue = String(Date.now());
    field.value = field.defaultValue;
  }, []);

  if (state.sent)
    return (
      <div className={cn(cardClasses, "enter-up text-center", className)}>
        <p className="font-display text-h2 font-bold">
          Message sent
          <Mark />
        </p>
        <p className="mx-auto mt-3 max-w-[40ch] text-body text-muted">
          Thanks for writing. I read everything that lands here and usually
          reply within a couple of days.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-7 inline-flex h-11 cursor-pointer items-center rounded-full border border-rule px-5 text-small font-semibold transition-[background-color,border-color,translate] duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-ink hover:bg-paper"
        >
          Send another
        </button>
      </div>
    );

  return (
    <form action={submit} noValidate className={cn(cardClasses, className)}>
      {/* Spam checks, both ignored by people: a field only a bot fills, and when the form opened. */}
      <input
        type="text"
        name={honeypotField}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
      <input ref={startedAt} type="hidden" name={startedField} />
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Field name="name" label="Your name" error={state.errors?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={limits.name}
            defaultValue={state.values?.name}
            placeholder="Ada Lovelace"
            aria-invalid={Boolean(state.errors?.name)}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={fieldClasses}
          />
        </Field>
        <Field name="email" label="Email" error={state.errors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={limits.email}
            defaultValue={state.values?.email}
            placeholder="ada@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={fieldClasses}
          />
        </Field>
        <Field
          name="message"
          label="Message"
          error={state.errors?.message}
          className="md:col-span-2"
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            maxLength={limits.message}
            defaultValue={state.values?.message}
            placeholder="What are you working on, and how can I help?"
            aria-invalid={Boolean(state.errors?.message)}
            aria-describedby={
              state.errors?.message ? "message-error" : undefined
            }
            className={cn(fieldClasses, "resize-y")}
          />
        </Field>
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <PillButton
          pending={pending}
          icon={<PaperPlaneTiltIcon size={18} weight="bold" />}
        >
          {pending ? "Sending…" : "Send message"}
        </PillButton>
        <p aria-live="polite" className="text-small text-muted">
          {state.note ?? "I’ll only use your address to reply."}
        </p>
      </div>
    </form>
  );
};

/** Name, email and message on a workbench-grey card. "Send another" remounts it empty. */
export const ContactForm = ({ className }: { className?: string }) => {
  const [round, setRound] = useState(0);
  return (
    <Form
      key={round}
      className={className}
      onClear={() => setRound((n) => n + 1)}
    />
  );
};

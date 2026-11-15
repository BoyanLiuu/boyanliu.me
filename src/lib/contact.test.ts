import { describe, expect, it } from "vitest";
import {
  type ContactFields,
  contactEmailBody,
  contactEmailSubject,
  honeypotField,
  limits,
  minFillMs,
  readContactFields,
  startedField,
  submittedTooFast,
  trippedHoneypot,
  validateContact,
} from "./contact";

const good: ContactFields = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to talk about a frontend role on our platform team.",
};

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
};

describe("validateContact", () => {
  it("accepts a filled-in message", () => {
    expect(validateContact(good)).toEqual({});
  });

  it("requires all three fields", () => {
    expect(validateContact({ name: "", email: "", message: "" })).toMatchObject(
      {
        name: expect.any(String),
        email: expect.any(String),
        message: expect.any(String),
      },
    );
  });

  it("rejects addresses without a domain or a dot", () => {
    for (const email of ["ada", "ada@example", "ada @example.com", "@x.com"])
      expect(validateContact({ ...good, email }).email).toBeTruthy();
  });

  it("rejects a message that is too short or too long", () => {
    expect(validateContact({ ...good, message: "hi" }).message).toBeTruthy();
    expect(
      validateContact({ ...good, message: "x".repeat(limits.message + 1) })
        .message,
    ).toBeTruthy();
  });

  it("rejects an over-long name", () => {
    expect(
      validateContact({ ...good, name: "x".repeat(limits.name + 1) }).name,
    ).toBeTruthy();
  });
});

describe("readContactFields", () => {
  it("trims each field and defaults missing ones to empty", () => {
    expect(readContactFields(form({ name: "  Ada  " }))).toEqual({
      name: "Ada",
      email: "",
      message: "",
    });
  });
});

describe("trippedHoneypot", () => {
  it("catches anything that filled the hidden field", () => {
    expect(
      trippedHoneypot(form({ [honeypotField]: "https://spam.example" })),
    ).toBe(true);
  });

  it("leaves an ordinary submission alone", () => {
    expect(trippedHoneypot(form({ name: "Ada" }))).toBe(false);
    expect(trippedHoneypot(form({ [honeypotField]: "" }))).toBe(false);
  });
});

describe("submittedTooFast", () => {
  const started = 1_000_000;

  it("passes a person who took their time", () => {
    expect(
      submittedTooFast(
        form({ [startedField]: String(started) }),
        started + minFillMs + 1,
      ),
    ).toBe(false);
  });

  it("catches a submission faster than a person could type", () => {
    expect(
      submittedTooFast(
        form({ [startedField]: String(started) }),
        started + 100,
      ),
    ).toBe(true);
  });

  it("does not punish a missing or unusable timestamp, so the form still works without JavaScript", () => {
    expect(submittedTooFast(form({}))).toBe(false);
    expect(submittedTooFast(form({ [startedField]: "not-a-number" }))).toBe(
      false,
    );
  });
});

describe("the email it builds", () => {
  it("names the sender in the subject and the host it came from", () => {
    expect(contactEmailSubject(good, "boyanliu.me")).toBe(
      "boyanliu.me — message from Ada Lovelace",
    );
  });

  it("keeps the reply address and the message in the body", () => {
    const body = contactEmailBody(good, new Date("2026-11-14T12:00:00Z"));
    expect(body).toContain("ada@example.com");
    expect(body).toContain(good.message);
    expect(body).toContain("2026-11-14T12:00:00.000Z");
  });
});

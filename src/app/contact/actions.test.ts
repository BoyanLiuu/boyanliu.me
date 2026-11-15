import { afterEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/config/site";
import { honeypotField, minFillMs, startedField } from "@/lib/contact";
import { sendContactMessage } from "./actions";

const message = (overrides: Record<string, string> = {}) => {
  const data = new FormData();
  const fields = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "I would like to talk about a frontend role on our team.",
    ...overrides,
  };
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
};

const unsent = { sent: false };

/** Replaces fetch and reports what the action tried to send. */
const stubResend = (response: Partial<Response> = { ok: true }) => {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    text: async () => "",
    ...response,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("sendContactMessage", () => {
  it("refuses to send, and says so, when the credentials are missing", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_FROM_EMAIL", "");
    vi.stubEnv("CONTACT_DRY_RUN", "");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await sendContactMessage(unsent, message());

    expect(result.sent).toBe(false);
    expect(result.note).toContain(siteConfig.author.email);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("keeps what was typed when a field is wrong, and sends nothing", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");

    const result = await sendContactMessage(
      unsent,
      message({ email: "not-an-address" }),
    );

    expect(result.sent).toBe(false);
    expect(result.errors?.email).toBeTruthy();
    expect(result.values?.name).toBe("Ada Lovelace");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("drops a submission that tripped the bot check without telling it why", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");

    const result = await sendContactMessage(
      unsent,
      message({ [honeypotField]: "https://spam.example" }),
    );

    expect(result).toEqual({ sent: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends nothing on a dry run", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("CONTACT_DRY_RUN", "1");
    vi.spyOn(console, "info").mockImplementation(() => {});

    expect(await sendContactMessage(unsent, message())).toEqual({ sent: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to Resend, addressed to me and replying to the visitor", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "Contact <contact@example.com>");
    vi.stubEnv("CONTACT_DRY_RUN", "");

    expect(await sendContactMessage(unsent, message())).toEqual({ sent: true });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual([siteConfig.author.email]);
    expect(body.reply_to).toBe("ada@example.com");
    expect(body.from).toBe("Contact <contact@example.com>");
    expect(body.subject).toContain("Ada Lovelace");
    expect(body.text).toContain("frontend role");
  });

  it("reports a failure when Resend rejects the message", async () => {
    stubResend({ ok: false, status: 422, text: async () => "bad domain" });
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    vi.stubEnv("CONTACT_DRY_RUN", "");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await sendContactMessage(unsent, message());

    expect(result.sent).toBe(false);
    expect(result.note).toContain(siteConfig.author.email);
    expect(result.values?.email).toBe("ada@example.com");
  });

  it("asks a very fast sender to try again instead of dropping the message", async () => {
    const fetchMock = stubResend();
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    vi.stubEnv("CONTACT_DRY_RUN", "");

    const result = await sendContactMessage(
      unsent,
      message({ [startedField]: String(Date.now() - minFillMs + 500) }),
    );

    expect(result.sent).toBe(false);
    expect(result.note).toMatch(/send once more/);
    expect(result.values?.message).toContain("frontend role");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a failure when the request itself throws", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down")),
    );
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_FROM_EMAIL", "contact@example.com");
    vi.stubEnv("CONTACT_DRY_RUN", "");
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect((await sendContactMessage(unsent, message())).sent).toBe(false);
  });
});

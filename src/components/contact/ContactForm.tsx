"use client";

import React, { useState } from "react";
import { validateContactPayload } from "@/lib/validation";

export function ContactForm({ isConfigured }: { isConfigured: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverFeedback, setServerFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerFeedback("");

    const validation = validateContactPayload({ name, email, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    if (!isConfigured) {
      setStatus("error");
      setServerFeedback(
        "Template placeholder mode: Contact delivery is not yet configured on the server. Set CONTACT_PROVIDER_API_KEY and CONTACT_TO_EMAIL to enable live submissions."
      );
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const data = await res.json();

      if (!res.ok || !data.accepted) {
        setStatus("error");
        setServerFeedback(
          data.error ||
            "Your message could not be delivered. Please try again later."
        );
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setServerFeedback("Network error while sending message.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6 rounded-lg border border-[var(--border)] bg-[var(--surface)]/40 p-6 sm:p-8"
    >
      {!isConfigured && (
        <div
          role="note"
          className="rounded border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 text-xs leading-relaxed text-[var(--muted)]"
        >
          <strong className="font-medium text-[var(--foreground)]">
            [CONTACT DELIVERY PLACEHOLDER]:
          </strong>{" "}
          This form validates inputs accessibly, but will not claim to send
          messages until a backend email provider is configured in environment
          variables.
        </div>
      )}

      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-medium tracking-[0.14em] uppercase text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder="[YOUR NAME]"
          className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        />
        {errors.name && (
          <p
            id="contact-name-error"
            role="alert"
            className="mt-1.5 text-xs text-[var(--foreground)]"
          >
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-medium tracking-[0.14em] uppercase text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder="[YOUR EMAIL]"
          className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        />
        {errors.email && (
          <p
            id="contact-email-error"
            role="alert"
            className="mt-1.5 text-xs text-[var(--foreground)]"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-medium tracking-[0.14em] uppercase text-[var(--foreground)]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          placeholder="[YOUR MESSAGE]"
          className="mt-2 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        />
        {errors.message && (
          <p
            id="contact-message-error"
            role="alert"
            className="mt-1.5 text-xs text-[var(--foreground)]"
          >
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-[var(--foreground)] px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase text-[var(--background)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p
          role="status"
          className="rounded border border-[var(--border)] bg-[var(--background)] p-3 text-xs text-[var(--foreground)]"
        >
          Thank you — your message was accepted by the delivery service.
        </p>
      )}

      {status === "error" && serverFeedback && (
        <p
          role="alert"
          className="rounded border border-[var(--border)] bg-[var(--background)] p-3 text-xs text-[var(--muted)]"
        >
          {serverFeedback}
        </p>
      )}
    </form>
  );
}

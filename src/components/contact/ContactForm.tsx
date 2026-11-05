"use client";

import React, { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { CloseIcon } from "./ContactIcons";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type FormField = "name" | "email" | "message";

export function ContactForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "idle" || status === "error") {
      nameInputRef.current?.focus();
    } else if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  const validate = (data: typeof formData): FormErrors => {
    const errs: FormErrors = {};

    const name = data.name.trim();
    if (!name) {
      errs.name = "Name is required.";
    } else if (name.length > 80) {
      errs.name = "Name must be 80 characters or fewer.";
    }

    const email = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errs.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      errs.email = "Please enter a valid email address.";
    }

    const message = data.message.trim();
    if (!message) {
      errs.message = "Message is required.";
    } else if (message.length < 10) {
      errs.message = "Message must be at least 10 characters.";
    } else if (message.length > 2000) {
      errs.message = "Message must be 2000 characters or fewer.";
    }

    return errs;
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: currentErrors[field] }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name in touched) {
      const nextData = {
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      };
      const currentErrors = validate(nextData);
      setErrors((prev) => ({
        ...prev,
        [name]: currentErrors[name as FormField],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: silently abort if botcheck is checked
    if (formData.botcheck) {
      setStatus("success");
      return;
    }

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: siteConfig.contactForm.subject,
          from_name: "Portfolio contact form",
          botcheck: formData.botcheck,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || siteConfig.contactForm.errorMessage
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(siteConfig.contactForm.errorMessage);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
      botcheck: false,
    });
    setTouched({});
    setErrors({});
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 border-b border-(--border)/80 pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-(--muted)">
            {siteConfig.contactForm.eyebrow}
          </p>
          <h2
            id="contact-panel-title"
            className="mt-1 text-[28px] font-semibold tracking-tight leading-tight text-(--foreground)"
          >
            {siteConfig.contactForm.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-(--border) text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Body */}
      {status === "success" ? (
        <div className="my-auto flex flex-col items-start py-8">
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-2xl font-semibold tracking-tight text-(--foreground) focus:outline-none"
          >
            {siteConfig.contactForm.successTitle}
          </h3>
          <p className="mt-2 text-base leading-relaxed text-(--muted)">
            {siteConfig.contactForm.successBody}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleReset}
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-(--border) bg-(--surface)/40 px-6 text-sm font-medium text-(--foreground) transition-colors hover:bg-(--surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              Send another
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-(--foreground) px-6 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground)"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-6 flex flex-1 flex-col justify-between gap-5"
        >
          {/* Honeypot field for bot protection */}
          <input
            type="checkbox"
            name="botcheck"
            checked={formData.botcheck}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
          />

          <div className="flex flex-col gap-4.5">
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="block font-mono text-[11px] uppercase tracking-wider text-(--muted)"
              >
                Name
              </label>
              <input
                ref={nameInputRef}
                type="text"
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                readOnly={status === "submitting"}
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder={siteConfig.contactForm.placeholders.name}
                aria-invalid={touched.name && Boolean(errors.name)}
                aria-describedby={
                  touched.name && errors.name ? "name-error" : undefined
                }
                className="mt-1.5 h-12 w-full rounded-[10px] border border-(--border) bg-(--background) px-3.5 text-[15px] text-(--foreground) placeholder:text-(--muted)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) read-only:opacity-60"
              />
              {touched.name && errors.name && (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-(--foreground) font-medium"
                >
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="block font-mono text-[11px] uppercase tracking-wider text-(--muted)"
              >
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                autoComplete="email"
                required
                readOnly={status === "submitting"}
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder={siteConfig.contactForm.placeholders.email}
                aria-invalid={touched.email && Boolean(errors.email)}
                aria-describedby={
                  touched.email && errors.email ? "email-error" : undefined
                }
                className="mt-1.5 h-12 w-full rounded-[10px] border border-(--border) bg-(--background) px-3.5 text-[15px] text-(--foreground) placeholder:text-(--muted)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) read-only:opacity-60"
              />
              {touched.email && errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-(--foreground) font-medium"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="block font-mono text-[11px] uppercase tracking-wider text-(--muted)"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={7}
                required
                readOnly={status === "submitting"}
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur("message")}
                placeholder={siteConfig.contactForm.placeholders.message}
                aria-invalid={touched.message && Boolean(errors.message)}
                aria-describedby={
                  touched.message && errors.message
                    ? "message-error"
                    : undefined
                }
                className="mt-1.5 w-full resize-y rounded-[10px] border border-(--border) bg-(--background) p-3.5 text-[15px] leading-relaxed text-(--foreground) placeholder:text-(--muted)/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) read-only:opacity-60"
              />
              {touched.message && errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1.5 font-mono text-xs text-(--foreground) font-medium"
                >
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {/* Error banner */}
          {status === "error" && (
            <div
              role="alert"
              className="rounded-xl border border-(--border) bg-(--surface) p-3.5 text-xs text-(--foreground)"
            >
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex min-h-[52px] w-full items-center justify-center rounded-full bg-(--foreground) px-7 text-sm font-medium text-(--background) transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--foreground) disabled:opacity-50"
            >
              {status === "submitting"
                ? siteConfig.contactForm.submittingLabel
                : `${siteConfig.contactForm.submitLabel} →`}
            </button>
            <p className="mt-3 text-center text-[13px] text-(--muted)">
              {siteConfig.contactForm.helperText}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}

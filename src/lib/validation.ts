export function isValidExternalUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export type ContactFormPayload = {
  name: string;
  email: string;
  message: string;
};

export function validateContactPayload(
  input: Partial<ContactFormPayload>
): { valid: true; data: ContactFormPayload } | { valid: false; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const message = (input.message ?? "").trim();

  if (!name || name.length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message || message.length < 10) {
    errors.message = "Please enter a message of at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, email, message },
  };
}

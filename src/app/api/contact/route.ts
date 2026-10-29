import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateContactPayload(body);

    if (!validation.valid) {
      return NextResponse.json(
        { accepted: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const apiKey = process.env.CONTACT_PROVIDER_API_KEY?.trim();
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        {
          accepted: false,
          error:
            "Contact delivery is not configured on the server yet. Configure CONTACT_PROVIDER_API_KEY and CONTACT_TO_EMAIL.",
        },
        { status: 503 }
      );
    }

    // Until an email provider endpoint is wired to CONTACT_PROVIDER_API_KEY,
    // never falsely report a message as sent.
    return NextResponse.json(
      {
        accepted: false,
        error:
          "Email provider integration pending configuration in src/app/api/contact/route.ts.",
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { accepted: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }
}

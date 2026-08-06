/**
 * Typed client wrapper for an email OTP verification backend.
 *
 * This client expects a backend (e.g. a Cloud Function, serverless API, or
 * any HTTP server you own) that exposes:
 *   POST /send-verification-code  — generate & email a 6-digit OTP
 *   POST /verify-code             — validate the submitted OTP
 *
 * Set NEXT_PUBLIC_VERIFICATION_API_URL in your .env.local, e.g.:
 *   Local:  http://localhost:8080
 *   Prod:   https://your-backend.example.com/api
 *
 * If you don't have this backend, email verification (used by the Blog
 * Generator flow) will not work until you point this at your own service.
 */
const BASE_URL = process.env.NEXT_PUBLIC_VERIFICATION_API_URL?.replace(/\/$/, '') ?? '';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'example.com';

interface ApiResponse {
  ok: boolean;
  msg?: string;
}

/**
 * Triggers a 6-digit verification code to be emailed to the given address.
 * The code is NEVER returned — it only travels via email.
 */
export async function sendVerificationCode(
  email: string,
  name?: string,
): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/send-verification-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, domain: DOMAIN, name: name ?? 'hacker' }),
  });
  return res.json() as Promise<ApiResponse>;
}

/**
 * Validates the 6-digit code the user typed against the stored record.
 * Returns { ok: true } on success.
 */
export async function verifyCode(
  email: string,
  code: string,
): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/verify-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, domain: DOMAIN, code }),
  });
  return res.json() as Promise<ApiResponse>;
}

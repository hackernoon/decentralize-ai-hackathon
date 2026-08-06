/**
 * Typed client wrapper for the "blog draft generator" backend endpoint.
 *
 * This client expects a backend (e.g. a Cloud Function, serverless API, or
 * any HTTP server you own) that exposes:
 *   POST /create-draft  — validates an OTP, generates blog content (e.g. via
 *                         an LLM), creates/finds a user, saves a draft, and
 *                         returns a login/draft URL.
 *
 * Set NEXT_PUBLIC_DECENTRALIZE_API_URL in your .env.local, e.g.:
 *   Local:  http://localhost:8088
 *   Prod:   https://your-backend.example.com/api
 *
 * If you don't have this backend, the Blog Generator page (`/blog-generator`)
 * will not work until you either point this at your own service or replace
 * that page's logic entirely.
 */
const BASE_URL = process.env.NEXT_PUBLIC_DECENTRALIZE_API_URL?.replace(/\/$/, '') ?? '';

export interface CreateDraftPayload {
  email: string;
  verificationCode: string;
  topic: string;
  customTopic: string;
  problem: string;
  uniquePerspective: string;
  practicalApproach: string;
  readerRelevance: string;
  futureVision: string;
  model: string;
}

export interface CreateDraftResponse {
  ok: boolean;
  draftId?: string;
  /** Direct URL to the created draft on your publishing platform, e.g. https://your-platform.example.com/articles/{draftId} */
  draftUrl?: string;
  /** Optional login+redirect URL if your platform requires auth before viewing the draft */
  loginUrl?: string;
  msg?: string;
}

/**
 * Calls the /create-draft backend endpoint.
 * On success returns { ok: true, draftId, draftUrl?, loginUrl? }.
 *
 * The caller (see app/blog-generator/page.tsx) will open `loginUrl` if present,
 * otherwise `draftUrl`, otherwise it falls back to
 * `${NEXT_PUBLIC_PUBLISHING_PLATFORM_URL}/articles/{draftId}`. If none of
 * those resolve to a URL, the UI shows a placeholder message instead of a
 * broken link — configure one of these so participants land on their draft.
 */
export async function createDraft(
  payload: CreateDraftPayload,
): Promise<CreateDraftResponse> {
  const res = await fetch(`${BASE_URL}/create-draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<CreateDraftResponse>;
}

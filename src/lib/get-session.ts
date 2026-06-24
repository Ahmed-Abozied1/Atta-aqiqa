import { headers, cookies } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;

const _cache = new Map<string, { data: SessionResult; expiresAt: number }>();
const CACHE_TTL = 30_000;

export const getServerSession = cache(async (): Promise<SessionResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("better-auth.session_token")?.value;

  if (token) {
    const cached = _cache.get(token);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.data;
    }
  }

  const session = await auth.api.getSession({ headers: await headers() });

  if (token && session) {
    _cache.set(token, { data: session, expiresAt: Date.now() + CACHE_TTL });

    if (_cache.size > 500) {
      const now = Date.now();
      for (const [k, v] of _cache) {
        if (v.expiresAt < now) _cache.delete(k);
      }
    }
  }

  return session;
});

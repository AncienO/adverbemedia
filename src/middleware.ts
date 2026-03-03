import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

// ─── Upstash Redis client ────────────────────────────────────────────────────
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ─── Strict limiter — protects contact, newsletter, and signup endpoints ─────
// 5 requests per minute to prevent form-submission spam and abuse.
const strictLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'rl:strict',
});

// ─── Auth limiter — protects auth, login, and admin paths ───────────────────
// 10 requests per minute to slow down brute-force and credential stuffing.
const authLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    prefix: 'rl:auth',
});

// ─── General API limiter — protects all other /api/ routes ──────────────────
// 60 requests per minute as a broad safeguard against API abuse.
const apiLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '1 m'),
    prefix: 'rl:api',
});

// ─── Helper: resolve the client IP ──────────────────────────────────────────
function getClientIp(request: NextRequest): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        'anonymous'
    );
}

// ─── Helper: build a 429 Too Many Requests response ─────────────────────────
function rateLimitedResponse(limit: number, remaining: number, reset: number): NextResponse {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
            status: 429,
            headers: {
                'Retry-After': String(retryAfter > 0 ? retryAfter : 1),
                'X-RateLimit-Limit': String(limit),
                'X-RateLimit-Remaining': String(remaining),
            },
        }
    );
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const ip = getClientIp(request);

    try {
        // ── Strict paths: /contact, /newsletter, /signup ─────────────────────
        if (/\/(contact|newsletter|signup)/.test(pathname)) {
            const { success, limit, remaining, reset } = await strictLimiter.limit(ip);
            if (!success) return rateLimitedResponse(limit, remaining, reset);
        }

        // ── Auth paths: /auth, /login, /admin ────────────────────────────────
        else if (/\/(auth|login|admin)/.test(pathname)) {
            const { success, limit, remaining, reset } = await authLimiter.limit(ip);
            if (!success) return rateLimitedResponse(limit, remaining, reset);
        }

        // ── General API paths: any /api/ route ───────────────────────────────
        else if (pathname.startsWith('/api/')) {
            const { success, limit, remaining, reset } = await apiLimiter.limit(ip);
            if (!success) return rateLimitedResponse(limit, remaining, reset);
        }

    } catch (error) {
        // If Upstash is unreachable or throws, fail open and continue normally
        console.error('Rate limiting error — failing open:', error);
    }

    // Always fall through to session refresh regardless of rate limit outcome
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};

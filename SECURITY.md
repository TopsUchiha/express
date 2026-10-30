# Frontend security notes

## What is enforced now
- **Content-Security-Policy** is set per request in `proxy.ts` with a fresh nonce. Only nonced scripts run, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri` and `form-action` are locked to self. Pages render per request so the nonce reaches every script (`await connection()` in `app/layout.tsx`).
- **Headers** (`next.config.mjs`): HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP. `X-Powered-By` is off.
- **XSS**: no `dangerouslySetInnerHTML`, `innerHTML` or `eval` anywhere. User input is only ever rendered as React text. Tracking input is trimmed, upper-cased and length-capped.
- **Dependencies**: Next.js 16.4.3 (fixes the 16.4.0 RCE advisories). The `shadcn` CLI is a dev dependency only.
- **Mapbox**: only a public `pk.` token is accepted in the browser. Restrict that token to your domain in the Mapbox dashboard.
- **Type checking** is on during builds (`ignoreBuildErrors` removed).

## Backend (added)
- **CSRF**: every cookie-authenticated POST (chat, contact) must carry a matching `Origin` or `Sec-Fetch-Site: same-origin`, otherwise it is refused. Cookies are `SameSite=Lax`, `HttpOnly`, `Secure`, `__Host-` prefixed. Admin actions are Next.js Server Actions, which check the origin themselves.
- **Chat access**: tracking number + the email on file, one generic failure message, lockout per tracking number and per IP, random 32-byte session token stored only as a hash, 24 h expiry. Text only, 1,000 characters, rate limited, no uploads.
- **Admin**: the sign-in form lives at the secret URL itself. Every page under it, and the real `/admin` paths, return the same plain 404 as any unknown address unless you hold a valid session, with no redirects. bcrypt passwords, sessions stored server-side (sign out revokes them), login lockout, no-store and noindex headers.
- **Rate limits** live in Postgres, so they work across serverless instances.
- **Data**: parameterised SQL only. The public tracking API never returns names, emails or addresses. Emails never contain message text.

## Recommended next
- Two-factor sign-in for admins (TOTP).
- Message retention (delete old chats after a set time).
- A Captcha such as Cloudflare Turnstile on the chat start if you ever see abuse.

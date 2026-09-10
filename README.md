# Rozgaar Cooperative Portal

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. You'll land on `/login`.

## How the pieces connect

1. **`/login`** (`auth/pages/SignIn.jsx`, wired via `auth/routes/SignInRoute.jsx`)
   Pick Society Admin or Federation Admin, enter a mobile number, hit
   Send OTP. This calls `AuthContext.startSignIn()` and navigates to
   `/verify-otp`.

2. **`/verify-otp`** (`auth/pages/VerifyOtp.jsx`, wired via
   `auth/routes/VerifyOtpRoute.jsx`)
   Enter the 6-digit code. On success, `AuthContext.completeSignIn()`
   stores the session (role + phone) in `localStorage` and the user is
   redirected to `/federation` or `/society` based on the role they
   picked.

3. **`/federation/*`** and **`/society/*`**
   Each is guarded by `<ProtectedRoute role="...">` — visiting either
   without being signed in (or signed in as the wrong role) redirects
   back to `/login`. Inside, `FederationLayout` / `SocietyLayout` render
   the shared Sidebar + TopBar once, with the matching page rendered
   into an `<Outlet />` based on the URL. Every sidebar link now points
   to a real route; sections not built yet show a `PlaceholderPage`
   instead of doing nothing.

## Where to hook up a real backend

Search for `TODO` comments — there are three:
- `auth/routes/SignInRoute.jsx` — send OTP
- `auth/routes/VerifyOtpRoute.jsx` — verify OTP, and resend OTP

Everything else (dashboard numbers, tables, charts) is driven by the
`mockData.js` files inside `federation/data/` and `society/data/` —
replace those with real API calls whenever the backend is ready.

## Not yet built

- `federation/pages/*` and `society/pages/*` beyond the dashboard are
  placeholders (`PlaceholderPage`) — build these out section by
  section using the same design system.
- `auth/AuthFlow.jsx` from an earlier pass is now superseded by real
  routing (`SignInRoute` / `VerifyOtpRoute` / `App.jsx`) — safe to
  delete if you copied it in earlier.

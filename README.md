# Portfolio Web App

Personal portfolio web application built with **Next.js App Router** and **Supabase**.

## Project Goals

This project focuses on moving away from a static, hard-coded portfolio and building a dynamic system where content is managed through a custom internal dashboard. This allows a clear separation between data and presentation, while keeping the overall architecture minimal.

Another goal was to keep the site as accessible as possible, following the principles of [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) and [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).

This project prioritizes **data flow over abstraction**. Architectural decisions, from using the App Router to accessing the database directly, were made to keep the system fast, maintainable, and easy to deploy.

## Tech Stack

- **Language**: JavaScript
- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS v3
- **Database / Storage**: Supabase (PostgreSQL + Storage)
- **Deployment**: Vercel

## Project Architecture

The app lives in a single codebase and handles both public and internal admin dashboard.

### Public Pages

- Uses **Next.js Server Components** to fetch data directly from Supabase, reducing client-side JavaScript and improving SEO
- Responsive image handling via Supabase Storage and `next/image` optimization
- Bilingual support (EN/KO) using cookie-based language switching with server-side resolution
- Dynamic Open Graph metadata and SEO generated per page

### Internal Admin Dashboard

- Used for managing portfolio content and assets
- Built as **part of the same app** rather than as a separate service, to keep the codebase simple and maintainable
- Admin server-side logic is kept separate for security purposes
- Access is restricted to an allowlist of Google accounts, verified server-side
- Admin authentication uses Google sign-in through Supabase Auth, with an optional password login for local development

### Security

- Admin access requires a Google account whose verified email is on a server-side allowlist
- Authorization is enforced both in middleware and inside every admin API route
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) applied to all routes
- Admin routes receive additional protections (X-Frame-Options: DENY)
- HTTP-only cookies with Secure and SameSite flags
- Constant-time password comparison for the optional local password login

## Testing

Unit tests are written using [Jest](https://jestjs.io/). The unit tests focus on the logic validation and state transitions rather than covering the entire codebase and visual rendering.

The project includes unit tests to cover:

- Admin authentication and authorization (email allowlist, verified session checks, token verification)
- Admin API routes (POST, PUT, PATCH, DELETE)
- Error handling paths (400, 403, 404, 500)
- Supabase interaction logic with controlled mock chains

## Technical Notes

- Utilized Next.js **Server Components** instead of a separate REST API layer for internal data access
- Admin-level write and storage operations run server-side using the **Supabase Service Role**
- Shared server-side utilities are extracted where they can be reused
- Detailed contents are written in **Markdown** and rendered using `react-markdown` to improve the content editing and display experience

## Admin Access

The admin dashboard is protected by Google OAuth via Supabase Auth.
Make sure to set the environment variable(s) to let the login work.

### How to set up admin access locally

**Google Cloud setup**

Create an OAuth 2.0 Web application client in the [Google Cloud Console](https://console.cloud.google.com/). Add the Supabase callback as an authorized redirect URI:

```
https://<PROJECT_REF>.supabase.co/auth/v1/callback
```

Make sure to copy the client ID and secret so that you can paste them into supabase setup below.

**Supabase setup**

In the Supabase dashboard:
1. Go to **Authentication → Sign In / Providers → Google**. Then, paste the client ID and secret.
1. Go to **Authentication → URL Configuration**. Then, set the Site URL to your production domain and add redirect URLs:

```
https://<SOME_DOMAIN>/**
http://<LOCAL_DOMAIN>/**
```

**Password login (local only, non-OAuth)**

The password login is an optional non-OAuth fallback for local development. It is disabled by default and only activates when `ADMIN_ENABLE_PASSWORD_LOGIN=true` is set. The login form will only show the password field when this flag is on. In production, the endpoint will return 404.

## Credits

Favicon and icons sourced from [SVGRepo](https://www.svgrepo.com/) under their respective open licenses.

# Portfolio Web App

Personal portfolio web application built with **Next.js App Router** and **Supabase**.

---

## Project Goals

This project focuses on moving away from a static, hard-coded portfolio and building a dynamic system where content is managed through a custom internal dashboard. This allows a clear separation between data and presentation, while keeping the overall architecture minimal.

Another goal was to keep the site as accessible as possible, following the principles of [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) and [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/).

This project prioritizes **data flow over abstraction**. Architectural decisions, from using the App Router to accessing the database directly, were made to keep the system fast, maintainable, and easy to deploy.

---

## Tech Stack

- **Language**: JavaScript
- **Framework**: Next.js (App Router)
- **Styling**: TailwindCSS v3
- **Database / Storage**: Supabase (PostgreSQL + Storage)
- **Deployment**: Vercel

---

## Project Architecture

The app lives in a single codebase and handles both public and internal admin dashboard.

### Public Pages
- Uses **Next.js Server Components** to fetch data directly from Supabase, reducing client-side JavaScript and improving SEO
- Responsive image handling via Supabase Storage and Next.js image optimization

### Internal Admin Dashboard
- Built as **part of the same app** rather than as a separate service, to keep the codebase simple and maintainable
- Admin server-side logic is kept separate for security
- Used for managing portfolio content and asset
- Accessible only in a controlled environment

---

## Technical Notes

- Utilized Next.js **Server Components** instead of a separate REST API layer for internal data access
- Admin-level write and storage operations run server-side using the **Supabase Service Role**
- Shared server-side utilities are extracted where they can be reused
- Detailed contents are written in **Markdown** and rendered using `react-markdown` to improve the content editing and display experience

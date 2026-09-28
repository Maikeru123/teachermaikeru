# Next.js template

## Responsive layout checks

Build the site, then run the browser audit (uses installed Google Chrome):

```bash
npm run build
npm run test:responsive
```

Playwright starts the production server on port 3001. The suite covers 17 phone,
tablet, laptop, desktop, and landscape viewports, both themes, all project-story
scenes, teaching illustrations, technology explorer, keyboard/touch controls,
form validation, and reduced motion. It verifies full-width sections and the
current education content. Contact submissions
use mocked responses and do not send email. Screenshots are saved in
`test-results/`; the HTML report is in `playwright-report/`.

Run one size with `npm run test:responsive -- --project=320x568`.
See [the responsiveness audit](docs/responsiveness-audit.md) for layout decisions
and the verification matrix.

## Portfolio contact email setup

The contact form sends email through the server route `/api/contact` using the
[Resend REST API](https://resend.com/docs/api-reference/emails/send-email).
No additional email dependency is required.

1. Create a Resend API key with permission to send emails and verify your sending domain in Resend.
2. Copy `.env.example` to `.env.local` and fill in:
   - `RESEND_API_KEY`: your private Resend API key.
   - `CONTACT_EMAIL`: the inbox receiving messages (currently your existing portfolio email).
   - `CONTACT_FROM_EMAIL`: a sender on your verified domain, such as `Portfolio <contact@your-domain.com>`.
3. Restart the development server. For production, add the same variables in your hosting provider's environment settings and redeploy.
4. Submit the form and confirm the message arrives in your inbox. Replying uses the visitor's email address.

Use a Next.js server deployment (such as Vercel), since static hosting cannot run the email route.
Keep `.env.local` private; never add `NEXT_PUBLIC_` to these variables. Until configured, the form reports an error instead of pretending to send mail.

The form includes a honeypot, server validation, a 32 KiB request limit, and a browser origin check.
Concurrent clicks are blocked and retries use Resend idempotency keys. These are lightweight protections;
if spam becomes an issue, configure a shared rate limiter or your host's firewall rate limits for `/api/contact`.
Success means Resend accepted the email; final inbox delivery can be checked in Resend's dashboard.

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

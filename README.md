# ClinicFlow AI — Website

A React + Vite + Tailwind site for a medical AI chatbot/callbot company.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Get the "Book a demo" form sending you real emails

The form works out of the box but won't email anyone until you connect
[EmailJS](https://www.emailjs.com) (free tier, no backend required):

1. Create a free account at emailjs.com
2. Add an **Email Service** (Gmail, Outlook, etc.) — note its **Service ID**
3. Create an **Email Template** using these variables in the body:
   `{{from_name}}` `{{from_email}}` `{{practice}}` `{{demo_date}}` `{{demo_time}}` `{{notes}}`
   — and set the template's **"To email"** to your own inbox (e.g. ibrahimibnanwar002@gmail.com)
4. Note the **Template ID**
5. In your EmailJS dashboard under **Account → General**, copy your **Public Key**
6. Copy `.env.example` to `.env` and fill in the three values:
   ```
   VITE_EMAILJS_SERVICE_ID=...
   VITE_EMAILJS_TEMPLATE_ID=...
   VITE_EMAILJS_PUBLIC_KEY=...
   ```
7. Restart `npm run dev`

Until this is configured, submitting the form still shows the confirmation screen (so the
demo flow isn't blocked), but no email is sent — a warning is logged to the browser console
as a reminder.

## Turn on the AI chat widget (Flo)

The floating chat button in the corner is a real chat UI wired to a backend endpoint
(`api/chat.js`) — it needs an actual Claude API key to hold a conversation.

1. Get an API key at [console.anthropic.com](https://console.anthropic.com)
2. Add it to your `.env` file (see `.env.example`):
   ```
   ANTHROPIC_API_KEY=your_anthropic_api_key
   ```
   **No `VITE_` prefix** — that's intentional. A `VITE_`-prefixed variable gets bundled into
   the browser JS for anyone to read; this one stays server-side, used only by
   `api/chat.js`, which runs on your hosting provider, not in the visitor's browser.
3. This project's `api/` folder uses the **Vercel serverless function** convention, since a
   `vercel.json` is already included. If you deploy to Vercel:
   - Push/import the project, and add `ANTHROPIC_API_KEY` under
     **Project Settings → Environment Variables** in the Vercel dashboard (don't just rely
     on your local `.env` — Vercel needs it set there too for the live site)
   - To test the chat locally with the real backend, install the Vercel CLI
     (`npm i -g vercel`) and run `vercel dev` instead of `npm run dev` — plain `npm run dev`
     serves the frontend only and won't run `api/chat.js`
4. Deploying somewhere other than Vercel? `api/chat.js` is a small, self-contained function
   (fetches Anthropic's `/v1/messages` endpoint directly, no SDK) — it's a quick adaptation
   to Netlify Functions, AWS Lambda, or a tiny Express route if you'd rather run it there.

Until `ANTHROPIC_API_KEY` is set, the widget still opens and looks complete, but replies with
a friendly fallback message pointing people to Book a Demo or your email — it won't crash or
look broken.

Flo's personality and knowledge of ClinicFlow AI's services live in the `SYSTEM_PROMPT`
constant at the top of `api/chat.js` — edit that directly to change what it knows or how it
talks. It's intentionally told it **can't actually book appointments** (no calendar access),
and instead points people to the Book a Demo page — that's a safety choice, not a limitation
to work around, so real bookings always go through a page you control.

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, or any static host.

**Important for deployment:** this is a single-page app with client-side routing (React
Router). If a page like `/packages` shows a 404 or blank screen when you link to it directly
or refresh on it, your host needs to be told to always serve `index.html` for unknown paths.
This project already includes the config for the two most common hosts:

- `public/_redirects` — Netlify
- `vercel.json` — Vercel

If you deploy elsewhere (a plain static file server, S3, etc.), enable "SPA fallback" /
"history API fallback" mode, or serve locally with something that supports it, e.g.
`npx serve -s dist`.

## What's inside

- `src/pages/Home.jsx` — hero with the live animated chat demo, dashboard preview, services
  preview, capability diagram, website-embed showcase, team strip, FAQ
- `src/pages/Services.jsx` — medical chatbots, callbots, records & EMR sync
- `src/pages/Packages.jsx` (`Pricing.jsx`) — three pricing tiers
- `src/pages/Projects.jsx` — "Case Files" portfolio grid — **replace the sample entries in
  `CASES` with your real client work**
- `src/pages/About.jsx` — team of 5, process, mission — **swap in real names/photos if you
  want them**
- `src/pages/BookDemo.jsx` — calendar date/time picker + contact form (front-end only for now)
- `src/components/LiveConsole.jsx` — the looping animated chat transcript in the hero
- `src/components/FeatureOrbit.jsx` — the "How it all connects" diagram
- `src/components/DashboardPreview.jsx` — the sample analytics dashboard
- `src/components/WebsiteEmbedShowcase.jsx` — the "connects to your site" browser mockup
- `src/components/AIChatWidget.jsx` — the floating AI chat widget (Flo), on every page
- `api/chat.js` — serverless backend for the chat widget (Claude API, key stays server-side)

## Next steps (backend, when you're ready)

The "Book a demo" form and the dashboard numbers are currently front-end only — no live data.
To make them real you'll want:

1. A small Node/Express (or serverless) API for bookings
2. A database (MongoDB fits the MERN stack) to store slots, bookings, and usage stats
3. Email/SMS confirmation (e.g. Resend, SendGrid, or Twilio)
4. Real analytics events feeding the dashboard cards instead of the sample data

Happy to build any of this out next — just say the word.

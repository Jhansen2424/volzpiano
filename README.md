This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

All optional — the site builds and runs without any of them.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used for canonical tags, OG URLs and the sitemap. Defaults to `https://www.volzpiano.com`. Set it on preview deployments so they don't emit production URLs. |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID, e.g. `G-ABC1234567`. Adds a second `gtag('config', …)` to the tag already loaded for Google Ads. **Unset, the site collects no analytics at all** — only Google Ads conversion data. Values that aren't a well-formed measurement ID are ignored. |
| `GROQ_API_KEY` | Server-side key for the `/api/chat` assistant. |

## Images

`public/` holds the source photography. `next/image` resizes on delivery and
never serves above 3840px, so anything wider is dead weight — it was 125 MB of
camera originals until they were downscaled.

After adding new photography, run:

```bash
npm run optimize:images        # add --dry to preview without writing
```

It only touches files that are genuinely oversized and never writes a result
larger than the original.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

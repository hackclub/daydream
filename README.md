# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Hosting

The site is published as a fully static build on **Cloudflare Pages** (Free plan). The project is `daydream-butwal`, served at https://daydream.butwalhacks.com and https://daydream-butwal.pages.dev.

- `svelte.config.js` uses `@sveltejs/adapter-static`. Every route is prerendered to `build/`, and `build/404.html` is served for unknown paths.
- `static/_headers` sets the response headers (CORS on every path, plus long-lived caching for `/_app/immutable/*`).
- `.github/workflows/deploy-pages.yml` builds and deploys on every push to `main`, and can also be run by hand from the Actions tab. It needs the repo secret `CLOUDFLARE_API_TOKEN` (Pages: Edit) and the repo variable `CLOUDFLARE_ACCOUNT_ID`.
- The site needs no runtime server and no environment variables. `.env.example` and the `Dockerfile` are left over from the original Airtable-backed version.

To deploy by hand:

```bash
npm ci && npm run build
npx wrangler pages deploy build --project-name daydream-butwal --branch main
```

Security contact: tech@butwalhacks.com

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Environment Setup

This project uses environment variables for sensitive configuration. To set up your environment:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update the values:
   ```bash
   # Required for analytics
   NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your-actual-token
   ```

> **Note**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

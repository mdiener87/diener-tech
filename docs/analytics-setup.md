# Setting Up Cloudflare Web Analytics

This site uses Cloudflare Web Analytics to track visitors with privacy in mind. Cloudflare Web Analytics is a privacy-focused analytics solution that doesn't use cookies or track users across sites.

## Getting Your Cloudflare Web Analytics Token

1. Log in to your Cloudflare dashboard at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Analytics & Logs** > **Web Analytics**
3. Click on **Add a site** button
4. Enter your domain name and click **Done**
5. Cloudflare will provide you with a JavaScript snippet that contains your unique token
6. Copy the token from the snippet (it will look something like `1a2b3c4d5e6f7g8h9i0j`)

## Setting Up Analytics in the Nuxt Config

1. Open the `nuxt.config.ts` file
2. Find the `cloudflareAnalytics` section
3. Replace the placeholder token with your actual token:

```js
cloudflareAnalytics: {
  token: 'YOUR_ACTUAL_TOKEN_HERE'
},
```

## Using Environment Variables (Optional)

For better security, you can use environment variables:

1. Create or edit your `.env` file
2. Add your Cloudflare token:
   ```
   NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=your-token-here
   ```
3. Update the nuxt.config.ts:
   ```js
   cloudflareAnalytics: {
     token: process.env.NUXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || 'fallback-token'
   },
   ```

## Enabling Analytics Through Cloudflare Pages (Alternative Method)

If you're hosting your site through Cloudflare Pages, you can enable Web Analytics through the Pages dashboard:

1. Log in to Cloudflare dashboard
2. Go to **Workers & Pages**
3. Select your Pages project
4. Navigate to **Metrics** tab
5. Click **Enable** under Web Analytics

Cloudflare will automatically add the analytics script to your site on the next deployment.

## Checking Analytics Data

After setup, you can view your analytics data by:

1. Log in to your Cloudflare dashboard
2. Navigate to **Analytics & Logs** > **Web Analytics**
3. Select your site from the list

You'll see data about page views, referral sources, countries, browsers, and more.

## Features of Cloudflare Web Analytics

- **Privacy-focused**: No cookies, no persistent identifiers, and no fingerprinting
- **Performance metrics**: Core Web Vitals like LCP, FID, and CLS
- **Real-time data**: See traffic as it happens
- **Geographic insights**: Know where your visitors are coming from
- **Referrer tracking**: Understand your traffic sources
- **Browser and device stats**: See what technology your visitors use

Note: The analytics module is designed to not track visitors in development mode but will track them in production environments. 
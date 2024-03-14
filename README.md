# Lymyted

## How to use

- Upload the latest Lymyted Setting Plugin (lymyted-settings.zip).
- Install and activate the plugin on your WordPress site. This will install all
  the required plugins for Lymyted Script, add some useful fields to the
  WPGraphQL schema, and automatically retrieve the WooCommerce payment gateway
  settings for Stripe and PayPal.
- Once the plugin is activated you are ready to deploy Lymyted script on
  whatever hosting you like.
- Once the plugin is activated the only required environment variable is
  GQL_HOST. Checkout the .env.example file for more details.

### Development

- Inside this folder run pnpm install then pnpm dev

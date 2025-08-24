import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "", // Add your DSN from Sentry project settings
  tracesSampleRate: 1.0, // Adjust sample rate for performance monitoring
});

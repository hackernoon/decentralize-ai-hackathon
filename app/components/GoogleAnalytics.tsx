import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!gaId) return null;
  return <NextGoogleAnalytics gaId={gaId} />;
}

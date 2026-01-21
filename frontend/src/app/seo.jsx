import { Helmet, HelmetProvider } from "react-helmet-async";

export function SeoProvider({ children }) {
  return <HelmetProvider>{children}</HelmetProvider>;
}

export default function SEO({
  title,
  description,
  canonical,
  noIndex = false,
}) {
  const safeTitle = title ? String(title) : "CareerStream";
  const safeDesc = description ? String(description) : "";

  const adsenseEnabled = import.meta.env.VITE_ADSENSE_ENABLED === "true";
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT || "";

  return (
    <Helmet>
      <title>{safeTitle}</title>

      {safeDesc ? <meta name="description" content={safeDesc} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}

      {/* Open Graph (basic) */}
      <meta property="og:title" content={safeTitle} />
      {safeDesc ? <meta property="og:description" content={safeDesc} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:type" content="website" />

      {/* Twitter (basic) */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={safeTitle} />
      {safeDesc ? <meta name="twitter:description" content={safeDesc} /> : null}

      {/* AdSense: only when enabled + client exists */}
      {adsenseEnabled && adsenseClient ? (
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`}
          crossOrigin="anonymous"
        />
      ) : null}
    </Helmet>
  );
}

import { useEffect, useMemo } from "react";

/**
 * AdSense is ONLY loaded when:
 * - VITE_ADSENSE_ENABLED=true
 * - VITE_ADSENSE_CLIENT is set (ca-pub-xxxxxxxx)
 *
 * This keeps development clean and avoids policy issues.
 */
export default function AdSlot({ slot, format = "auto", fullWidthResponsive = true }) {
  const enabled = import.meta.env.VITE_ADSENSE_ENABLED === "true";
  const client = import.meta.env.VITE_ADSENSE_CLIENT || "";

  const key = useMemo(() => `${client}:${slot}`, [client, slot]);

  useEffect(() => {
    if (!enabled || !client || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // ignore in dev
    }
  }, [enabled, key, slot, client]);

  if (!enabled) return null;

  return (
    <div className="my-6 overflow-hidden rounded-2xl border bg-white p-3 shadow-sm">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
      <div className="mt-2 text-center text-[11px] text-gray-400">
        Ad
      </div>
    </div>
  );
}

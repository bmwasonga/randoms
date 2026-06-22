"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CbpNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const trackMatch = pathname.match(/^\/track\/([^/]+)$/);
  const trackingNumber = trackMatch?.[1];

  return (
    <nav className="cbp-nav" aria-label="Main navigation">
      <div className="cbp-container flex flex-wrap items-center gap-4 py-2 text-sm">
        <Link
          href="/"
          className={isHome ? "cbp-nav-link cbp-nav-link-active" : "cbp-nav-link"}
          aria-current={isHome ? "page" : undefined}
        >
          Track Shipment
        </Link>

        {trackingNumber ? (
          <Link
            href={`/track/${trackingNumber}/entry-summary`}
            target="_blank"
            rel="noopener noreferrer"
            className="cbp-nav-link"
          >
            Entry Summary (CF 7501) ↗
          </Link>
        ) : (
          <span className="text-white/50" title="Available after you open a shipment">
            Entry Summary
          </span>
        )}

        <span className="text-white/50" title="Not available in this portal">
          Reports
        </span>
      </div>
    </nav>
  );
}

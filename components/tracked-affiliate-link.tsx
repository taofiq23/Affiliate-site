"use client";

import type { MouseEvent, ReactNode } from "react";

type Props = {
  href?: string;
  className?: string;
  rel?: string;
  target?: string;
  children: ReactNode;
  signal: {
    slug: string;
    slot: string;
    destination?: string;
  };
};

export function TrackedAffiliateLink({ href, className, rel, target = "_blank", children, signal }: Props) {
  const handleClick = (_event: MouseEvent<HTMLAnchorElement>) => {
    if (!href) {
      return;
    }

    const payload = JSON.stringify({
      ...signal,
      href,
      timestamp: new Date().toISOString()
    });

    try {
      if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/click", blob);
        return;
      }

      void fetch("/api/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true
      });
    } catch {
      // Tracking failures should never block the outbound retailer click.
    }
  };

  return (
    <a href={href} rel={rel} target={target} className={className} onClick={handleClick} data-affiliate-outbound="true">
      {children}
    </a>
  );
}

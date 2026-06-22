"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { getPrimaryTrackingNumber } from "@/lib/shipments-data";
import { isValidTrackingNumber } from "@/lib/tracking";

export function TrackingSearchForm({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [trackingNumber, setTrackingNumber] = useState(defaultValue);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = trackingNumber.trim();

    if (!isValidTrackingNumber(trimmed)) {
      setError("No record found for that tracking or entry number. Check the number and try again.");
      return;
    }

    setError("");
    router.push(`/track/${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="cbp-search-form">
      <label htmlFor="tracking-number" className="cbp-label">
        Tracking / Entry Number
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="tracking-number"
          type="text"
          value={trackingNumber}
          onChange={(e) => {
            setTrackingNumber(e.target.value);
            setError("");
          }}
          placeholder={`e.g. ${getPrimaryTrackingNumber()} or 25-290-482917`}
          className="cbp-input flex-1"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" className="cbp-button">
          Search
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-gray-600">
        Enter your international tracking number, bill of lading (BOL), or ACE
        entry number to view customs clearance status.
      </p>
    </form>
  );
}

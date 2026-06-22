import { DELIVERY_HANDOFF_NOTE } from "@/lib/shipment-constants";
import type { ShipmentDetails } from "@/lib/tracking";

function StatusBadge({ status, code }: { status: string; code: string }) {
  const isReleased = code.startsWith("RLS");
  const isHeld = code.includes("HOLD") || code.includes("EXAM");
  const isTransit = code === "IN-TRNST";

  let badgeClass = "cbp-badge cbp-badge-pending";
  if (isReleased) badgeClass = "cbp-badge cbp-badge-released";
  if (isHeld) badgeClass = "cbp-badge cbp-badge-held";
  if (isTransit) badgeClass = "cbp-badge cbp-badge-transit";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={badgeClass}>{status}</span>
      <span className="font-mono text-xs text-gray-500">Code: {code}</span>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="cbp-detail-row">
      <dt className="cbp-detail-label">{label}</dt>
      <dd className="cbp-detail-value">{value}</dd>
    </div>
  );
}

export function TrackingResults({ shipment }: { shipment: ShipmentDetails }) {
  const safewayHasItem = shipment.itemCustody.includes(shipment.deliveryCarrier);

  return (
    <div className="space-y-6">
      <section className="cbp-panel">
        <div className="cbp-panel-header">
          <h2 className="text-lg font-semibold text-[#1a4480]">Shipment Status</h2>
        </div>
        <div className="cbp-panel-body space-y-4">
          <StatusBadge status={shipment.currentStatus} code={shipment.statusCode} />
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Item custody: </span>
            {shipment.itemCustody}
          </p>
          {shipment.estimatedRelease && (
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Estimated release: </span>
              {shipment.estimatedRelease}
            </p>
          )}
        </div>
      </section>

      <section className="cbp-panel">
        <div className="cbp-panel-header">
          <h2 className="text-lg font-semibold text-[#1a4480]">
            Delivery Handoff — {shipment.deliveryCarrier}
          </h2>
        </div>
        <div className="cbp-panel-body space-y-3">
          <p className="text-sm text-gray-700">{DELIVERY_HANDOFF_NOTE}</p>
          <div className="cbp-handoff-flow">
            <span>CBP Portland (2904)</span>
            <span aria-hidden="true">→</span>
            <span>{shipment.deliveryCarrier}</span>
            <span aria-hidden="true">→</span>
            <span>{shipment.deliveryCity}</span>
          </div>
          <p className="text-base font-semibold text-gray-900">{shipment.pointOfDelivery}</p>
          <p className="text-sm text-gray-600">
            {safewayHasItem
              ? `${shipment.deliveryCarrier} has received the item and is routing for delivery.`
              : `Item remains in CBP custody. ${shipment.deliveryCarrier} will receive the item after customs release.`}
          </p>
        </div>
      </section>

      <section className="cbp-panel">
        <div className="cbp-panel-header flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#1a4480]">Entry Information</h2>
          <a
            href={`/track/${encodeURIComponent(shipment.trackingNumber)}/entry-summary`}
            target="_blank"
            rel="noopener noreferrer"
            className="cbp-doc-link"
          >
            Open Entry Summary (CF 7501) ↗
          </a>
        </div>
        <dl className="cbp-panel-body cbp-detail-grid">
          <DetailRow label="Tracking Number" value={shipment.trackingNumber} />
          <DetailRow label="ACE Entry Number" value={shipment.entryNumber} />
          <DetailRow label="Port of Entry" value={shipment.portOfEntry} />
          <DetailRow label="U.S. Border Facility" value={shipment.borderFacility} />
          <DetailRow label="Final Mile Carrier" value={shipment.deliveryCarrier} />
          <DetailRow label="Item Custody" value={shipment.itemCustody} />
          <DetailRow label="Country of Origin" value={shipment.originCountry} />
          <DetailRow label="State of Origin" value={shipment.originState} />
          <DetailRow label="Destination Country" value={shipment.destination} />
          <DetailRow label="Point of Delivery" value={shipment.pointOfDelivery} />
          <DetailRow label="Package Type" value={shipment.packageType} />
          <DetailRow label="Gross Weight" value={shipment.weight} />
          <DetailRow label="Declared Value" value={shipment.declaredValue} />
          <DetailRow label="Importer of Record" value={shipment.importerOfRecord} />
        </dl>
      </section>

      <section className="cbp-panel">
        <div className="cbp-panel-header">
          <h2 className="text-lg font-semibold text-[#1a4480]">Customs Event History</h2>
        </div>
        <div className="cbp-panel-body">
          <ol className="cbp-timeline">
            {shipment.events.map((event, index) => (
              <li
                key={index}
                className={`cbp-timeline-item ${event.completed ? "completed" : "pending"}`}
              >
                <div className="cbp-timeline-marker" aria-hidden="true" />
                <div className="cbp-timeline-content">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">{event.status}</h3>
                    {event.completed && (
                      <time className="text-xs text-gray-500">
                        {event.date} at {event.time}
                      </time>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-[#1a4480]">{event.location}</p>
                  <p className="mt-1 text-sm text-gray-600">{event.description}</p>
                  {!event.completed && index === shipment.events.findIndex((e) => !e.completed) && (
                    <p className="mt-2 text-xs font-medium text-amber-700">In progress</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

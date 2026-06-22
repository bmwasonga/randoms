import type { ShipmentDetails } from "@/lib/tracking-types";
import { DELIVERY_HANDOFF_NOTE } from "./shipment-constants";

export function getEntrySummaryFilename(shipment: ShipmentDetails): string {
  return `ACE-Entry-Summary-${shipment.entryNumber.replace(/-/g, "")}.html`;
}

export function getEntrySummaryTitle(shipment: ShipmentDetails): string {
  return `ACE Entry Summary — ${shipment.entryNumber}`;
}

export function buildEntrySummaryDocument(shipment: ShipmentDetails): string {
  const generatedAt = new Date().toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });

  const rows = [
    ["ACE Entry Number", shipment.entryNumber],
    ["Tracking Number", shipment.trackingNumber],
    ["Port of Entry", shipment.portOfEntry],
    ["Border Facility", shipment.borderFacility],
    ["Current Status", `${shipment.currentStatus} (${shipment.statusCode})`],
    ["Item Custody", shipment.itemCustody],
    ["Country of Origin", shipment.originCountry],
    ["State of Origin", shipment.originState],
    ["Point of Delivery", shipment.pointOfDelivery],
    ["Final Mile Carrier", shipment.deliveryCarrier],
    ["Package Type", shipment.packageType],
    ["Gross Weight", shipment.weight],
    ["Declared Value", shipment.declaredValue],
    ["Importer of Record", shipment.importerOfRecord],
  ];

  const eventRows = shipment.events
    .map(
      (event) => `
        <tr>
          <td>${event.status}</td>
          <td>${event.completed ? `${event.date} ${event.time}` : "Pending"}</td>
          <td>${event.location}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${getEntrySummaryTitle(shipment)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      color: #1b1b1b;
      background: #f5f5f5;
      line-height: 1.45;
    }
    .page {
      max-width: 820px;
      margin: 2rem auto;
      background: #fff;
      border: 1px solid #d6d7d9;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    .header {
      background: #1a4480;
      color: #fff;
      padding: 1.25rem 1.5rem;
      border-bottom: 4px solid #d83933;
    }
    .header h1 {
      margin: 0 0 .25rem;
      font-size: 1.25rem;
    }
    .header p {
      margin: .15rem 0;
      font-size: .8rem;
      opacity: .9;
    }
    .body { padding: 1.5rem; }
    .notice {
      background: #e8f0f8;
      border-left: 4px solid #1a4480;
      padding: .75rem 1rem;
      margin-bottom: 1.25rem;
      font-size: .875rem;
    }
    h2 {
      margin: 1.25rem 0 .5rem;
      font-size: 1rem;
      color: #1a4480;
      border-bottom: 1px solid #d6d7d9;
      padding-bottom: .25rem;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: .875rem;
    }
    th, td {
      border: 1px solid #d6d7d9;
      padding: .5rem .65rem;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #e8f0f8;
      width: 34%;
      font-weight: 700;
    }
    .events th { width: auto; }
    .footer {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #d6d7d9;
      font-size: .75rem;
      color: #565c65;
    }
    .toolbar {
      max-width: 820px;
      margin: 1rem auto 0;
      display: flex;
      gap: .75rem;
    }
    button {
      background: #1a4480;
      color: #fff;
      border: none;
      padding: .55rem 1rem;
      font-weight: 700;
      cursor: pointer;
    }
    @media print {
      body { background: #fff; }
      .toolbar { display: none; }
      .page { margin: 0; box-shadow: none; border: none; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button type="button" onclick="window.print()">Print / Save as PDF</button>
  </div>
  <article class="page">
    <header class="header">
      <p>U.S. Department of Homeland Security · U.S. Customs and Border Protection</p>
      <h1>ACE Entry Summary (CF 7501)</h1>
      <p>Portland, Oregon, USA · Port of Entry 2904</p>
    </header>
    <div class="body">
      <div class="notice">
        <strong>Cargo release status record.</strong> Generated ${generatedAt} PT.
        ${shipment.estimatedRelease ? ` Estimated CBP release: ${shipment.estimatedRelease}.` : ""}
      </div>

      <h2>Entry Details</h2>
      <table>
        <tbody>
          ${rows.map(([label, value]) => `<tr><th>${label}</th><td>${value}</td></tr>`).join("")}
        </tbody>
      </table>

      <h2>Delivery Handoff</h2>
      <p style="font-size:.875rem;">${DELIVERY_HANDOFF_NOTE}</p>
      <p style="font-size:.875rem;"><strong>Routing:</strong> CBP Portland (2904) → ${shipment.deliveryCarrier} → ${shipment.deliveryCity}</p>

      <h2>Event History</h2>
      <table class="events">
        <thead>
          <tr>
            <th>Event</th>
            <th>Date / Time</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>${eventRows}</tbody>
      </table>

      <div class="footer">
        <p>This is a demonstration document for educational purposes. Not affiliated with or endorsed by CBP or DHS.</p>
        <p>Document ID: ${shipment.entryNumber} · Tracking: ${shipment.trackingNumber}</p>
      </div>
    </div>
  </article>
</body>
</html>`;
}

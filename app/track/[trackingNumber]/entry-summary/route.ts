import { notFound } from "next/navigation";
import { buildEntrySummaryDocument } from "@/lib/entry-summary-document";
import { getShipmentByTrackingNumber, isValidTrackingNumber } from "@/lib/tracking";

type RouteContext = {
  params: Promise<{ trackingNumber: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { trackingNumber } = await context.params;
  const decoded = decodeURIComponent(trackingNumber);

  if (!isValidTrackingNumber(decoded)) {
    notFound();
  }

  const shipment = getShipmentByTrackingNumber(decoded);
  if (!shipment) {
    notFound();
  }

  return new Response(buildEntrySummaryDocument(shipment), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

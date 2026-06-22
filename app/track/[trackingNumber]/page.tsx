import Link from "next/link";
import { notFound } from "next/navigation";
import { CbpFooter, CbpHeader } from "@/app/components/cbp-header";
import { TrackingResults } from "@/app/components/tracking-results";
import { TrackingSearchForm } from "@/app/components/tracking-search-form";
import { getShipmentByTrackingNumber, isValidTrackingNumber } from "@/lib/tracking";

type PageProps = {
  params: Promise<{ trackingNumber: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { trackingNumber } = await params;
  const decoded = decodeURIComponent(trackingNumber);
  return {
    title: `Tracking ${decoded} | CBP Cargo Release Status`,
    description: `Customs clearance status for shipment ${decoded}`,
  };
}

export default async function TrackPage({ params }: PageProps) {
  const { trackingNumber } = await params;
  const decoded = decodeURIComponent(trackingNumber);

  if (!isValidTrackingNumber(decoded)) {
    notFound();
  }

  const shipment = getShipmentByTrackingNumber(decoded);

  if (!shipment) {
    notFound();
  }

  return (
    <div className="cbp-page">
      <CbpHeader />
      <main className="cbp-container flex-1 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-[#1a4480] hover:underline">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Cargo Release Status</span>
          </div>

          <section className="mb-6 cbp-panel">
            <div className="cbp-panel-header">
              <h2 className="text-lg font-semibold text-[#1a4480]">New Search</h2>
            </div>
            <div className="cbp-panel-body">
              <TrackingSearchForm defaultValue={decoded} />
            </div>
          </section>

          <TrackingResults shipment={shipment} />

          <p className="mt-6 text-center text-xs text-gray-500">
            Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}{" "}
            EST · Data refreshed from ACE
          </p>
        </div>
      </main>
      <CbpFooter />
    </div>
  );
}

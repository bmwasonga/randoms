import Link from "next/link";
import { CbpFooter, CbpHeader } from "@/app/components/cbp-header";

export default function NotFound() {
  return (
    <div className="cbp-page">
      <CbpHeader />
      <main className="cbp-container flex-1 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="cbp-panel">
            <div className="cbp-panel-body space-y-4">
              <h2 className="text-xl font-semibold text-[#1a4480]">Shipment Not Found</h2>
              <p className="text-sm text-gray-700">
                No record found for the tracking or entry number provided. Please
                verify the number and try again.
              </p>
              <Link href="/" className="cbp-button inline-block">
                Return to Search
              </Link>
            </div>
          </div>
        </div>
      </main>
      <CbpFooter />
    </div>
  );
}

import { CbpFooter, CbpHeader } from "@/app/components/cbp-header";
import { TrackingSearchForm } from "@/app/components/tracking-search-form";

export default function Home() {
  return (
    <div className="cbp-page">
      <CbpHeader />
      <main className="cbp-container flex-1 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 border-l-4 border-[#1a4480] bg-blue-50 px-4 py-3">
            <p className="text-sm text-gray-800">
              <strong>ACE Secure Data Portal</strong> — Public cargo release status
              inquiry for shipments entering the United States via{" "}
              <strong>Portland, Oregon, USA</strong> (CBP Port 2904). Search by
              tracking number, bill of lading, or entry number.
            </p>
          </div>

          <section className="cbp-panel">
            <div className="cbp-panel-header">
              <h2 className="text-lg font-semibold text-[#1a4480]">
                Track International Shipment
              </h2>
            </div>
            <div className="cbp-panel-body">
              <TrackingSearchForm />
            </div>
          </section>

          <section className="mt-6 cbp-panel">
            <div className="cbp-panel-header">
              <h2 className="text-lg font-semibold text-[#1a4480]">Status Codes</h2>
            </div>
            <div className="cbp-panel-body">
              <table className="cbp-table w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left">Code</th>
                    <th className="text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-mono text-xs">IN-TRNST</td>
                    <td>Shipment in transit to U.S. port of entry</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">DOC-HOLD</td>
                    <td>Held for document review by CBP</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">ENT-PEND</td>
                    <td>Entry summary filed, awaiting CBP processing</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">CBP-REVW</td>
                    <td>Documents under customs review</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">DUTY-PEND</td>
                    <td>Duties assessed, payment authorization pending</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">EXAM-INPR</td>
                    <td>Physical examination in progress</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">RLS-PEND</td>
                    <td>Customs released, awaiting carrier pickup</td>
                  </tr>
                  <tr>
                    <td className="font-mono text-xs">RLS-CARR</td>
                    <td>Released to domestic carrier for delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <CbpFooter />
    </div>
  );
}

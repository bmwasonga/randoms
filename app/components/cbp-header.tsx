import Image from "next/image";
import Link from "next/link";
import { CbpNav } from "@/app/components/cbp-nav";

export function CbpHeader() {
  return (
    <header className="cbp-header">
      <div className="cbp-header-top">
        <div className="cbp-container flex items-center justify-between py-2 text-xs text-white/80">
          <span>An official website of the United States government</span>
          <Link href="/" className="hover:underline">
            ACE Portal Home
          </Link>
        </div>
      </div>
      <div className="cbp-header-main">
        <div className="cbp-container flex items-center gap-4 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90">
            <Image
              src="/dhs-seal.svg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11"
              aria-hidden
            />
            <Image
              src="/cbp-shield.svg"
              alt=""
              width={48}
              height={54}
              className="h-12 w-auto"
              aria-hidden
            />
          </Link>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-white/70">
              U.S. Department of Homeland Security
            </p>
            <p className="text-xs font-medium uppercase tracking-widest text-white/70">
              U.S. Customs and Border Protection
            </p>
            <Link href="/" className="hover:underline">
              <h1 className="text-xl font-bold text-white sm:text-2xl">
                Cargo Release Status Inquiry
              </h1>
            </Link>
            <p className="mt-1 text-xs text-white/80">
              Portland, Oregon, USA · Port of Entry 2904
            </p>
          </div>
        </div>
      </div>
      <CbpNav />
    </header>
  );
}

export function CbpFooter() {
  return (
    <footer className="cbp-footer mt-auto">
      <div className="cbp-container py-6 text-xs text-gray-600">
        <p className="mb-2 font-semibold text-gray-800">
          U.S. Customs and Border Protection
        </p>
        <p>
          This is a demonstration page for educational purposes. Not affiliated
          with or endorsed by CBP or the Department of Homeland Security.
        </p>
        <p className="mt-2">
          For official customs inquiries, visit{" "}
          <a
            href="https://www.cbp.gov"
            className="text-[#1a4480] underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            cbp.gov
          </a>
        </p>
      </div>
    </footer>
  );
}

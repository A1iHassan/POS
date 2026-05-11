import {
  Store,
  Percent,
  Shield,
  QrCode,
  Printer,
  Network,
  RefreshCcw,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

export default function Settings() {
  const [taxes] = useState([
    {
      authority: "NY STATE SALES",
      rate: "4.000%",
      class: "Standard Rate",
      active: true,
    },
    {
      authority: "NYC LOCAL TAX",
      rate: "4.500%",
      class: "Local Surcharge",
      active: true,
    },
    {
      authority: "MCTD SURCHARGE",
      rate: "0.375%",
      class: "Transit Authority",
      active: true,
    },
    {
      authority: "EXEMPT_FOOD_V1",
      rate: "0.000%",
      class: "Exemption Class",
      active: false,
    },
  ]);

  return (
    <div className="flex-1 overflow-y-auto bg-surface h-full">
      <header className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl px-12 py-8 flex flex-col md:flex-row items-start md:items-baseline justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface uppercase">
            Settings Hub
          </h2>
          <p className="text-sm text-on-surface-variant font-medium tracking-[0.05em] uppercase mt-1 font-body">
            Global Configuration / Terminal Control
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-secondary text-on-secondary text-xs font-bold uppercase tracking-widest hover:bg-secondary-dim transition-colors font-body">
            Discard Changes
          </button>
          <button className="px-6 py-2 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-dim transition-colors font-body">
            Commit Config
          </button>
        </div>
      </header>

      <section className="px-12 pb-12 grid grid-cols-1 md:grid-cols-12 gap-1 gap-y-1">
        {/* Store Identity & Tax (Left Content) */}
        <div className="col-span-1 border md:col-span-12 xl:col-span-8 space-y-1">
          <div className="bg-surface-container-low p-8 shadow-sm">
            <h3 className="text-xl font-bold font-headline tracking-tight uppercase mb-6 flex items-center gap-2 text-primary">
              <Store size={24} />
              Store Identity
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-body">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="MONOLITH_HQ_NYC"
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2 font-body"
                />
              </div>
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-body">
                  Store ID
                </label>
                <input
                  type="text"
                  defaultValue="XP-9000-A"
                  readOnly
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2 font-body"
                />
              </div>
              <div className="col-span-1 lg:col-span-2 space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant font-body">
                  Physical Address
                </label>
                <input
                  type="text"
                  defaultValue="700 LIBERTY ST, NEW YORK, NY 10006"
                  className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2 font-body"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low p-8 shadow-sm">
            <h3 className="text-xl font-bold font-headline tracking-tight uppercase mb-6 flex items-center gap-2 text-primary">
              <Percent size={24} />
              Tax Configuration Matrix
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-surface-container-high">
                    <th className="p-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface font-body">
                      Tax Authority
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface font-body">
                      Rate
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface font-body">
                      Classification
                    </th>
                    <th className="p-4 text-[10px] font-black uppercase tracking-[0.1em] text-on-surface text-right font-body">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taxes.map((tax, i) => (
                    <tr
                      key={i}
                      className={clsx(
                        "transition-colors",
                        i % 2 === 0 ? "bg-surface" : "bg-surface-container-low",
                      )}
                    >
                      <td className="p-4 text-xs font-medium font-headline text-on-surface">
                        {tax.authority}
                      </td>
                      <td className="p-4 text-xs font-mono text-on-surface">
                        {tax.rate}
                      </td>
                      <td className="p-4 text-[10px] uppercase font-bold text-on-surface-variant font-body">
                        {tax.class}
                      </td>
                      <td className="p-4 text-right">
                        {tax.active ? (
                          <span className="bg-secondary px-2 py-0.5 text-[8px] font-bold text-on-secondary uppercase font-body tracking-wider">
                            Active
                          </span>
                        ) : (
                          <span className="bg-outline px-2 py-0.5 text-[8px] font-bold text-on-surface uppercase font-body tracking-wider">
                            Inactive
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="mt-4 w-full border-2 border-dashed border-outline-variant py-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-variant transition-colors font-body">
              + Append New Tax Rule
            </button>
          </div>
        </div>

        {/* Security & Mobile Terminal Link (Right Content) */}
        <div className="col-span-1 md:col-span-12 xl:col-span-4 space-y-1">
          <div className="bg-slate-900 p-8 text-white h-[calc(100%-120px)] flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-xl font-bold font-headline tracking-tight uppercase mb-6 flex items-center gap-2">
                <Shield size={24} />
                Security Protocol
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">
                      Two-Factor Auth
                    </p>
                    <p className="text-xs text-slate-500 font-body">
                      Require MFA for Manager override
                    </p>
                  </div>
                  <div className="w-10 h-5 bg-slate-700 relative cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="absolute top-0 left-0 w-5 h-5 bg-slate-400"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">
                      Auto-Lock Terminal
                    </p>
                    <p className="text-xs text-slate-500 font-body">
                      Lock after 5 mins of inactivity
                    </p>
                  </div>
                  <div className="w-10 h-5 bg-primary relative cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="absolute top-0 right-0 w-5 h-5 bg-white"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">
                      Hardware Encrypt
                    </p>
                    <p className="text-xs text-slate-500 font-body">
                      AES-256 local storage encryption
                    </p>
                  </div>
                  <div className="w-10 h-5 bg-primary relative cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="absolute top-0 right-0 w-5 h-5 bg-white"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-800">
              <div className="bg-slate-800 p-4 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">
                  Firmware Status
                </p>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black font-headline tracking-tighter">
                    v4.8.2-STABLE
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 font-body">
                    VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high p-8 flex items-center justify-center h-[120px] shadow-sm">
            <div className="text-center">
              <QrCode size={48} className="text-outline-variant mb-2 mx-auto" />
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant font-body">
                Mobile Terminal Link
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Status Tickers */}
        <div className="col-span-1 md:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-1">
          <div className="bg-surface-container-low p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center shrink-0">
              <Printer size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                Peripherals
              </p>
              <p className="text-xs font-bold text-on-surface uppercase font-headline mt-1">
                3 Printers Connected
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center shrink-0">
              <Network size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                Network
              </p>
              <p className="text-xs font-bold text-on-surface uppercase font-headline mt-1">
                Static IP: 192.168.1.104
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 bg-surface-container-highest flex items-center justify-center shrink-0">
              <RefreshCcw size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                Cloud Sync
              </p>
              <p className="text-xs font-bold text-on-surface uppercase font-headline mt-1">
                Last Sync: 2m ago
              </p>
            </div>
          </div>
          <div className="bg-error-container/20 p-6 flex items-center gap-4 border-l-4 border-error shadow-sm">
            <div className="w-12 h-12 bg-error-container/40 flex items-center justify-center shrink-0">
              <AlertTriangle
                size={24}
                className="text-error"
                style={{ fill: "currentColor", opacity: 0.15 }}
              />
              <AlertTriangle size={24} className="text-error absolute" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-error font-body">
                System Alert
              </p>
              <p className="text-xs font-bold text-on-error-container uppercase font-headline mt-1">
                Backup Battery Low
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="px-12 pb-24">
        <div className="bg-surface-container-low p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h3 className="text-xl font-bold font-headline tracking-tight uppercase flex items-center gap-2 text-primary">
                <DollarSign size={24} />
                Currency &amp; Localization
              </h3>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-body">
              ISO 4217 Standard Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-body">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                Primary Currency
              </label>
              <select className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2">
                <option>USD - United States Dollar</option>
                <option>EUR - Euro</option>
                <option>GBP - British Pound</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                Display Format
              </label>
              <select className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2">
                <option>$1,234.56</option>
                <option>1.234,56 $</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">
                Timezone
              </label>
              <select className="w-full bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-sm text-on-surface font-medium px-0 py-2">
                <option>(GMT-05:00) Eastern Time</option>
                <option>(GMT-08:00) Pacific Time</option>
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

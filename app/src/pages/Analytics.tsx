import {
  CalendarDays,
  Download,
  CreditCard,
  Banknote,
  Nfc,
  Map,
} from "lucide-react";
import clsx from "clsx";

export default function Analytics() {
  const mockBars = [
    {
      bgOuter: "opacity-20",
      bgInner: "",
      hOuter: "h-[40%]",
      hInner: "h-[35%]",
    },
    {
      bgOuter: "opacity-40",
      bgInner: "",
      hOuter: "h-[55%]",
      hInner: "h-[45%]",
    },
    {
      bgOuter: "opacity-60",
      bgInner: "",
      hOuter: "h-[45%]",
      hInner: "h-[50%]",
    },
    {
      bgOuter: "opacity-100",
      bgInner: "",
      hOuter: "h-[70%]",
      hInner: "h-[65%]",
    },
    {
      bgOuter: "opacity-100",
      bgInner: "",
      hOuter: "h-[85%]",
      hInner: "h-[80%]",
    },
    {
      bgOuter: "opacity-80",
      bgInner: "",
      hOuter: "h-[60%]",
      hInner: "h-[55%]",
    },
    {
      bgOuter: "opacity-100",
      bgInner: "",
      hOuter: "h-[75%]",
      hInner: "h-[70%]",
    },
    {
      bgOuter: "opacity-100",
      bgInner: "",
      hOuter: "h-[90%]",
      hInner: "h-[85%]",
    },
    {
      bgOuter: "opacity-50",
      bgInner: "",
      hOuter: "h-[65%]",
      hInner: "h-[60%]",
    },
    {
      bgOuter: "opacity-30",
      bgInner: "",
      hOuter: "h-[45%]",
      hInner: "h-[40%]",
    },
    {
      bgOuter: "opacity-60",
      bgInner: "",
      hOuter: "h-[55%]",
      hInner: "h-[50%]",
    },
    {
      bgOuter: "opacity-100",
      bgInner: "",
      hOuter: "h-[80%]",
      hInner: "h-[75%]",
    },
  ];

  const inventoryVelocity = [
    {
      sku: "#SKU-9902-XL",
      stock: "1,240",
      turn: "42.5",
      status: "Optimal",
      statusClass: "bg-primary-container text-on-primary-container",
    },
    {
      sku: "#SKU-4412-SM",
      stock: "142",
      turn: "88.1",
      status: "Low Stock",
      statusClass: "bg-error-container text-on-error-container",
    },
    {
      sku: "#SKU-1029-MD",
      stock: "842",
      turn: "12.4",
      status: "Stagnant",
      statusClass: "bg-surface-container-high text-on-surface-variant",
    },
    {
      sku: "#SKU-8827-LG",
      stock: "2,110",
      turn: "31.0",
      status: "Optimal",
      statusClass: "bg-primary-container text-on-primary-container",
    },
    {
      sku: "#SKU-0034-OS",
      stock: "45",
      turn: "112.5",
      status: "Critical",
      statusClass: "bg-error-container text-on-error-container",
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto">
      {/* Architectural grid background applied behind content */}
      <div
        className="flex-1 p-8 min-h-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle, #d9e4ea 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <header className="mb-12 flex justify-between items-end">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.2em] text-secondary mb-2 font-body">
                Operational Analytics
              </div>
              <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-on-surface uppercase leading-none">
                Store Insights
              </h1>
            </div>
            <div className="flex gap-4">
              <div className="bg-surface-container-high px-4 py-2 flex items-center gap-2">
                <CalendarDays size={16} />
                <span className="text-xs font-bold uppercase tracking-widest font-body">
                  Q3 Performance
                </span>
              </div>
              <button className="bg-primary-container text-on-primary-container hover:bg-primary-fixed-dim transition-colors px-4 py-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 font-body">
                <Download size={16} />
                Export Report
              </button>
            </div>
          </header>

          {/* Revenue Forecast Detailed Chart */}
          <section className="mb-12">
            <div className="bg-surface-container-lowest p-8 border-b-2 border-primary relative shadow-[-10px_10px_20px_-15px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-bold font-headline tracking-tight uppercase text-primary">
                    Revenue Forecast
                  </h2>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1 font-body">
                    Projected vs Actual Gross Margin
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                      Actual
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border border-primary"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                      Forecast
                    </span>
                  </div>
                </div>
              </div>

              {/* Mock Chart Visualization */}
              <div className="h-80 w-full flex items-end gap-1 px-4 border-b border-surface-container-high relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
                  <div className="border-t border-on-surface-variant w-full"></div>
                  <div className="border-t border-on-surface-variant w-full"></div>
                  <div className="border-t border-on-surface-variant w-full"></div>
                  <div className="border-t border-on-surface-variant w-full"></div>
                </div>

                {/* Chart Bars */}
                {mockBars.map((bar, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex-1 bg-surface-container-low group relative",
                      bar.hOuter,
                    )}
                  >
                    <div
                      className={clsx(
                        "absolute inset-x-0 bottom-0 mt-auto bg-primary transition-all group-hover:opacity-100",
                        bar.bgOuter,
                        bar.hInner,
                      )}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                  01 Jan
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                  15 Jan
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                  30 Jan
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                  14 Feb
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                  28 Feb
                </span>
              </div>
            </div>
          </section>

          {/* Payment Methods & Secondary Insights */}
          <div className="grid grid-cols-12 gap-8">
            {/* Payment Breakdown */}
            <div className="col-span-12 xl:col-span-5 bg-surface-container-highest p-8 shadow-[inset_2px_2px_10px_rgba(255,255,255,0.5)]">
              <h2 className="text-xl font-bold font-headline tracking-tight uppercase mb-8">
                Payment Methods
              </h2>
              <div className="space-y-6">
                {/* Credit Card */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30">
                    <CreditCard size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest font-body">
                        Credit Card
                      </span>
                      <span className="text-xs font-medium font-body tracking-wider">
                        64%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-low">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Cash */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30">
                    <Banknote size={24} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest font-body">
                        Cash
                      </span>
                      <span className="text-xs font-medium font-body tracking-wider">
                        22%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-low">
                      <div
                        className="h-full bg-secondary"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* NFC / Digital */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-lowest flex items-center justify-center border border-outline-variant/30">
                    <Nfc size={24} className="text-on-surface-variant" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest font-body">
                        NFC / Digital
                      </span>
                      <span className="text-xs font-medium font-body tracking-wider">
                        14%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-low">
                      <div
                        className="h-full bg-on-surface-variant"
                        style={{ width: "14%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-surface-variant">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 font-body">
                  Top Transaction Density
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black font-headline tracking-tighter">
                    12:00 - 14:00
                  </div>
                  <div className="text-xs font-bold bg-error-container text-on-error-container px-2 py-1 uppercase font-body">
                    +12% Peak
                  </div>
                </div>
              </div>
            </div>

            {/* Data Grid of Inventory Velocity */}
            <div className="col-span-12 xl:col-span-7 bg-surface-container-lowest p-8 overflow-hidden shadow-[-10px_10px_20px_-15px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold font-headline tracking-tight uppercase">
                  Inventory Velocity
                </h2>
                <button className="text-[10px] font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 text-secondary hover:text-primary transition-colors font-body">
                  Full Inventory
                </button>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high">
                    <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
                      Product SKU
                    </th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right font-body">
                      Stock
                    </th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right font-body">
                      Daily Turn
                    </th>
                    <th className="p-3 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right font-body">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {inventoryVelocity.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-surface-container-low transition-colors group"
                    >
                      <td className="p-3 font-medium text-xs font-mono text-outline group-hover:text-primary">
                        {row.sku}
                      </td>
                      <td className="p-3 text-right text-xs font-bold text-on-surface">
                        {row.stock}
                      </td>
                      <td className="p-3 text-right text-xs font-body">
                        {row.turn}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={clsx(
                            "text-[10px] font-bold uppercase px-2 py-1 font-body",
                            row.statusClass,
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Visual Density Indicator */}
              <div className="mt-10 h-48 w-full relative overflow-hidden bg-surface-container-low group cursor-crosshair">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATVHA9f1nrsHJsNbRwR7mALwDHxXUn_K_5P4dt1xktGHglCvqp4Q1tFhF9Xz55wpHUw4tJsBDh1zGPNzL9QQ7m2NZ9hcF4hMSdRZwOmXgPVxvXNb_6bmhZCasH5BHKev1kmsvJTHujj7WD_mLXS3Sa93m22D5TjYW5kNn03aw9b6aus6-2dPOap9X1Bozlilc61IPzPxGTqIQQhCbnLXCjlEEl1BsBu14mGgb1W40G-eMHoVQhHDAT7iN8p84pUbXpcF7SxTygjuc"
                  alt="Aisle layout"
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="text-4xl font-black font-headline tracking-tighter uppercase leading-none">
                    Aisle Velocity Map
                  </div>
                  <Map size={32} className="text-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Data */}
          <footer className="mt-12 py-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
            <div>System Status: All Terminals Online</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span>
                Last Sync:{" "}
                {new Date().toLocaleTimeString("en-US", { hour12: false })} UTC
              </span>
              <span>Engine v4.2.1-ARCH</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  Search,
  MoreVertical,
  X,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockTransactions } from "../data/mockData";
import type { Transaction } from "../data/types";
import clsx from "clsx";

export default function Transactions() {
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  return (
    <div className="flex h-full w-full overflow-hidden bg-surface relative">
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Page Header */}
        <header className="p-10 pb-4">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl font-black font-headline tracking-tighter text-on-surface uppercase">
                Transactions
              </h1>
              <p className="text-sm text-on-surface-variant tracking-[0.1em] font-medium mt-2 uppercase">
                HISTORICAL DATA LEDGER & AUDIT TRAIL
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="SEARCH RECEIPT ID..."
                  className="bg-surface-container-low border-b-2 border-outline px-4 py-2 text-xs font-mono focus:outline-none focus:border-secondary transition-colors w-64 placeholder:text-outline-variant"
                />
                <Search
                  size={16}
                  className="absolute right-2 top-2 text-outline-variant"
                />
              </div>
              <button className="bg-surface-container-high px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                Filter
              </button>
              <button className="bg-surface-container-high px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container-highest transition-colors">
                Export CSV
              </button>
            </div>
          </div>
        </header>

        {/* Transactions Table Module */}
        <section className="p-10 pt-0 flex-grow">
          <div className="bg-surface-container-low border-0 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-dim border-b border-outline-variant/15">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                    Receipt ID
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">
                    Items
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-right">
                    Total
                  </th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-on-surface-variant text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-0">
                {mockTransactions.map((txn, idx) => (
                  <tr
                    key={txn.id}
                    onClick={() => setSelectedTxn(txn)}
                    className={clsx(
                      "transition-colors cursor-pointer group",
                      idx % 2 === 0
                        ? "bg-surface-container-lowest"
                        : "bg-surface-container-low",
                      "hover:bg-surface-bright",
                    )}
                  >
                    <td className="px-6 py-5 font-mono text-xs text-primary font-bold">
                      {txn.orderRef}
                    </td>
                    <td className="px-6 py-5 text-xs text-on-surface-variant font-medium">
                      {txn.timestamp}
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-on-surface">
                      {txn.customerName}
                    </td>
                    <td className="px-6 py-5 text-xs text-on-surface-variant text-right">
                      {txn.items.length.toString().padStart(2, "0")}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={clsx(
                          "inline-block px-2 py-1 text-[9px] font-black uppercase tracking-widest",
                          txn.status === "REFUNDED"
                            ? "bg-error-container text-on-error-container"
                            : "bg-secondary-container text-on-secondary-container",
                        )}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td
                      className={clsx(
                        "px-6 py-5 text-sm font-black text-right tracking-tight",
                        txn.status === "REFUNDED" && "text-error",
                      )}
                    >
                      ${" "}
                      {txn.status === "REFUNDED"
                        ? `(-${txn.total.toFixed(2)})`
                        : txn.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <MoreVertical
                        size={18}
                        className="text-outline group-hover:text-primary mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <footer className="flex justify-between items-center mt-6">
            <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">
              Showing{" "}
              <span className="text-on-surface">
                1 - {mockTransactions.length.toString().padStart(2, "0")}
              </span>{" "}
              of{" "}
              <span className="text-on-surface">{mockTransactions.length}</span>{" "}
              Records
            </p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center bg-surface-container-high hover:bg-surface-container-highest">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-surface-container-high hover:bg-surface-container-highest">
                <ChevronRight size={16} />
              </button>
            </div>
          </footer>
        </section>
      </div>

      {/* Floating Detail Preview Panel */}
      {selectedTxn && (
        <div className="absolute right-0 top-0 h-full w-96 bg-surface-container-lowest border-l border-outline-variant/30 flex flex-col z-20 shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.1)]">
          <div className="p-8 border-b border-outline-variant/15 shrink-0">
            <div className="flex justify-between items-start mb-6">
              <span className="inline-block px-3 py-1 bg-primary text-on-primary text-[10px] font-black uppercase tracking-[0.2em]">
                Live Inspect
              </span>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-outline hover:text-on-surface transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h2 className="text-3xl font-black font-headline tracking-tighter uppercase mb-2">
              RECEIPT {selectedTxn.orderRef}
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
              Transaction Context View
            </p>
          </div>

          <div className="flex-grow p-8 overflow-y-auto">
            <div className="space-y-8">
              {/* Customer Context */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-outline mb-3">
                  Customer Entity
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center text-secondary">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-tight">
                      {selectedTxn.customerName}
                    </h3>
                    <p className="text-[10px] text-on-surface-variant">
                      Terminal ID: {selectedTxn.terminalId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Itemized Manifest */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-outline mb-4">
                  Itemized Manifest
                </p>
                <div className="space-y-4">
                  {selectedTxn.items.length === 0 ? (
                    <p className="text-xs text-on-surface-variant font-medium italic">
                      General sale, unitemized entry.
                    </p>
                  ) : (
                    selectedTxn.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <div>
                          {/* We use mock placeholder name instead of dynamic lookup from inventory since mock data uses inventory ID. In real app, we would join. */}
                          <p className="text-xs font-bold">
                            Item Ref: {item.inventoryId}
                          </p>
                          <p className="text-[9px] text-on-surface-variant uppercase">
                            QTY: {item.quantity.toString().padStart(2, "0")} x $
                            {item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-xs font-mono font-bold">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-6 border-t-2 border-dashed border-outline-variant/30">
                <div className="flex justify-between mb-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface">
                    Subtotal
                  </p>
                  <p className="text-xs font-mono">
                    ${selectedTxn.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                    Tax / Adjustments
                  </p>
                  <p className="text-xs font-mono text-on-surface-variant">
                    ${selectedTxn.tax.toFixed(2)}
                  </p>
                </div>
                <div className="bg-surface-container px-4 py-4 flex justify-between items-center">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em]">
                    Grand Total
                  </p>
                  <p className="text-xl font-black font-headline tracking-tight">
                    ${selectedTxn.total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Signature Visual */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-outline mb-3">
                  Verification Hash
                </p>
                <div className="bg-surface-container-high h-20 w-full flex items-center justify-center p-4">
                  <div className="text-[8px] font-mono text-on-surface-variant break-all leading-tight opacity-40">
                    SHA256: 0x82f2a71d87198f12c85f4e15037d6a59d863f4a0a4c2f8...
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-surface-container-high border-t border-outline-variant/15 flex gap-2 shrink-0">
            <button className="flex-grow bg-white border border-outline px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-lowest transition-colors">
              Reprint Receipt
            </button>
            <button className="flex-grow bg-secondary text-on-secondary px-4 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-secondary-dim transition-colors">
              Send Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

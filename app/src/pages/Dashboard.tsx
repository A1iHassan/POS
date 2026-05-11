import { mockTransactions, mockInventory } from "../data/mockData";
import { History, TrendingUp } from "lucide-react";

export default function Dashboard() {
  // Take top 4 from mock inventory for "Top Selling Items"
  const topSellingItems = mockInventory.slice(0, 4);
  const recentTransactions = mockTransactions.slice(0, 6);

  return (
    <div className="p-8">
      {/* Header Section */}
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">
            OPERATIONAL OVERVIEW
          </h1>
          <p className="text-sm font-medium text-on-surface-variant tracking-widest uppercase mt-1">
            Live Feed • Terminal 01
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-surface-container-low px-4 py-2 border-b-2 border-outline">
            <span className="text-[10px] font-bold uppercase text-on-surface-variant block">
              System Status
            </span>
            <span className="text-xs font-bold text-on-surface">
              ONLINE • 204.1.22
            </span>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Recent Transactions (Large Column) */}
        <section className="col-span-12 lg:col-span-8">
          <div className="bg-surface-container-low border-b-4 border-primary p-1 mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold font-headline tracking-tight px-3 py-2 text-on-surface">
              RECENT TRANSACTIONS
            </h2>
            <History size={20} className="text-on-surface-variant mx-3" />
          </div>

          <div className="bg-surface-container-highest overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-dim">
                <tr>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    ID
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Timestamp
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant">
                {recentTransactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className={`${idx % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low"} hover:bg-surface-bright transition-none group`}
                  >
                    <td className="px-4 py-4 text-xs font-bold text-on-surface">
                      {tx.orderRef}
                    </td>
                    <td className="px-4 py-4 text-xs text-on-surface-variant">
                      {tx.timestamp.split(" | ")[1]}
                    </td>
                    <td className="px-4 py-4 text-xs font-medium text-on-surface">
                      {tx.customerName}
                    </td>
                    <td className="px-4 py-4 text-xs font-black text-on-surface text-right">
                      ${tx.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 ${tx.status === "REFUNDED" ? "text-on-error bg-surface-container-high" : "bg-surface-container-high text-on-surface"} text-[9px] font-black uppercase tracking-tighter`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Selling Items (Sidebar Column) */}
        <section className="col-span-12 lg:col-span-4">
          <div className="bg-surface-container-low border-b-4 border-secondary p-1 mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold font-headline tracking-tight px-3 py-2 text-on-surface">
              TOP SELLING ITEMS
            </h2>
            <TrendingUp size={20} className="text-on-surface-variant mx-3" />
          </div>

          <div className="space-y-4">
            {topSellingItems.map((item, idx) => {
              const borderColors = [
                "border-primary-dim",
                "border-secondary",
                "border-tertiary-dim",
                "border-outline-variant",
              ];
              const borderClass = borderColors[idx % borderColors.length];

              const mockImages = [
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ-VP6J3SzknINArBTPz8qnm_k2a6I3H7JiWVvw4tMCHMKvNTZFtqPwDJuuQEakRK3Zl3WR9bIeJfbnzX0RMRL4X8mNHUtWwqVXMa32EFXSGeUUmJRyWYamt2GMsOZEkXzwO9vOUtDxLoKikhNs3qep_yDI0gkbg19yThdwx3qZWvhfF-6uRc4h5fE_yJWQGigZC5o0VmY1qrJTbC3mIAxKzFiPWrVHHEMkk5gfCVE35Tt_fPYWlR49eI-BZNY1vBTTtXUT23eF9Y",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCBcQRhiF_d1Xc6Ga3Jlkdpji3JN8WhIK-kecHkYHk6Yl7t_ygGdADjOI1lmEhAZnH4Ik2NSnTHmpIlxI9NRjovNreSboVw54yQNMLgDXXm0GkE1TbEKb6hZ5beA0SIQBct3KVdoe74QYNq7tDVG99GhGxeaC8FKXp47KTMWCNol_65EZW6sR5-JcdrTC51STbHDbz3KHtqB_HVgcPUogn8mxEmsIBVkWdU9Ft5pAtbQpx3wLoRiZiTOJ7Y0CMBjFTVJUzUYkopOOQ",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuCBwWxqpXKiysHjzQPkhT-tKLF3XbdEEtGqJgNYMIhOPzrouOp9dumAtQBbz_tCheZD9PJ3DUqRG-k_OmDQ2-U1JA6FxaeAU8lfCbmtK7xSF1toyXWfCUefgRB73A3alFeUsB6T5e99bDuK8DqFw2HLtjU9ZzGcBgSxJg3mFKls8UaJjrnElE_ms_e3uJAdE62DctVrvCVkd48wWXl-SrDNe4ZQdEgxx9j1JoOWCt1Hl9gllO_dAtkFBiuNtnG3qXk3Lx0oPqzwRSo",
                "https://lh3.googleusercontent.com/aida-public/AB6AXuDDmjMOK-meGEZ-zebZwJkV94JXapsofL0_smAgBYrJEFfJz48-8DP0aSxOq8lk_DFSyWBywpx0hxb7ODVoYKWLpKhoLNCw4xWgm99fwd6_7yPaQmoK0KE_mbX06yqGtQiS89NO0Bmgbw76eJADdQ7ILUgKJJm6cyVpkLRK46S8SMgDltjEwwhGpLcbxSmdNm5k_BcwIaWuyegbiyjTVczqzfTN48Rl5IHEtSTi3ELnLnInYeOGzWg0sau3hEzUlzCyqvrkeZ2xITE",
              ];
              const soldCounts = [142, 98, 85, 42];

              return (
                <div
                  key={item.id}
                  className={`bg-surface-container-lowest border-l-8 ${borderClass} p-4 flex gap-4 items-center`}
                >
                  <div className="w-16 h-16 bg-surface-container-high shrink-0">
                    <img
                      src={mockImages[idx]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-black uppercase text-on-surface tracking-tight leading-none">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-on-surface-variant font-medium mt-1">
                      SKU: {item.sku}
                    </p>
                    <div className="mt-2 flex justify-between items-end">
                      <span className="text-lg font-black text-on-surface">
                        ${item.unitPrice.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-bold text-secondary uppercase bg-secondary-container px-2 py-0.5">
                        {soldCounts[idx]} Sold
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="w-full py-3 bg-surface-container-high border-t-2 border-outline-variant text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:bg-surface-dim transition-none">
              View Full Inventory Report
            </button>
          </div>
        </section>
      </div>

      {/* Recessed Footer for Context */}
      <footer className="mt-12 p-6 bg-surface-container border-t border-surface-variant flex justify-between items-center">
        <div className="flex gap-8">
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase block">
              Uptime
            </span>
            <span className="text-xs font-bold text-on-surface">99.98%</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-on-surface-variant uppercase block">
              Sync Status
            </span>
            <span className="text-xs font-bold text-on-surface">CURRENT</span>
          </div>
        </div>
        <div className="text-[10px] font-medium text-on-surface-variant uppercase tracking-widest">
          © 2024 MONOLITH DATA ARCHITECTURE • v4.2.0
        </div>
      </footer>
    </div>
  );
}

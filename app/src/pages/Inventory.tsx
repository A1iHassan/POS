import {
  Search,
  Upload,
  Plus,
  Filter,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockInventory } from "../data/mockData";
import clsx from "clsx";

export default function Inventory() {
  const getMockImage = (sku: string) => {
    if (sku.includes("7892"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy8BP4s96KS3VP-H5xHvtbdHKK8iVdxpfTP12wyU39GU6iWHgbnD19m_D6xxexx3bY9uTfNStuDHHMtISvePKKoVe6Md-5EHPbfHo4MsSKQHVzplqidgqFdMfbMNLzigR1mF9BoabIjU6iKZ9q1uRfiCaHMDahDG-OqnHWBN5hol8dFCHiPv2y58CqKyDY-9D9g1Og8j0Sm-N0ADLtrfmm-6v7MpIq0bErJYZA9upI7pOd9PJXmF10H6_afsh09qWTJD2a-QeFFM";
    if (sku.includes("1200"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuAPsiofBDLnEZbZxNAGs8L3oayc4o_Fd4EbNeQ6bunpDWvmXmVNjQghGEDZxE7fE_-SwQPoGaCa9lwX-_og4Snf4JGfVQAQ-SU8b-G9mvz0IU_vS1rhdW9BKZ0P0n-NMq_HklO6Io_BIYLD2F-ymIU9ZHSFH0dnAScoHJRkwvE8bO43xQ8v1a-26nS--8-o9K3d94_2zpBFxrpSDqiwcEUw5fLDdY3eyk7wam_zx4GglRJnrTWHAMWmUv66qV3cSWYeYXeqg6yDJyQ";
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuAFOLP4fxgx-7y7pkqveMIN3qf5zxpNF5-1Q59C5FlQ-QLVBZfUcGO_in8rzzRnzbVrAx4GyiwuKO6_ttbN2swzyKKn4-3Y8Oc-FAscviaISmVrEPA817FrGDgXrQBaD81siCyfDuOAHQoiyKu9-B3WrjPEGnweCQyi2m3P2sKbLuHUXmkv4mEb0x-YOQ-oZm2PUAkAbjbkSQkyQSbUG03RTV-Yr8ETrpqTCzKf80ZbWi7MMn73XOHIczZySaCXef_hrGnBbrsPs3M";
  };

  const getStatusBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="text-[9px] font-black uppercase bg-on-surface text-surface px-2 py-1 tracking-widest">
          Sold Out
        </span>
      );
    }
    if (stock < 20) {
      return (
        <span className="text-[9px] font-black uppercase bg-error-container text-on-error-container px-2 py-1 tracking-widest">
          Low Stock
        </span>
      );
    }
    return (
      <span className="text-[9px] font-black uppercase bg-surface-container-high text-on-surface px-2 py-1 tracking-widest">
        In Stock
      </span>
    );
  };

  const totalValue = mockInventory.reduce(
    (sum, item) => sum + item.unitPrice * item.stockLevel,
    0,
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Inventory Header & Controls */}
      <header className="p-8 pb-4 flex flex-col gap-6 shrink-0">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold font-headline tracking-tighter uppercase text-primary">
              Inventory Management
            </h1>
            <p className="text-[10px] font-medium font-body text-outline uppercase tracking-widest mt-1">
              Real-time stock synchronization active
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-high px-4 py-2 flex items-center gap-2 hover:bg-surface-dim transition-colors">
              <Upload size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                Export CSV
              </span>
            </button>
            <button className="bg-primary text-on-primary px-4 py-2 flex items-center gap-2 hover:bg-primary-dim transition-colors">
              <Plus size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                Add New Product
              </span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-surface-container-low p-4 flex items-center gap-4 border-b-2 border-outline-variant/15">
          <div className="flex-1 relative border border-transparent focus-within:border-primary-dim transition-colors">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              type="text"
              placeholder="SEARCH BY SKU, NAME, OR BRAND..."
              className="w-full bg-surface-container-highest border-none focus:ring-0 text-[11px] font-bold tracking-widest uppercase py-3 pl-10 placeholder:text-outline focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-3 px-4 min-w-[160px] cursor-pointer hover:bg-surface-dim transition-colors">
              <option>ALL CATEGORIES</option>
              <option>ELECTRONICS</option>
              <option>APPAREL</option>
              <option>ACCESSORIES</option>
            </select>
            <select className="bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-3 px-4 min-w-[160px] cursor-pointer hover:bg-surface-dim transition-colors">
              <option>STOCK STATUS: ALL</option>
              <option>IN STOCK</option>
              <option>LOW STOCK</option>
              <option>OUT OF STOCK</option>
            </select>
            <button className="bg-surface-container-highest p-3 flex items-center justify-center hover:bg-surface-dim transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Data Grid */}
      <section className="flex-1 overflow-auto px-8 pb-8">
        <div className="w-full bg-surface-container-lowest border-none">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-surface-container-high z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  SKU ID
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Product Specification
                </th>
                <th className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Category
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Unit Price
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Stock Level
                </th>
                <th className="px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {mockInventory.map((item, idx) => (
                <tr
                  key={item.id}
                  className={clsx(
                    "transition-colors group",
                    idx % 2 === 0
                      ? "hover:bg-surface-container-low"
                      : "bg-surface-container-low hover:bg-surface-container-high",
                  )}
                >
                  <td className="px-4 py-4 text-[11px] font-bold tracking-tighter text-outline font-mono">
                    {item.sku}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high overflow-hidden shrink-0">
                        <img
                          src={getMockImage(item.sku)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold uppercase text-on-surface leading-tight font-headline">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-outline uppercase tracking-wider font-body">
                          Standard Variant
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-medium font-body bg-secondary-container text-on-secondary-container px-2 py-0.5 tracking-widest uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-[12px] font-bold font-body text-on-surface">
                    ${item.unitPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div
                      className={clsx(
                        "text-[12px] font-bold font-body",
                        item.stockLevel < 20 ? "text-error" : "text-on-surface",
                      )}
                    >
                      {item.stockLevel.toString().padStart(2, "0")}
                    </div>
                    <div
                      className={clsx(
                        "text-[9px] uppercase font-bold tracking-tighter",
                        item.stockLevel < 20 ? "text-error" : "text-outline",
                      )}
                    >
                      {item.stockLevel < 20
                        ? "Threshold: 20"
                        : "Last sync 2m ago"}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {getStatusBadge(item.stockLevel)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-outline hover:text-primary transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button className="text-outline hover:text-primary ml-2 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination & Footer Stats */}
      <footer className="px-8 py-4 bg-surface-container flex justify-between items-center shrink-0 border-t border-outline-variant/15">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold font-body uppercase tracking-widest text-outline">
              Total SKU Count
            </span>
            <span className="text-sm font-extrabold font-headline text-on-surface">
              {mockInventory.length.toString().padStart(4, "0")} Items
            </span>
          </div>
          <div className="w-[1px] h-8 bg-outline-variant/40"></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold font-body uppercase tracking-widest text-outline">
              Inventory Value
            </span>
            <span className="text-sm font-extrabold font-headline text-on-surface">
              $
              {totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold font-body uppercase tracking-widest text-outline">
            Page 1 of 1
          </span>
          <div className="flex gap-1">
            <button className="bg-surface-container-highest p-2 hover:bg-surface-dim transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="bg-primary text-on-primary p-2 hover:bg-primary-dim font-body transition-colors">
              <span className="text-[10px] font-bold px-2">1</span>
            </button>
            <button className="bg-surface-container-highest p-2 hover:bg-surface-dim transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

import {
  Search,
  Upload,
  Plus,
  Filter,
  Pencil,
  MoreVertical,
  Save,
} from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { productsApi } from "../data/productsData";
import type { Products } from "../data/types";

export default function Inventory() {

  const [newProduct, setNewProduct] = useState<Products>({ name: "", quantity: 0, expiry: "", barcode: "" })
  const [adding, setAdding] = useState<boolean>(false)

  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await productsApi.get("")
  })

  const { data: result, mutate } = useMutation({
    mutationFn: async (payload: { name: string, quantity: number, expiry: string }) => {
      return await productsApi.post("", payload)
    }
  })

  if (data) console.log(data.data)

  if (isError) return <div>Failed to load data</div>
  else if (isPending) return <div>Loading data ...</div>

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
            <button
              onClick={() => {
                setAdding(prev => !prev)
                setNewProduct({ name: "", quantity: 0, expiry: "", barcode: "" })
              }}
              className="bg-primary text-on-primary px-4 py-2 flex items-center gap-2 hover:bg-primary-dim transition-colors">
              <Plus size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                {adding ? "Cancel" : "Add New Product"}
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
                <th className="w-100 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Barcode
                </th>
                <th className="w-120 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Name
                </th>
                <th className="w-50 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Quantity
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Expiry
                </th>
                <th className="w-16 px-4 py-3 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant border-b border-outline-variant/20 font-body">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {data?.data?.map((item: Products) => (
                <tr
                  key={item.barcode}
                >
                  <td className="px-4 py-4 font-bold tracking-tighter text-outline font-mono">
                    {item.barcode}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high overflow-hidden shrink-0">
                        {/* add an image of the product here */}
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
                    <span className=" font-medium font-body bg-secondary-container text-on-secondary-container px-2 py-0.5 tracking-widest uppercase">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-[12px] font-bold font-body text-on-surface">
                    {item.expiry}
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
              <tr className={adding ? "" : "hidden"}>
                <td className="px-4 py-4">
                  <input
                    value={newProduct.barcode}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewProduct(prv => ({ ...prv, barcode: e.target.value })) }}
                    type="text" placeholder="Product Name"
                    className="w-full bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-2 px-3 placeholder:text-outline/50 text-on-surface" />
                </td>
                <td className="px-4 py-4">
                  <input
                    value={newProduct.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewProduct(prv => ({ ...prv, name: e.target.value })) }}
                    type="text" placeholder="Product Name"
                    className="w-full bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-2 px-3 placeholder:text-outline/50 text-on-surface" />
                </td>
                <td className="px-4 py-4">
                  <input
                    value={newProduct.quantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewProduct(prv => ({ ...prv, quantity: Number(e.target.value) })) }}
                    type="number" min={0} placeholder="Product Quantity"
                    className="w-full max-w-[140px] bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-2 px-3 placeholder:text-outline/50 text-on-surface" />
                </td>
                <td className="px-4 py-4 text-right">
                  <input
                    value={newProduct.expiry}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setNewProduct(prv => ({ ...prv, expiry: e.target.value })) }}
                    type="text" placeholder="Product Expiry"
                    className="w-full max-w-[140px] bg-surface-container-highest border-none focus:outline-none text-[11px] font-bold tracking-widest uppercase py-2 px-3 text-right placeholder:text-outline/50 text-on-surface" />
                </td>
                <td className="px-4 py-4 text-right">
                  <button
                    disabled={!(newProduct.name && newProduct.expiry && newProduct.quantity > 0)}
                    onClick={async () => {
                      mutate(newProduct)
                    }}
                    className="text-primary hover:text-outline transition-colors">
                    <Save size={16} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination & Footer Stats Should Be Added In The Future*/}
    </div>
  );
}

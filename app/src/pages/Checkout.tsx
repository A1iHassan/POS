import { useState } from "react";
import {
  UserPlus,
  Tag,
  Minus,
  Plus,
  ScanLine,
  Wallet,
  CreditCard,
  QrCode,
  Banknote,
} from "lucide-react";
import { mockInventory } from "../data/mockData";
import type { InventoryItem } from "../data/types";

interface CartItem extends InventoryItem {
  cartQuantity: number;
}

export default function Checkout() {
  // Initialize cart with a few items for demonstration
  const [cart, setCart] = useState<CartItem[]>([
    { ...mockInventory[0], cartQuantity: 2 }, // PRECISION CHRONOGRAPH V1
    { ...mockInventory[1], cartQuantity: 1 }, // ACOUSTIC OVER-EAR STUDIO
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.cartQuantity + delta);
            return { ...item, cartQuantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.cartQuantity > 0),
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.cartQuantity,
    0,
  );
  const taxRate = 0.085;
  const tax = subtotal * taxRate;
  const ecoFee = 2.5;
  const total = subtotal + tax + ecoFee;

  const getMockImage = (sku: string) => {
    if (sku.includes("7892"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCqy8BP4s96KS3VP-H5xHvtbdHKK8iVdxpfTP12wyU39GU6iWHgbnD19m_D6xxexx3bY9uTfNStuDHHMtISvePKKoVe6Md-5EHPbfHo4MsSKQHVzplqidgqFdMfbMNLzigR1mF9BoabIjU6iKZ9q1uRfiCaHMDahDG-OqnHWBN5hol8dFCHiPv2y58CqKyDY-9D9g1Og8j0Sm-N0ADLtrfmm-6v7MpIq0bErJYZA9upI7pOd9PJXmF10H6_afsh09qWTJD2a-QeFFM";
    if (sku.includes("1200"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuAPsiofBDLnEZbZxNAGs8L3oayc4o_Fd4EbNeQ6bunpDWvmXmVNjQghGEDZxE7fE_-SwQPoGaCa9lwX-_og4Snf4JGfVQAQ-SU8b-G9mvz0IU_vS1rhdW9BKZ0P0n-NMq_HklO6Io_BIYLD2F-ymIU9ZHSFH0dnAScoHJRkwvE8bO43xQ8v1a-26nS--8-o9K3d94_2zpBFxrpSDqiwcEUw5fLDdY3eyk7wam_zx4GglRJnrTWHAMWmUv66qV3cSWYeYXeqg6yDJyQ";
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuAFOLP4fxgx-7y7pkqveMIN3qf5zxpNF5-1Q59C5FlQ-QLVBZfUcGO_in8rzzRnzbVrAx4GyiwuKO6_ttbN2swzyKKn4-3Y8Oc-FAscviaISmVrEPA817FrGDgXrQBaD81siCyfDuOAHQoiyKu9-B3WrjPEGnweCQyi2m3P2sKbLuHUXmkv4mEb0x-YOQ-oZm2PUAkAbjbkSQkyQSbUG03RTV-Yr8ETrpqTCzKf80ZbWi7MMn73XOHIczZySaCXef_hrGnBbrsPs3M";
  };

  return (
    <div className="flex h-full bg-surface-container overflow-hidden">
      {/* Left Section: Order Processing */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <header className="mb-10">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-extrabold font-headline tracking-tighter text-on-surface uppercase">
                Current Transaction
              </h2>
              <p className="text-sm font-medium text-on-surface-variant font-body">
                Order Ref: <span className="text-secondary">#TXN-[DRAFT]</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-xs font-bold uppercase font-body transition-all">
                <UserPlus size={16} /> Add Customer
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-xs font-bold uppercase font-body transition-all">
                <Tag size={16} /> Discount
              </button>
            </div>
          </div>
        </header>

        {/* Items List */}
        <div className="flex flex-col gap-[2px]">
          {/* Column Headers */}
          <div className="flex px-6 py-3 bg-surface-container-highest text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant font-body">
            <span className="flex-1">Product Description</span>
            <span className="w-24 text-center">Quantity</span>
            <span className="w-32 text-right">Unit Price</span>
            <span className="w-32 text-right">Subtotal</span>
          </div>

          {/* Product Rows */}
          {cart.map((item, idx) => {
            const bgClasses = [
              "bg-surface-container-lowest border-l-4 border-secondary",
              "bg-surface-container-low",
            ];
            return (
              <div
                key={item.id}
                className={`flex items-center px-6 py-5 ${bgClasses[idx % 2]} group hover:bg-white transition-all`}
              >
                <div className="flex-1 flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container-low overflow-hidden">
                    <img
                      src={getMockImage(item.sku)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-headline text-on-surface">
                      {item.name}
                    </h3>
                    <p className="text-[10px] font-medium text-secondary uppercase tracking-wider font-body">
                      SKU: {item.sku}
                    </p>
                  </div>
                </div>

                <div className="w-24 flex items-center justify-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center bg-surface-container-high hover:bg-secondary hover:text-white transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-black font-headline">
                    {item.cartQuantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center bg-surface-container-high hover:bg-secondary hover:text-white transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="w-32 text-right text-sm font-medium font-body text-on-surface-variant">
                  ${item.unitPrice.toFixed(2)}
                </div>
                <div className="w-32 text-right text-sm font-black font-headline text-on-surface">
                  ${(item.unitPrice * item.cartQuantity).toFixed(2)}
                </div>
              </div>
            );
          })}

          {cart.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant text-sm font-medium">
              Cart is empty. Scan an item to begin.
            </div>
          )}
        </div>

        {/* Quick Add Section */}
        <div className="mt-8">
          <div className="p-6 bg-surface-container-low border-2 border-dashed border-outline-variant flex items-center justify-center gap-4 text-secondary hover:text-on-surface cursor-pointer group transition-colors">
            <ScanLine className="group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest font-body">
              Scan or Search Item (F2)
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Summary & Payment */}
      <div className="w-[450px] bg-surface-container-high flex flex-col shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.05)] z-10 shrink-0 border-l border-outline-variant/15">
        <div className="p-8 flex-1 overflow-y-auto">
          <h2 className="text-xl font-extrabold font-headline tracking-tighter text-on-surface uppercase mb-8 pb-4 border-b border-outline-variant/30">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium uppercase tracking-widest font-body text-secondary">
                Subtotal
              </span>
              <span className="text-sm font-bold font-headline">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium uppercase tracking-widest font-body text-secondary">
                Tax (8.5%)
              </span>
              <span className="text-sm font-bold font-headline">
                ${tax.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium uppercase tracking-widest font-body text-secondary">
                Eco Fee
              </span>
              <span className="text-sm font-bold font-headline">
                ${ecoFee.toFixed(2)}
              </span>
            </div>
            <div className="pt-6 mt-4 border-t-2 border-primary-dim">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest font-body text-on-surface">
                  Total Amount Due
                </span>
                <span className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant font-body mb-4">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border-2 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all">
                <Banknote size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Cash
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-primary text-on-primary hover:bg-primary-dim transition-all ring-4 ring-primary/20">
                <CreditCard size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Credit Card
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-all">
                <QrCode size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Mobile Pay
                </span>
              </button>
              <button className="flex flex-col items-center justify-center gap-3 p-6 bg-white border border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary transition-all">
                <Wallet size={28} />
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Store Credit
                </span>
              </button>
            </div>
          </div>

          {/* Quick Keypad */}
          <div className="mt-8 grid grid-cols-3 gap-1 bg-surface-container-highest p-1">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "."].map(
              (key) => (
                <button
                  key={key}
                  className="py-4 bg-white text-lg font-bold font-headline hover:bg-surface-container-low transition-colors text-on-surface"
                >
                  {key}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 bg-surface-container-highest border-t border-outline-variant/30 mt-auto">
          <div className="flex gap-4">
            <button className="flex-1 py-5 bg-white border border-primary text-primary text-[10px] font-black uppercase tracking-[0.2em] font-body hover:bg-primary-container transition-all">
              Hold Order
            </button>
            <button className="flex-[2] py-5 bg-primary text-on-primary text-[10px] font-black uppercase tracking-[0.2em] font-body hover:bg-primary-dim shadow-xl transition-all">
              Complete Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

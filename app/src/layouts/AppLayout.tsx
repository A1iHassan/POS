import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Monitor,
  ReceiptText,
  Package2,
  LineChart,
  Users,
  Settings,
} from "lucide-react";
import clsx from "clsx";
import { mockStaff } from "../data/mockData";

export default function AppLayout() {
  const navigate = useNavigate();
  const currentUser = mockStaff[1]; // Elena (Store Manager)

  const navItems = [
    { name: "TERMINAL", path: "/", icon: Monitor },
    { name: "TRANSACTIONS", path: "/transactions", icon: ReceiptText },
    { name: "INVENTORY", path: "/inventory", icon: Package2 },
    { name: "REPORTS", path: "/reports", icon: LineChart },
    { name: "CUSTOMERS", path: "/customers", icon: Users },
    { name: "SETTINGS", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full bg-surface overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-low flex flex-col border-r border-outline-variant/15 flex-shrink-0">
        {/* Brand */}
        <div className="pt-8 pb-10 px-8">
          <h1 className="font-headline font-bold text-xl tracking-tight leading-tight">
            MONOLITH POS
          </h1>
          <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">
            TERMINAL 01
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-4 px-4 py-3.5 rounded-lg text-sm font-medium transition-all relative overflow-hidden",
                  isActive
                    ? "bg-surface-container-lowest text-on-surface shadow-[0_2px_12px_rgba(42,52,57,0.04)]"
                    : "text-on-surface-variant hover:bg-surface hover:text-on-surface",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* The active "pill" marker as described in the design plan */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                  <item.icon
                    size={20}
                    className={clsx(
                      "transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant group-hover:text-primary",
                    )}
                  />
                  <span
                    className={clsx(
                      "tracking-wide",
                      isActive ? "font-bold" : "font-medium",
                    )}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Active User & New Transaction Action */}
        <div className="p-6 mt-auto border-t border-outline-variant/15">
          <button
            onClick={() => navigate("/checkout")}
            className="w-full py-3.5 px-4 mb-6 bg-secondary-dim hover:bg-secondary text-white font-bold text-sm tracking-wide rounded-md shadow-sm transition-all text-center"
          >
            + NEW TRANSACTION
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded shadow-sm bg-surface-container-lowest border border-outline-variant/15 flex items-center justify-center overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">
                {currentUser.name}
              </p>
              <p className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">
                ID: {currentUser.employeeId.split("-")[1]}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto relative bg-surface">
        <Outlet />
      </main>
    </div>
  );
}

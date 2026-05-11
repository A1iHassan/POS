import {
  Search,
  UserPlus,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  History,
  HelpCircle,
} from "lucide-react";
import { mockStaff } from "../data/mockData";
import clsx from "clsx";

export default function Customers() {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "SYSTEM ADMIN":
        return (
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-primary text-on-primary">
            System Admin
          </span>
        );
      case "STORE MANAGER":
        return (
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-secondary-container text-on-secondary-container">
            Store Manager
          </span>
        );
      case "CASHIER JUNIOR":
        return (
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-surface-variant text-on-surface-variant">
            Cashier Junior
          </span>
        );
      case "CASHIER SENIOR":
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-surface-variant text-on-surface-variant">
            Cashier Senior
          </span>
        );
    }
  };

  const getMockAvatar = (id: string, name: string) => {
    if (name.includes("Marcus"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuAF5kOpDV85CQpfzVanvpy5ACV3VBUENOfJrFOpvmkdnkY0DjkPCJTk9bc6ZDXyXhwcP7_ij36V-H4RdDvtICdlTEGDA1fCyssb0ogg63zHJ-tzGfPaQN9ZDSViIa6SrdJGqfPLetkQPEPh5ldzTWySoLwVBPP91RFmcoSmmqy7zWCdEgfOd3IF7KC_K27eKg0REKbK3mgMc0fC_8-r_OZv5iPZJbbPh6wNvcAxXQuxoEpjETTmtpAizV19uyqR30qYRJgvRCmSsEo";
    if (name.includes("Elena"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUx85yBbgi0eE6xajn-uZcJhGhT7CzDL_iva-V7jiqSG3Qlh5sWAWOs_5a0jAstRSAvKSCH7AGDpPhlCIuryd-AEwLQdzFAirKC99Nie-LoftCk2rt81RXs8CIDCG-nq0ldqyKEwSwVtyiyOJ_XFaeDibhmfRchgjitk2urjDVPSt6QFcSz4tJBzw4mPfoxHWGUAUkwmy2dFZ2ja_Mrf_5TZeG-mBI6u3FPvHgu3qfOiLTCUDaBz9IBsy9mz94bHtazeELMWAn0A";
    if (name.includes("Julian"))
      return "https://lh3.googleusercontent.com/aida-public/AB6AXuB6U-miHU2BsFakE4Bu0CYr6-V9TMrcBZOAdCFZS4OzRxTB_ikgUvPGwTMc4laLydi-sBdhYkeYMwlLJFqHuvoDTFEqMvcEmuLKQvvc8nLFSXqj4GnvQjiucK_eM07rjIdRlOA1wKPOmFMCl2u_6Uo2nYsIAlO_SfjG20ckRTp6DaSoSRVC-ORevog-77Z3U7bCqUpvKiLbnzNb-q5_ZoyEoYUPIj1tB31hfrjTB_ksgw7DeHDioE6CAaQeqLtgUuRdvMegdDds2mk";
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuBgDM9KhNVTSUpkrrVN6BeGpYJqE_41a9_3qku8Ci2ZVtRZcccbvuHemi85hl4m9wturHnXRHPH1IGaX5gIVrrrJVgdmyxY89CuVj_p_A8z2838J5TPQcWk8RF8k3u2ctF5w0go3zD5EzeMQJggHDeLxZOJ1mM0h2lnYB0InOFZcR79sY9DRpgrIi1UEbDtC4YM78i8FMchztMnR1JiY1CnPUq2WnotsB0RWc24jwJhUPRF4N5A_KY2bFVoTbMBq9HDnPwSt2u7Yqg";
  };

  const activeStaff = mockStaff.filter((s) => s.isOnline).length;
  const offlineStaff = mockStaff.length - activeStaff;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden relative">
      {/* Header Section */}
      <header className="p-8 pb-4 flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-4xl font-extrabold font-headline tracking-tighter text-on-surface uppercase">
            Staff Directory
          </h1>
          <p className="text-sm font-medium font-body text-on-surface-variant mt-1 tracking-wide">
            User roles and permission management architecture.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
            />
            <input
              className="bg-surface-container-low border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-xs w-64 pl-10 h-10 placeholder:uppercase font-body placeholder:tracking-widest"
              placeholder="Search UUID or Name..."
              type="text"
            />
          </div>
          <button className="bg-secondary text-on-secondary px-6 h-10 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-secondary-dim transition-colors font-body">
            <UserPlus size={16} />
            Onboard Staff
          </button>
        </div>
      </header>

      {/* Primary Layout: Asymmetric Bento Grid */}
      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-12 gap-6 overflow-y-auto">
        {/* Staff List Module (Left 8 Columns) */}
        <section className="col-span-1 md:col-span-12 xl:col-span-8 flex flex-col h-full bg-surface-container-low shadow-sm">
          <div className="bg-surface-container-high px-6 py-3 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
              Active Directory Registry
            </span>
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-outline font-body">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600"></span> {activeStaff}{" "}
                Online
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-slate-400"></span> {offlineStaff}{" "}
                Offline
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto min-h-[300px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest border-b border-outline-variant/15">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                    Identity
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                    System Role
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                    Terminal Access
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-body">
                    Last Session
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant text-right font-body">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {mockStaff.map((staff, idx) => (
                  <tr
                    key={staff.id}
                    className={clsx(
                      "transition-colors cursor-pointer group",
                      idx % 2 === 0
                        ? "bg-surface-container-lowest hover:bg-white"
                        : "bg-surface hover:bg-white",
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-surface-container shrink-0">
                          <img
                            className="w-full h-full object-cover"
                            alt={staff.name}
                            src={getMockAvatar(staff.id, staff.name)}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold font-headline text-on-surface">
                            {staff.name}
                          </span>
                          <span className="text-[10px] font-mono text-outline uppercase tracking-tighter">
                            {staff.employeeId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(staff.role)}</td>
                    <td className="px-6 py-4 text-xs font-medium font-body text-on-surface-variant">
                      {staff.terminalAccess.length === 0
                        ? "No Access"
                        : staff.terminalAccess.length > 2
                          ? "All Terminals"
                          : `Terminals ${staff.terminalAccess.map((t) => t.replace("term_", "0")).join(", ")}`}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium font-body text-on-surface-variant">
                      {staff.isOnline ? "Active Now" : staff.lastSession}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-outline hover:text-primary transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-surface-container-high px-6 py-4 flex justify-between items-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-body">
              Displaying {mockStaff.length} of {mockStaff.length} entries
            </span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center bg-surface-container-lowest text-on-surface border border-outline-variant/15 text-[10px] font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-surface-container-lowest text-on-surface-variant text-[10px] font-bold">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-surface-container-lowest text-on-surface-variant text-[10px] font-bold">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-transparent hover:bg-surface-container-lowest text-on-surface-variant text-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Role Configuration Module (Right 4 Columns) */}
        <section className="col-span-1 md:col-span-12 xl:col-span-4 flex flex-col gap-6 overflow-hidden">
          {/* Permissions Overview */}
          <div className="bg-primary p-6 flex flex-col gap-6 text-on-primary h-fit shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-80 font-body">
                Quick Config
              </span>
              <ShieldAlert size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-headline tracking-tighter leading-none uppercase">
                Role Hierarchies
              </h2>
              <p className="text-xs mt-2 opacity-80 leading-relaxed font-medium font-body">
                Define granular access levels for terminal operations and
                financial reporting.
              </p>
            </div>
            <div className="space-y-4 pt-4 border-t border-on-primary/10">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Can Void Transaction
                </span>
                <div className="w-8 h-4 bg-on-primary/20 relative cursor-pointer hover:bg-on-primary/30 transition-colors">
                  <div className="absolute right-0 top-0 w-4 h-4 bg-on-primary"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  Access Cash Drawer
                </span>
                <div className="w-8 h-4 bg-on-primary/20 relative cursor-pointer hover:bg-on-primary/30 transition-colors">
                  <div className="absolute right-0 top-0 w-4 h-4 bg-on-primary"></div>
                </div>
              </div>
              <div className="flex justify-between items-center opacity-50">
                <span className="text-[10px] font-bold uppercase tracking-widest font-body">
                  View Profit Margin
                </span>
                <div className="w-8 h-4 bg-on-primary/20 relative cursor-pointer hover:bg-on-primary/30 transition-colors">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-on-primary/40"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Role Details (Recessed Style) */}
          <div className="bg-surface-container-highest flex-1 p-6 flex flex-col gap-6 border-l-4 border-secondary shadow-inner">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary font-body">
                Operational Context
              </span>
              <h3 className="text-xl font-bold font-headline text-on-surface uppercase tracking-tight">
                Security Audit
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-lowest p-4 flex flex-col gap-2 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-body">
                    Active Alerts
                  </span>
                  <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-black font-body">
                    02
                  </span>
                </div>
                <p className="text-[11px] font-medium text-on-surface leading-tight font-body">
                  Unusual login pattern detected on Terminal 01 (UUID-5542-BR).
                </p>
              </div>
              <div className="bg-surface-container-lowest p-4 flex flex-col gap-2 shadow-sm">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest font-body">
                  Recent Policy Change
                </span>
                <div className="flex items-center gap-2">
                  <History size={14} className="text-secondary shrink-0" />
                  <p className="text-[11px] font-medium text-on-surface leading-tight font-body">
                    MFA requirement enabled for "System Admin" group.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-6 flex flex-col gap-3">
              <button className="w-full h-12 border-2 border-outline text-on-surface text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-low transition-colors font-body">
                Generate Access Logs
              </button>
              <button className="w-full h-12 bg-on-surface text-surface text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors font-body">
                Update Global Policies
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Contextual "Help" Overlay (Brutalist Minimalist) */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end gap-2 group z-50">
        <div className="bg-on-surface text-surface text-[10px] font-bold uppercase tracking-widest py-2 px-4 shadow-xl mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-body">
          System Documentation
        </div>
        <button className="w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center hover:bg-secondary-dim transition-all shadow-lg">
          <HelpCircle size={24} />
        </button>
      </div>
    </div>
  );
}

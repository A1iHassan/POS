import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Auth from "./pages/auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Analytics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

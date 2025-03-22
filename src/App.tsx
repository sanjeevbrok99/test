
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rules from "./pages/Rules";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import FraudDetection from "./pages/FraudDetection";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import RiskScoring from "./pages/RiskScoring";
import UserAnalysis from "./pages/UserAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/risk-scoring" element={<RiskScoring />} />
              <Route path="/user-analysis" element={<UserAnalysis />} />
              <Route path="/fraud-detection" element={<FraudDetection />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/components/cart/CartProvider";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { UserProvider } from "@/components/auth/UserProvider";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout><Index /></MainLayout>} />
                <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
                <Route path="/products/category/:id" element={<MainLayout><Products /></MainLayout>} />
                <Route path="/product/:id" element={<MainLayout><ProductDetails /></MainLayout>} />
                <Route path="/search" element={<MainLayout><Search /></MainLayout>} />
                <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
                <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
                <Route path="/account" element={<MainLayout><Account /></MainLayout>} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

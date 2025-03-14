
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/SearchBar";
import CategoriesMenu from "./CategoriesMenu";
import UserNavigation from "./UserNavigation";
import { useCart } from "@/components/cart/CartProvider";
import { useLocation } from "react-router-dom";

export default function DesktopNav() {
  const { openCart, itemCount } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="hidden lg:block">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Text-based Logo */}
          <Link to="/" className="text-2xl font-bold text-pharma-600 flex items-center">
            <span className="bg-gradient-to-r from-pharma-600 to-pharma-700 bg-clip-text text-transparent">
              PharmaConnect
            </span>
          </Link>

          {/* Categories Menu right beside the logo */}
          <div className="ml-6">
            <CategoriesMenu />
          </div>
          
          {/* Search Bar (only visible on non-homepage) */}
          {!isHomePage && (
            <div className="flex-1 mx-8">
              <SearchBar />
            </div>
          )}

          {/* Right side items: Login/Register and Cart */}
          <div className="flex items-center space-x-4">
            <UserNavigation />
            
            {/* Shopping Cart - moved to far right */}
            <Button
              variant="outline"
              size="icon"
              onClick={openCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

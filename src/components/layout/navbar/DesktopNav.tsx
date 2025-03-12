
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/ui/SearchBar";
import CategoriesMenu from "./CategoriesMenu";
import UserNavigation from "./UserNavigation";
import { useCart } from "@/components/cart/CartProvider";

export default function DesktopNav() {
  const { openCart, itemCount } = useCart();
  
  return (
    <div className="hidden lg:block">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold text-pharma-600">
              <img
                src="/lovable-uploads/90a10636-03a6-45ff-b6c5-6b9dd342bfd7.png"
                alt="Farmatodo"
                className="h-10"
              />
            </Link>

            <CategoriesMenu />
          </div>

          <div className="flex-1 mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            <UserNavigation />
            
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

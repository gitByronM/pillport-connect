
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { categories } from './categories';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

export default function CategoriesNavbar() {
  return (
    <div className="container mx-auto px-4">
      <NavigationMenu className="w-full justify-start py-2">
        <NavigationMenuList className="flex-wrap">
          {categories.map((category, idx) => (
            <NavigationMenuItem key={idx} className="mr-1">
              <NavigationMenuTrigger className="font-medium text-sm px-3 py-2 h-9">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <div className="grid grid-cols-1 gap-3 p-4 w-[220px]">
                  <h4 className="font-medium text-sm text-pharma-700 border-b pb-2 mb-1">
                    {category.name}
                  </h4>
                  <ul className="space-y-2">
                    {category.subcategories.map((sub, subIdx) => (
                      <li key={subIdx}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/products/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className={cn(
                              "block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-pharma-50 hover:text-pharma-700"
                            )}
                          >
                            {sub}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

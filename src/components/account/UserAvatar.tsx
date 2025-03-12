
import { useUserContext } from '@/components/auth/UserProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  LogOut, 
  Settings,
  ShoppingBag,
  Heart,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar() {
  const { isLoggedIn, userProfile, logout } = useUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!isLoggedIn) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-1 focus:outline-none">
          <Avatar className="h-8 w-8 border-2 border-pharma-100">
            <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.name} />
            <AvatarFallback className="bg-pharma-100 text-pharma-600">
              {userProfile?.name.charAt(0)}{userProfile?.surname.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-sm font-medium">
            {userProfile ? `Hola, ${userProfile.name}` : 'Mi cuenta'}
          </span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigate('/account?tab=contact-info')}>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/account?tab=addresses')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Direcciones</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/account?tab=purchase-history')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>Mis compras</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate('/account?tab=favorites')}>
          <Heart className="mr-2 h-4 w-4" />
          <span>Favoritos</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


import { 
  User, MapPin, ShoppingBag, Heart, LogOut
} from 'lucide-react';
import { useUserContext } from '@/components/auth/UserProvider';

type AccountTab = 'contact-info' | 'addresses' | 'purchase-history' | 'favorites';

interface AccountSidebarProps {
  activeTab: AccountTab;
  setActiveTab: (tab: AccountTab) => void;
}

export default function AccountSidebar({ activeTab, setActiveTab }: AccountSidebarProps) {
  const { logout } = useUserContext();

  const menuItems = [
    { id: 'contact-info', label: 'Información y Contraseña', icon: User },
    { id: 'addresses', label: 'Direcciones', icon: MapPin },
    { id: 'purchase-history', label: 'Historial de Compras', icon: ShoppingBag },
    { id: 'favorites', label: 'Favoritos', icon: Heart },
  ];

  return (
    <aside className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-pharma-600">Mi Cuenta</h2>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id as AccountTab)}
                className={`w-full flex items-center p-3 text-left rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-pharma-50 text-pharma-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-4">
        <button
          onClick={logout}
          className="w-full flex items-center p-3 text-left rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

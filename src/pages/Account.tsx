
import { useState, useEffect } from 'react';
import { useUserContext } from '@/components/auth/UserProvider';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AccountSidebar from '@/components/account/AccountSidebar';
import ContactInfo from '@/components/account/ContactInfo';
import Addresses from '@/components/account/Addresses';
import PurchaseHistory from '@/components/account/PurchaseHistory';
import Favorites from '@/components/account/Favorites';
import { toast } from 'sonner';

type AccountTab = 'contact-info' | 'addresses' | 'purchase-history' | 'favorites';

export default function Account() {
  const { isLoggedIn, userProfile } = useUserContext();
  const { isAuthenticated, getAuthUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AccountTab>('contact-info');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if authenticated with Supabase but profile not loaded
    const checkAuth = async () => {
      setIsLoading(true);
      if (isAuthenticated && !userProfile) {
        try {
          const { user } = await getAuthUser();
          if (!user) {
            // If no user exists in Supabase, redirect to home
            navigate('/');
          }
        } catch (error) {
          console.error("Error checking auth:", error);
          toast.error("Error al verificar la autenticación");
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [isAuthenticated, userProfile, getAuthUser, navigate]);

  useEffect(() => {
    // Parse the tab from URL query params
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as AccountTab;
    if (tab && ['contact-info', 'addresses', 'purchase-history', 'favorites'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  const handleTabChange = (tab: AccountTab) => {
    setActiveTab(tab);
    navigate(`/account?tab=${tab}`);
  };

  // Check if user is authenticated using both auth systems
  if (!isLoading && !isLoggedIn && !isAuthenticated) {
    toast.error("Necesitas iniciar sesión para acceder a esta página");
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mb-10 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pharma-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando información de tu cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mb-10">
      <h1 className="text-2xl font-bold text-pharma-600 mb-6">Mi cuenta</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <AccountSidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
        
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow p-6">
          {activeTab === 'contact-info' && <ContactInfo />}
          {activeTab === 'addresses' && <Addresses />}
          {activeTab === 'purchase-history' && <PurchaseHistory />}
          {activeTab === 'favorites' && <Favorites />}
        </div>
      </div>
    </div>
  );
}

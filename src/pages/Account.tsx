
import { useState } from 'react';
import { useUserContext } from '@/components/auth/UserProvider';
import { Redirect } from 'react-router-dom';
import AccountSidebar from '@/components/account/AccountSidebar';
import ContactInfo from '@/components/account/ContactInfo';
import Addresses from '@/components/account/Addresses';
import PurchaseHistory from '@/components/account/PurchaseHistory';
import Favorites from '@/components/account/Favorites';

type AccountTab = 'contact-info' | 'addresses' | 'purchase-history' | 'favorites';

export default function Account() {
  const { isLoggedIn } = useUserContext();
  const [activeTab, setActiveTab] = useState<AccountTab>('contact-info');

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-pharma-600 mb-6">Mi cuenta</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Menu */}
        <div className="w-full md:w-1/4">
          <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        {/* Main Content */}
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

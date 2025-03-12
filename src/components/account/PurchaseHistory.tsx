
import { useUserContext } from '@/components/auth/UserProvider';
import { ShoppingBag, Package, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Purchase } from '@/types/user';

export default function PurchaseHistory() {
  const { purchases } = useUserContext();
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  
  // Format date to locale string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status styles
  const getStatusDetails = (status: Purchase['status']) => {
    switch (status) {
      case 'completed':
        return { 
          label: 'Completado', 
          icon: Check, 
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100'
        };
      case 'shipped':
        return { 
          label: 'Enviado', 
          icon: Package, 
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'delivered':
        return { 
          label: 'Entregado', 
          icon: Check, 
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'cancelled':
        return { 
          label: 'Cancelado', 
          icon: X, 
          color: 'text-red-600',
          bgColor: 'bg-red-100'
        };
      default:
        return { 
          label: 'Desconocido', 
          icon: ShoppingBag, 
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const handleViewPurchase = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
  };

  const handleCloseDetails = () => {
    setSelectedPurchase(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-pharma-600">Historial de Compras</h2>
      </div>

      {selectedPurchase ? (
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium">Pedido #{selectedPurchase.orderNumber}</h3>
              <p className="text-gray-500 text-sm">Realizado el {formatDate(selectedPurchase.date)}</p>
            </div>
            <button 
              onClick={handleCloseDetails}
              className="text-pharma-600 hover:text-pharma-700 font-medium"
            >
              Volver al historial
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-gray-700 font-medium mr-2">Estado:</span>
              <span className={`${getStatusDetails(selectedPurchase.status).bgColor} ${getStatusDetails(selectedPurchase.status).color} px-3 py-1 rounded-full inline-flex items-center`}>
                <getStatusDetails(selectedPurchase.status).icon className="mr-1 h-4 w-4" />
                {getStatusDetails(selectedPurchase.status).label}
              </span>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedPurchase.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded object-cover" src={item.imageUrl} alt={item.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      Bs. {item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      Bs. {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-right text-sm font-medium text-gray-500">
                    Total
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    Bs. {selectedPurchase.total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : purchases.length > 0 ? (
        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg p-4 border hover:shadow-md transition-shadow">
              <div className="md:flex justify-between items-center">
                <div className="flex items-center mb-2 md:mb-0">
                  <ShoppingBag className="h-6 w-6 text-pharma-500 mr-3" />
                  <div>
                    <p className="font-medium">Pedido #{purchase.orderNumber}</p>
                    <p className="text-sm text-gray-500">{formatDate(purchase.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div>
                    <span className={`${getStatusDetails(purchase.status).bgColor} ${getStatusDetails(purchase.status).color} px-2 py-1 rounded-full text-xs inline-flex items-center`}>
                      <getStatusDetails(purchase.status).icon className="mr-1 h-3 w-3" />
                      {getStatusDetails(purchase.status).label}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-gray-700 font-medium">Bs. {purchase.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{purchase.items.length} productos</p>
                  </div>
                  
                  <button 
                    onClick={() => handleViewPurchase(purchase)}
                    className="text-pharma-600 hover:text-pharma-700 text-sm font-medium"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No tienes compras recientes</h3>
          <p className="text-gray-500">Tus pedidos se mostrarán aquí cuando realices una compra.</p>
        </div>
      )}
    </div>
  );
}


import { useUserContext } from '@/components/auth/UserProvider';
import { Heart, ShoppingCart, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useUserContext();

  const handleRemove = (id: string) => {
    removeFromFavorites(id);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-pharma-600">Mis Favoritos</h2>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex flex-col h-full">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="h-32 w-full object-cover rounded-md mb-3" 
                  />
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </button>
                </div>

                <h3 className="font-medium text-gray-900 mb-1 flex-grow">{item.name}</h3>
                <p className="text-pharma-600 font-semibold mb-3">Bs. {item.price.toFixed(2)}</p>
                
                {item.inStock ? (
                  <Button className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Agregar al carrito
                  </Button>
                ) : (
                  <Button disabled className="w-full bg-gray-300 hover:bg-gray-300 cursor-not-allowed">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Sin stock
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <Heart className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No tienes favoritos</h3>
          <p className="text-gray-500">Los productos que marques como favoritos se mostrarán aquí.</p>
        </div>
      )}
    </div>
  );
}

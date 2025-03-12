
import { useState } from 'react';
import { useUserContext } from '@/components/auth/UserProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Check, Trash2, Edit2 } from 'lucide-react';
import { Address } from '@/types/user';

export default function Addresses() {
  const { addresses, addAddress, updateAddress, removeAddress } = useUserContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false
  });

  const handleAddNew = () => {
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: addresses.length === 0 // Make default if first address
    });
    setIsAdding(true);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault
    });
    setEditingId(address.id);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSetDefault = (id: string) => {
    updateAddress(id, { isDefault: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      updateAddress(editingId, formData);
      setEditingId(null);
    } else {
      addAddress(formData);
      setIsAdding(false);
    }
    
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      isDefault: false
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta dirección?')) {
      removeAddress(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-pharma-600">Mis Direcciones</h2>
        {!isAdding && !editingId && (
          <Button onClick={handleAddNew}>
            <MapPin className="mr-2 h-4 w-4" />
            Agregar nueva dirección
          </Button>
        )}
      </div>

      {(isAdding || editingId) ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border">
          <h3 className="text-lg font-medium mb-4">
            {editingId ? 'Editar dirección' : 'Agregar nueva dirección'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la dirección</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ej: Casa, Trabajo, etc."
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="street">Dirección / Calle</Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="Av. Principal, Edificio, Apto, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Ciudad"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="Estado"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Código Postal</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="Código Postal"
                required
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-pharma-600 focus:ring-pharma-500"
                disabled={addresses.length === 0} // Force default if it's the first address
              />
              <Label htmlFor="isDefault">Establecer como dirección predeterminada</Label>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button type="submit" className="bg-pharma-600 hover:bg-pharma-700">
              {editingId ? 'Guardar cambios' : 'Agregar dirección'}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      ) : addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className={`bg-white rounded-lg p-4 border ${address.isDefault ? 'border-pharma-500' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{address.name}</h3>
                  {address.isDefault && (
                    <span className="text-sm bg-pharma-100 text-pharma-600 px-2 py-0.5 rounded-full inline-flex items-center">
                      <Check className="mr-1 h-3 w-3" />
                      Predeterminada
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEdit(address)}
                    className="text-gray-500 hover:text-pharma-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(address.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2 text-gray-600 text-sm space-y-1">
                <p>{address.street}</p>
                <p>{address.city}, {address.state}</p>
                <p>CP: {address.zipCode}</p>
              </div>

              {!address.isDefault && (
                <Button 
                  variant="outline" 
                  className="mt-3 text-xs h-auto py-1" 
                  onClick={() => handleSetDefault(address.id)}
                >
                  Establecer como predeterminada
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No tienes direcciones guardadas</h3>
          <p className="text-gray-500">Agrega una dirección para facilitar tus pedidos.</p>
        </div>
      )}
    </div>
  );
}

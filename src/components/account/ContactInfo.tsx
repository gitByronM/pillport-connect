
import { useState } from 'react';
import { useUserContext } from '@/components/auth/UserProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Edit2, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '@/types/user';

export default function ContactInfo() {
  const { userProfile, updateUserProfile } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(userProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('********');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!userProfile || !editedProfile) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedProfile) {
      updateUserProfile(editedProfile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
  };

  const handleSavePassword = () => {
    // In a real app, you would validate current password and update it
    console.log('Password updated to:', newPassword);
    setCurrentPassword('********');
    setNewPassword('');
    setIsChangingPassword(false);
    setShowPassword(false);
  };

  const handleCancelPassword = () => {
    setNewPassword('');
    setIsChangingPassword(false);
    setShowPassword(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };

  const handleGenderChange = (value: 'male' | 'female') => {
    setEditedProfile(prev => {
      if (!prev) return prev;
      return { ...prev, gender: value };
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-pharma-600">Información de Contacto y Contraseña</h2>
      </div>

      <div className="bg-white rounded-lg">
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">Tu información personal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={editedProfile.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{userProfile.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="surname">Apellido</Label>
              {isEditing ? (
                <Input
                  id="surname"
                  name="surname"
                  value={editedProfile.surname}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{userProfile.surname}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="flex items-center">
                <span className="text-gray-700">{userProfile.email}</span>
                {!isEditing && <Check className="ml-2 h-5 w-5 text-green-500" />}
              </div>
              <p className="text-sm text-gray-500">Verificado</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              {isEditing ? (
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-4 md:col-span-3">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={editedProfile.phonePrefix}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phonePrefix: e.target.value })}
                    >
                      <option value="0412">0412</option>
                      <option value="0414">0414</option>
                      <option value="0416">0416</option>
                      <option value="0424">0424</option>
                      <option value="0426">0426</option>
                    </select>
                  </div>
                  <div className="col-span-8 md:col-span-9">
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={editedProfile.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{`${userProfile.phonePrefix}-${userProfile.phoneNumber}`}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="idType">Tipo de Documento</Label>
              {isEditing ? (
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editedProfile.idType}
                  onChange={(e) => setEditedProfile({ ...editedProfile, idType: e.target.value })}
                >
                  <option value="CÉDULA DE IDENTIDAD">CÉDULA DE IDENTIDAD</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="DNI">DNI</option>
                </select>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{userProfile.idType}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Número de Documento</Label>
              {isEditing ? (
                <Input
                  id="documentNumber"
                  name="documentNumber"
                  value={editedProfile.documentNumber}
                  onChange={handleInputChange}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{userProfile.documentNumber}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label>Género</Label>
              {isEditing ? (
                <RadioGroup 
                  value={editedProfile.gender} 
                  onValueChange={(value) => handleGenderChange(value as 'male' | 'female')}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Mujer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Hombre</Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">{userProfile.gender === 'male' ? 'Hombre' : 'Mujer'}</span>
                </div>
              )}
            </div>
          </div>

          {!isEditing ? (
            <Button onClick={handleEdit} className="mt-6">
              <Edit2 className="mr-2 h-4 w-4" />
              Editar información
            </Button>
          ) : (
            <div className="flex gap-4 mt-6">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                Guardar cambios
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          )}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-medium mb-4">Contraseña</h3>
          
          {!isChangingPassword ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">Contraseña actual</p>
                  <p className="text-gray-500 text-sm">********</p>
                </div>
                <Button onClick={handleChangePassword}>
                  Cambiar contraseña
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Contraseña actual</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nueva contraseña</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={handleSavePassword} className="bg-green-600 hover:bg-green-700">
                  Guardar nueva contraseña
                </Button>
                <Button variant="outline" onClick={handleCancelPassword}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Smartphone, Mail, MessageSquare } from 'lucide-react';

type PasswordRecoveryFormData = {
  recoveryMethod: 'sms' | 'email' | 'whatsapp';
};

const recoverySchema = z.object({
  recoveryMethod: z.enum(['sms', 'email', 'whatsapp'], {
    required_error: 'Seleccione un método para recibir el código',
  }),
});

type PasswordRecoveryFormProps = {
  onSwitchToLogin: () => void;
  onRecoverySuccess?: () => void;
};

export default function PasswordRecoveryForm({
  onSwitchToLogin,
  onRecoverySuccess,
}: PasswordRecoveryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<PasswordRecoveryFormData>({
    resolver: zodResolver(recoverySchema),
    mode: 'onChange',
    defaultValues: {
      recoveryMethod: 'sms'
    }
  });

  const selectedMethod = watch('recoveryMethod');

  // Mock user data - in a real app, this would come from your backend
  const maskedPhone = '58041******2930';
  const maskedEmail = 'byronmira******@gmail.com';

  const handleMethodSelection = (value: 'sms' | 'email' | 'whatsapp') => {
    setValue('recoveryMethod', value, { shouldValidate: true });
  };

  const onSubmit = async (data: PasswordRecoveryFormData) => {
    try {
      console.log('Recovery method selected:', data.recoveryMethod);
      // Here you would typically send the request to your backend API
      
      if (onRecoverySuccess) {
        onRecoverySuccess();
      }
    } catch (error) {
      console.error('Recovery error:', error);
    }
  };

  return (
    <div className="space-y-4 py-2 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-pharma-600">
          Recuperar contraseña
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          ¿Dónde quieres recibir el código para restablecer la contraseña?
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <RadioGroup
          defaultValue="sms"
          value={selectedMethod}
          onValueChange={handleMethodSelection}
          className="space-y-4"
        >
          <div 
            className={`flex items-center space-x-3 border rounded-md p-3 ${selectedMethod === 'sms' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
            onClick={() => handleMethodSelection('sms')}
          >
            <RadioGroupItem value="sms" id="sms" />
            <Smartphone className="w-6 h-6 text-pharma-500" />
            <div className="flex flex-col">
              <Label htmlFor="sms" className="font-medium">Enviar código por SMS</Label>
              <span className="text-sm text-gray-500">{maskedPhone}</span>
            </div>
          </div>
          
          <div 
            className={`flex items-center space-x-3 border rounded-md p-3 ${selectedMethod === 'email' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
            onClick={() => handleMethodSelection('email')}
          >
            <RadioGroupItem value="email" id="email" />
            <Mail className="w-6 h-6 text-pharma-500" />
            <div className="flex flex-col">
              <Label htmlFor="email" className="font-medium">Enviar código por correo electrónico</Label>
              <span className="text-sm text-gray-500">{maskedEmail}</span>
            </div>
          </div>
          
          <div 
            className={`flex items-center space-x-3 border rounded-md p-3 ${selectedMethod === 'whatsapp' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
            onClick={() => handleMethodSelection('whatsapp')}
          >
            <RadioGroupItem value="whatsapp" id="whatsapp" />
            <MessageSquare className="w-6 h-6 text-pharma-500" />
            <div className="flex flex-col">
              <Label htmlFor="whatsapp" className="font-medium">Enviar código por WhatsApp</Label>
              <span className="text-sm text-gray-500">{maskedPhone}</span>
            </div>
          </div>
        </RadioGroup>

        {errors.recoveryMethod && (
          <p className="text-red-500 text-xs">{errors.recoveryMethod.message}</p>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || !selectedMethod}
        >
          {isSubmitting ? "Procesando..." : "Enviar código"}
        </Button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-pharma-600 hover:underline text-sm"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
}

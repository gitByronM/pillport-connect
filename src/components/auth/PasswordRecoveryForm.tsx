
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Smartphone, Mail, MessageSquare, LoaderCircle } from 'lucide-react';
import { PasswordRecoveryFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';

const recoverySchema = z.object({
  recoveryMethod: z.enum(['sms', 'email', 'whatsapp'], {
    required_error: 'Seleccione un método para recibir el código',
  }),
  email: z.string().email('Correo electrónico inválido').optional(),
});

type PasswordRecoveryFormProps = {
  onSwitchToLogin: () => void;
  onRecoverySuccess?: () => void;
};

export default function PasswordRecoveryForm({
  onSwitchToLogin,
  onRecoverySuccess,
}: PasswordRecoveryFormProps) {
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<'method' | 'email'>('method');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<PasswordRecoveryFormData & { email: string }>({
    resolver: zodResolver(recoverySchema),
    mode: 'onChange',
    defaultValues: {
      recoveryMethod: 'email',
      email: ''
    }
  });

  const selectedMethod = watch('recoveryMethod');

  // Mock user data - in a real app, this would come from your backend
  const maskedPhone = '58041******2930';
  const maskedEmail = 'byronmira******@gmail.com';

  const handleMethodSelection = (value: 'sms' | 'email' | 'whatsapp') => {
    setValue('recoveryMethod', value, { shouldValidate: true });
  };

  const onSubmit = async (data: PasswordRecoveryFormData & { email: string }) => {
    try {
      setIsSubmitting(true);
      
      if (recoveryStep === 'method') {
        if (data.recoveryMethod === 'email') {
          setRecoveryStep('email');
          return;
        }
      } else if (recoveryStep === 'email' && data.email) {
        const result = await resetPassword(data.email);
        
        if (result.success && onRecoverySuccess) {
          onRecoverySuccess();
        }
      }
    } catch (error) {
      console.error('Recovery error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 py-2 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-pharma-600">
          Recuperar contraseña
        </h2>
        {recoveryStep === 'method' ? (
          <p className="text-sm text-gray-500 mt-1">
            ¿Dónde quieres recibir el código para restablecer la contraseña?
          </p>
        ) : (
          <p className="text-sm text-gray-500 mt-1">
            Ingresa tu correo electrónico para recibir instrucciones de recuperación
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {recoveryStep === 'method' ? (
          <>
            <input
              type="hidden"
              {...register('recoveryMethod')}
              value={selectedMethod}
            />
            
            <div className="space-y-4">
              <div 
                className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer ${selectedMethod === 'sms' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
                onClick={() => handleMethodSelection('sms')}
              >
                <input
                  type="radio"
                  id="sms"
                  name="recoveryMethodRadio"
                  checked={selectedMethod === 'sms'}
                  onChange={() => handleMethodSelection('sms')}
                  className="h-4 w-4 text-pharma-600 focus:ring-pharma-500"
                />
                <Smartphone className="w-6 h-6 text-pharma-500" />
                <div className="flex flex-col">
                  <Label htmlFor="sms" className="font-medium">Enviar código por SMS</Label>
                  <span className="text-sm text-gray-500">{maskedPhone}</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer ${selectedMethod === 'email' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
                onClick={() => handleMethodSelection('email')}
              >
                <input
                  type="radio"
                  id="email"
                  name="recoveryMethodRadio"
                  checked={selectedMethod === 'email'}
                  onChange={() => handleMethodSelection('email')}
                  className="h-4 w-4 text-pharma-600 focus:ring-pharma-500"
                />
                <Mail className="w-6 h-6 text-pharma-500" />
                <div className="flex flex-col">
                  <Label htmlFor="email" className="font-medium">Enviar código por correo electrónico</Label>
                  <span className="text-sm text-gray-500">{maskedEmail}</span>
                </div>
              </div>
              
              <div 
                className={`flex items-center space-x-3 border rounded-md p-3 cursor-pointer ${selectedMethod === 'whatsapp' ? 'border-pharma-500 bg-pharma-50' : 'border-gray-200'}`}
                onClick={() => handleMethodSelection('whatsapp')}
              >
                <input
                  type="radio"
                  id="whatsapp"
                  name="recoveryMethodRadio"
                  checked={selectedMethod === 'whatsapp'}
                  onChange={() => handleMethodSelection('whatsapp')}
                  className="h-4 w-4 text-pharma-600 focus:ring-pharma-500"
                />
                <MessageSquare className="w-6 h-6 text-pharma-500" />
                <div className="flex flex-col">
                  <Label htmlFor="whatsapp" className="font-medium">Enviar código por WhatsApp</Label>
                  <span className="text-sm text-gray-500">{maskedPhone}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
        )}

        {errors.recoveryMethod && (
          <p className="text-red-500 text-xs">{errors.recoveryMethod.message}</p>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || (recoveryStep === 'method' ? !selectedMethod : !watch('email'))}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : recoveryStep === 'method' ? (
            "Continuar"
          ) : (
            "Enviar instrucciones"
          )}
        </Button>

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={recoveryStep === 'method' ? onSwitchToLogin : () => setRecoveryStep('method')}
            className="text-pharma-600 hover:underline text-sm"
          >
            {recoveryStep === 'method' ? "Volver a iniciar sesión" : "Volver"}
          </button>
          
          {recoveryStep === 'email' && (
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-pharma-600 hover:underline text-sm"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </form>
    </div>
  );
}


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
import { supabase } from '@/integrations/supabase/client';

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
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Fetch user email and phone on component mount
  useState(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session?.user) {
          const email = data.session.user.email || '';
          setUserEmail(email);
          setValue('email', email);
          
          // Get phone from user metadata or profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('phone')
            .eq('id', data.session.user.id)
            .single();
            
          if (profileData && profileData.phone) {
            setUserPhone(profileData.phone);
          } else if (data.session.user.user_metadata?.phone) {
            setUserPhone(data.session.user.user_metadata.phone);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserInfo();
  }, [setValue]);

  const selectedMethod = watch('recoveryMethod');

  // Generate masked versions of the user's contact info for privacy
  const getMaskedEmail = () => {
    if (!userEmail) return 'correo@ejemplo.com';
    const [username, domain] = userEmail.split('@');
    if (!username || !domain) return 'correo@ejemplo.com';
    
    const maskedUsername = username.substring(0, Math.min(3, username.length)) + 
                          '******' + 
                          (username.length > 6 ? username.substring(username.length - 1) : '');
                          
    return `${maskedUsername}@${domain}`;
  };
  
  const getMaskedPhone = () => {
    if (!userPhone) return '+58041******2930';
    
    const parts = userPhone.split('-');
    const prefix = parts[0] || '0412';
    const number = parts[1] || '';
    
    if (number.length <= 4) return `${prefix}-****`;
    
    const masked = number.substring(0, 2) + 
                  '*'.repeat(Math.max(0, number.length - 4)) + 
                  number.substring(number.length - 2);
                  
    return `${prefix}-${masked}`;
  };

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
        } else {
          // For SMS or WhatsApp, use the default email recovery for now
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoaderCircle className="animate-spin h-8 w-8 text-pharma-600" />
      </div>
    );
  }

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
                  <span className="text-sm text-gray-500">{getMaskedPhone()}</span>
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
                  <span className="text-sm text-gray-500">{getMaskedEmail()}</span>
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
                  <span className="text-sm text-gray-500">{getMaskedPhone()}</span>
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
                defaultValue={userEmail}
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

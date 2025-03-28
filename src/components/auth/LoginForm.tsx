
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoginFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const emailSchema = z.object({
  identifier: z.string().min(1, { message: 'Ingrese un correo electrónico o número celular' }),
});

const passwordSchema = z.object({
  identifier: z.string().min(1, { message: 'Ingrese un correo electrónico o número celular' }),
  password: z.string().min(1, { message: 'Ingrese su contraseña' }),
});

type LoginFormProps = {
  onSwitchToRegister: () => void;
  onSwitchToRecovery: () => void;
  onLoginSuccess?: () => void;
  hasEnteredIdentifier: boolean;
  setHasEnteredIdentifier: (value: boolean) => void;
};

export default function LoginForm({ 
  onSwitchToRegister, 
  onSwitchToRecovery,
  onLoginSuccess,
  hasEnteredIdentifier,
  setHasEnteredIdentifier
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const { login, loading } = useAuth();
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    getValues,
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(hasEnteredIdentifier ? passwordSchema : emailSchema),
    mode: 'onChange',
  });

  const identifier = watch('identifier');
  const password = watch('password');

  // Enable button when password is entered
  useEffect(() => {
    if (hasEnteredIdentifier && password) {
      setPasswordEntered(true);
    } else {
      setPasswordEntered(false);
    }
  }, [hasEnteredIdentifier, password]);

  const validateIdentifier = async () => {
    const result = await trigger('identifier');
    if (result) {
      // Check if identifier is a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('identifier', {
          type: 'manual',
          message: 'Por favor ingrese un correo electrónico válido'
        });
        return;
      }
      
      // For demo purposes, we're just moving to password step without actually checking
      // if the email exists in the database
      console.log('Continuing with identifier:', identifier);
      setHasEnteredIdentifier(true);
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    if (!hasEnteredIdentifier) {
      await validateIdentifier();
      return;
    }

    try {
      console.log('Login data submitted:', data);
      if (!data.password) {
        setError('password', {
          type: 'manual',
          message: 'Por favor ingrese su contraseña'
        });
        return;
      }

      await login(data.identifier, data.password);
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Login error:', error);
      // Error is already handled by the login function
    }
  };

  return (
    <div className="space-y-4 py-2 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-pharma-600">
          Inicia sesión
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {hasEnteredIdentifier 
            ? 'Ingresa tu contraseña' 
            : 'Ingresa Correo electrónico o número celular'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            id="identifier"
            type="text"
            placeholder="Correo electrónico o número celular"
            {...register('identifier')}
            className={`${errors.identifier ? 'border-red-500' : ''} ${hasEnteredIdentifier ? 'bg-gray-100' : ''}`}
            disabled={hasEnteredIdentifier}
            autoComplete="email"
            onBlur={() => {
              if (getValues('identifier')) {
                validateIdentifier();
              }
            }}
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs">{errors.identifier.message}</p>
          )}
        </div>

        {hasEnteredIdentifier && (
          <div className="space-y-2 relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              {...register('password')}
              className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>
        )}

        {hasEnteredIdentifier && (
          <div className="text-right">
            <button
              type="button"
              onClick={onSwitchToRecovery}
              className="text-pharma-600 hover:underline text-sm"
            >
              ¿Olvidaste la contraseña?
            </button>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={!identifier || (hasEnteredIdentifier && !passwordEntered) || isSubmitting || loading}
        >
          {isSubmitting || loading 
            ? "Procesando..." 
            : "Iniciar sesión"}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-pharma-600 hover:underline font-medium"
            >
              Regístrate aquí
            </button>
          </p>
          <a 
            href="#" 
            className="text-sm text-gray-600 hover:underline block mt-2"
          >
            Contacta a soporte si no puedes iniciar sesión
          </a>
        </div>
      </form>
    </div>
  );
}

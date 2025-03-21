
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';

// Modified RegisterFormData without confirmPassword
type RegisterFormData = {
  name: string;
  surname: string;
  email: string;
  password: string;
  idType: string;
  documentNumber: string;
  phoneCountryCode: string;
  phonePrefix: string;
  phoneNumber: string;
  gender: 'male' | 'female';
  acceptTerms: boolean;
};

const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  surname: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Ingrese un correo electrónico válido' }),
  password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  idType: z.string().min(1, { message: 'Seleccione un tipo de documento' }),
  documentNumber: z.string().min(1, { message: 'Ingrese un número de documento' }),
  phoneCountryCode: z.string().default('+58'),
  phonePrefix: z.string().min(1, { message: 'Seleccione un prefijo' }),
  phoneNumber: z.string().min(7, { message: 'Ingrese un número de teléfono válido' }),
  gender: z.enum(['male', 'female']),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Debe aceptar los términos y condiciones' })
  })
});

type RegisterFormProps = {
  onSwitchToLogin: () => void;
  onRegisterSuccess?: () => void;
};

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loading } = useAuth();
  const [documentTypes, setDocumentTypes] = useState<{ id: string; name: string }[]>([]);
  const [formValid, setFormValid] = useState(false);
  
  // Fetch document types from Supabase
  useEffect(() => {
    const fetchDocumentTypes = async () => {
      const { data, error } = await supabase
        .from('document_types')
        .select('id, name');
      
      if (error) {
        console.error('Error fetching document types:', error);
        return;
      }
      
      if (data) {
        setDocumentTypes(data);
      }
    };
    
    fetchDocumentTypes();
  }, []);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      phoneCountryCode: '+58',
      phonePrefix: '0412',
      gender: 'female',
      idType: 'CÉDULA DE IDENTIDAD',
    }
  });

  // Watch form values to manually validate
  const watchedValues = watch();
  
  // Update form validity whenever watched values change
  useEffect(() => {
    // Check if all required fields are filled and valid
    const allFieldsFilled = 
      watchedValues.name?.length >= 2 &&
      watchedValues.surname?.length >= 2 &&
      watchedValues.email?.length > 0 &&
      watchedValues.password?.length >= 8 &&
      watchedValues.idType?.length > 0 &&
      watchedValues.documentNumber?.length > 0 &&
      watchedValues.phoneNumber?.length >= 7 &&
      watchedValues.acceptTerms === true;
    
    setFormValid(allFieldsFilled && Object.keys(errors).length === 0);
    
    console.log('Form validity:', allFieldsFilled, 'Errors:', Object.keys(errors).length);
  }, [watchedValues, errors]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log('Form data submitted:', data);
      await signUp(data);
      
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Error is handled by the signUp function
    }
  };

  return (
    <div className="space-y-4 py-2 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-pharma-600">
          Regístrate y accede a todos los beneficios de Mi farmatodo
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input
              id="name"
              placeholder="Nombre"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="surname"
              placeholder="Apellido"
              {...register('surname')}
              className={errors.surname ? 'border-red-500' : ''}
            />
            {errors.surname && (
              <p className="text-red-500 text-xs">{errors.surname.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="correo electrónico"
            {...register('email')}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            {...register('password')}
            className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
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

        <div className="space-y-2">
          <select
            id="idType"
            {...register('idType')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {documentTypes.map(type => (
              <option key={type.id} value={type.name}>{type.name}</option>
            ))}
          </select>
          {errors.idType && (
            <p className="text-red-500 text-xs">{errors.idType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            id="documentNumber"
            placeholder="Número de documento"
            {...register('documentNumber')}
            className={errors.documentNumber ? 'border-red-500' : ''}
          />
          {errors.documentNumber && (
            <p className="text-red-500 text-xs">{errors.documentNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <select
              id="phoneCountryCode"
              {...register('phoneCountryCode')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="+58">🇻🇪 +58</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+57">🇨🇴 +57</option>
            </select>
          </div>
          
          <div className="col-span-3">
            <select
              id="phonePrefix"
              {...register('phonePrefix')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="0412">0412</option>
              <option value="0414">0414</option>
              <option value="0416">0416</option>
              <option value="0424">0424</option>
              <option value="0426">0426</option>
            </select>
          </div>
          
          <div className="col-span-6 space-y-2">
            <Input
              id="phoneNumber"
              placeholder="Número de teléfono"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <RadioGroup defaultValue="female" {...register('gender')}>
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Mujer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Hombre</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox 
            id="acceptTerms" 
            {...register('acceptTerms')} 
            className={errors.acceptTerms ? 'border-red-500' : ''}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="acceptTerms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left"
            >
              Acepto y autorizo{" "}
              <a href="#" className="text-pharma-600 hover:underline">
                términos y condiciones
              </a>{" "}
              las{" "}
              <a href="#" className="text-pharma-600 hover:underline">
                políticas de privacidad
              </a>{" "}
              y{" "}
              <a href="#" className="text-pharma-600 hover:underline">
                política de tratamiento de datos personales
              </a>{" "}
              de Farmatodo.
            </label>
            {errors.acceptTerms && (
              <p className="text-red-500 text-xs">{errors.acceptTerms.message}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || isSubmitting || !formValid}
        >
          {isSubmitting || loading ? "Procesando..." : "Registrarme"}
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-pharma-600 hover:underline font-medium"
            >
              Inicia sesión
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

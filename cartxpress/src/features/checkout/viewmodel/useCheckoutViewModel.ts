import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { CheckoutFormData } from '../schemas/checkout.schema';
import { checkoutSchema } from '../schemas/checkout.schema';
import { getContainer } from '../../../app/di/container';
import { unmaskCep } from '../../../shared/utils/masks';

export function useCheckoutViewModel() {
  const navigate = useNavigate();
  const container = getContainer();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    cep: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    complement: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isLookingUpCep, setIsLookingUpCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const lookupCep = async () => {
    const cleanCep = unmaskCep(formData.cep);
    
    if (cleanCep.length !== 8) {
      setCepError('CEP deve ter 8 dígitos');
      return;
    }

    try {
      setIsLookingUpCep(true);
      setCepError(null);
      
      const cepData = await container.useCases.lookupCep.execute(cleanCep);
      
      setFormData(prev => ({
        ...prev,
        street: cepData.street,
        district: cepData.district,
        city: cepData.city,
        state: cepData.state,
      }));
      
      toast.success('Endereço preenchido automaticamente!');
    } catch {
      setCepError('CEP não encontrado');
      toast.error('CEP não encontrado');
    } finally {
      setIsLookingUpCep(false);
    }
  };

  const submit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      const validatedData = checkoutSchema.parse(formData);

      await container.useCases.checkout.execute({
        fullName: validatedData.fullName,
        email: validatedData.email,
        address: {
          cep: validatedData.cep,
          street: validatedData.street,
          number: validatedData.number,
          district: validatedData.district,
          city: validatedData.city,
          state: validatedData.state,
          complement: validatedData.complement,
        },
      });

      toast.success('Pedido realizado com sucesso!');
      navigate('/success');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'errors' in err) {
        const zodError = err as { errors: Array<{ path: string[]; message: string }> };
        const fieldErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
        zodError.errors.forEach((err) => {
          const field = err.path[0] as keyof CheckoutFormData;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        toast.error('Por favor, corrija os erros no formulário');
      } else {
        toast.error('Erro ao finalizar pedido');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isLookingUpCep,
    cepError,
    isSubmitting,
    updateField,
    lookupCep,
    submit,
  };
}

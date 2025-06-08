import { usePostV1UserRegisterEmail } from '@/api/generated/default/default';
import { createInputList } from '@/components/form';
import { handleMutationError } from '@/lib/utils/handleMutationError';
import { RouteNames } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type EmailFormData = z.infer<typeof emailSchema>;

const { FormInput, FormSubmitButton } = createInputList<EmailFormData>();

export const useRegisterEmailForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUserEmail } = useAuthStore();

  const { control, handleSubmit, formState, reset } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const { mutate: registerEmail, isPending } = usePostV1UserRegisterEmail();

  const onSubmit: SubmitHandler<EmailFormData> = (data) => {
    registerEmail(
      { data: { email: data.email, lang: 'ru' } },
      {
        onSuccess: () => {
          setUserEmail(data.email);
          reset();
          navigate(RouteNames.AUTH_EMAIL);

          toast({
            title: 'Email registration initiated.',
            description: `PIN sent to ${data.email || 'your email'}.`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        },
        onError: (err) => handleMutationError(err, toast),
      },
    );
  };

  return {
    control,
    formState,
    handleSubmit,
    onSubmit,
    FormInput,
    FormSubmitButton,
    isPending,
  };
};

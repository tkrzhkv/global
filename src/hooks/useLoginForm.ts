import {
  usePostV1AuthLoginCode,
  usePostV1UserRegisterGoogleAccount,
} from '@/api/generated/default/default';
import { createInputList } from '@/components/form';
import { handleMutationError } from '@/lib/utils/handleMutationError';
import { RouteNames } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Input is required')
    .refine(
      (value) =>
        z.string().email().safeParse(value).success ||
        (value.length === 16 && /^\d{16}$/.test(value)),
      'Must be a valid email or a 16-digit access code',
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const { FormInput, FormSubmitButton } = createInputList<LoginFormData>();

export const useLoginForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const login = useAuthStore((state) => state.login);
  const setUserEmail = useAuthStore((state) => state.setUserEmail);

  const { control, handleSubmit, formState, watch, reset } =
    useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      mode: 'onChange',
      defaultValues: {
        identifier: '',
      },
    });

  const identifierValue = watch('identifier');

  const { mutate: loginCodeMutation, isPending: isCodeLoginLoading } =
    usePostV1AuthLoginCode();

  const { mutate: googleAuthMutation, isPending: isGoogleAuthLoading } =
    usePostV1UserRegisterGoogleAccount();

  const inputType = z.string().email().safeParse(identifierValue).success
    ? 'email'
    : identifierValue &&
        identifierValue.length === 16 &&
        /^\d{16}$/.test(identifierValue)
      ? 'code'
      : 'text';

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    if (inputType === 'email') {
      setUserEmail(data.identifier);
      toast({
        title: 'Email provided.',
        description: 'Please enter PIN on the next page.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      navigate(RouteNames.AUTH_EMAIL);
    } else if (inputType === 'code') {
      loginCodeMutation(
        { data: { login_code: data.identifier } },
        {
          onSuccess: (res) => {
            login(res.data?.data?.session || 'N/A_SESSION_TOKEN');
            toast({
              title: 'Anonymous login successful!',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            reset();
            navigate(RouteNames.HOME);
          },
          onError: (err) => handleMutationError(err, toast),
        },
      );
    } else {
      toast({
        title: 'Invalid Input',
        description: 'Please enter a valid email or 16-digit code.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGoogleLogin = () => {
    googleAuthMutation(
      {
        data: {
          code: 'mock_google_code',
          redirect_uri: 'http://localhost:5173/auth/callback/google',
        },
      },
      {
        onSuccess: (res) => {
          login(res.data?.data?.session || 'N/A_SESSION_TOKEN');
          toast({
            title: 'Google login successful!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate(RouteNames.HOME);
        },
        onError: (err) => handleMutationError(err, toast),
      },
    );
  };

  return {
    control,
    handleSubmit,
    formState,
    onSubmit,
    FormInput,
    FormSubmitButton,
    inputType,
    isCodeLoginLoading,
    isGoogleAuthLoading,
    handleGoogleLogin,
    identifierValue,
  };
};

import { usePostV1AuthLoginEmail } from '@/api/generated/default/default';
import { createInputList } from '@/components/form';
import { handleMutationError } from '@/lib/utils/handleMutationError';
import { RouteNames } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const pinSchema = z.object({
  pin: z
    .string()
    .length(6, 'PIN must be 6 digits')
    .regex(/^\d{6}$/, 'PIN must be numeric'),
});

type PinFormData = z.infer<typeof pinSchema>;

const { PinInput } = createInputList<PinFormData>();

export const usePinCodeLogin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { userEmail, login, setUserEmail } = useAuthStore();
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const { control, handleSubmit, reset } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    mode: 'onTouched',
    defaultValues: {
      pin: '',
    },
  });

  const { mutate: loginEmailMutation, isPending: isLoginLoading } =
    usePostV1AuthLoginEmail();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isResendDisabled && resendTimer > 0) {
      timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(timerId);
  }, [isResendDisabled, resendTimer]);

  const handleResendPin = () => {
    if (userEmail) {
      toast({
        title: 'PIN Resend (Mock)',
        description: `New PIN sent to ${userEmail}.`,
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setResendTimer(60);
      setIsResendDisabled(true);
    } else {
      toast({
        title: 'Error',
        description:
          'Email not found. Please go back to the registration page.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      navigate(RouteNames.REGISTRATION);
    }
  };

  const onPinSubmit = (data: PinFormData) => {
    if (!userEmail) {
      toast({
        title: 'Error',
        description:
          'Email not found. Please start over from login/registration.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate(RouteNames.REGISTRATION);
      return;
    }

    loginEmailMutation(
      { data: { email: userEmail, pincode: Number(data?.pin) } },
      {
        onSuccess: (res) => {
          login(res.data?.data?.session || 'N/A_SESSION_TOKEN');
          setUserEmail(null);
          toast({
            title: 'Login successful!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          reset();
          navigate(RouteNames.HOME);
        },
        onError: (err) => {
          reset();
          handleMutationError(err, toast);
        },
      },
    );
  };

  return {
    control,
    handleSubmit,
    onPinSubmit,
    handleResendPin,
    resendTimer,
    isResendDisabled,
    userEmail,
    isLoginLoading,
    PinInput,
  };
};

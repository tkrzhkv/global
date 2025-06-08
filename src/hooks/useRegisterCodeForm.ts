import { usePostV1UserRegisterCode } from '@/api/generated/default/default';
import { handleMutationError } from '@/lib/utils/handleMutationError';
import { RouteNames } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export const useRegisterCodeForm = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setAnonymousLoginCode, anonymousLoginCode } = useAuthStore();
  const { mutate: registerCode, isPending } = usePostV1UserRegisterCode();

  const onGenerateCode = () => {
    registerCode(
      { data: {} },
      {
        onSuccess: (res) => {
          navigate(RouteNames.REGISTRATION_CODE);

          toast({
            title: 'Code generated successfully!',
            description: 'Your anonymous login code has been created.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          const loginCode = res?.data?.data?.login_code;

          if (loginCode) {
            setAnonymousLoginCode(loginCode);
          }
        },
        onError: (err) => handleMutationError(err, toast),
      },
    );
  };

  const handleNavigateLogin = () => {
    setAnonymousLoginCode(null);
    navigate(RouteNames.AUTH);
  };

  return {
    onGenerateCode,
    isPending,
    anonymousLoginCode,
    handleNavigateLogin,
  };
};

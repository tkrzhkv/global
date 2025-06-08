import { useRegisterCodeForm } from '@/hooks/useRegisterCodeForm';
import { Button, Stack, Text } from '@chakra-ui/react';

export const CodeForm = () => {
  const { onGenerateCode, isPending } = useRegisterCodeForm();

  return (
    <Stack spacing={4} mb={8}>
      <Text fontSize="lg" fontWeight="semibold" textAlign="center">
        Anonymous Registration
      </Text>
      <Text fontSize="sm" color="gray.600">
        Get a 16-digit access code for anonymous login.
      </Text>
      <Button
        onClick={onGenerateCode}
        colorScheme="blue"
        isDisabled={isPending}
        isLoading={isPending}
      >
        Generate Anonymous Code
      </Button>
    </Stack>
  );
};

import { useRegisterEmailForm } from '@/hooks/useRegisterEmailForm';
import { RouteNames } from '@/router/routes';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

export const EmailForm = () => {
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    FormSubmitButton,
    FormInput,
    isPending,
  } = useRegisterEmailForm();

  return (
    <Box>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        Register
      </Heading>

      <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
        <FormInput
          name="email"
          control={control}
          placeholder="Enter your email"
          label="Email Registration"
          type="email"
        />

        <FormSubmitButton
          isLoading={isPending}
          formState={formState}
          name="Register with Email"
        />

        <Text fontSize="xs" color="gray.400">
          A PIN will be sent to your email for verification.
        </Text>
      </Stack>

      <Text textAlign="center" mt={8}>
        Already have an account?{' '}
        <Link
          to={RouteNames.AUTH}
          style={{ color: 'teal', fontWeight: 'bold' }}
        >
          Login here
        </Link>
      </Text>
    </Box>
  );
};

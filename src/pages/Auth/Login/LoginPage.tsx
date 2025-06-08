import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { Link } from 'react-router';

import { useLoginForm } from '@/hooks/useLoginForm';
import { RouteNames } from '@/router/routes';

export const LoginPage: FC = () => {
  const {
    control,
    handleSubmit,
    formState,
    onSubmit,
    FormInput,
    FormSubmitButton,
    isCodeLoginLoading,
    isGoogleAuthLoading,
    handleGoogleLogin,
  } = useLoginForm();

  return (
    <Center h="100vh" p={4}>
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        width="100%"
      >
        <Heading as="h2" size="xl" textAlign="center" mb={6}>
          Login
        </Heading>

        <Stack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} mb={8}>
          <FormInput
            name="identifier"
            control={control}
            placeholder="Email or 16-digit access code"
            label="Account Identifier"
            type="text"
          />

          <FormSubmitButton
            isLoading={isCodeLoginLoading}
            formState={formState}
            name="Continue"
          />
        </Stack>

        <Text textAlign="center" my={6} color="gray.500">
          — OR —
        </Text>

        <Button
          colorScheme="red"
          variant="outline"
          width="full"
          leftIcon={<span>G</span>}
          onClick={handleGoogleLogin}
          isLoading={isGoogleAuthLoading}
        >
          Login with Google
        </Button>

        <Text textAlign="center" mt={8}>
          Don't have an account?{' '}
          <Link
            to={RouteNames.REGISTRATION}
            style={{ color: 'teal', fontWeight: 'bold' }}
          >
            Register here
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

export default LoginPage;

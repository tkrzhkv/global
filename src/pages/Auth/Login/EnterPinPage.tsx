import { usePinCodeLogin } from '@/hooks/usePinCodeLogin';
import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react';
import type { FC } from 'react';

export const EnterPinPage: FC = () => {
  const {
    userEmail,
    isLoginLoading,
    handleResendPin,
    onPinSubmit,
    PinInput,
    isResendDisabled,
    resendTimer,
    handleSubmit,
    control,
  } = usePinCodeLogin();

  if (!userEmail) {
    return (
      <Center h="100vh">
        <Text>Loading or redirecting...</Text>
      </Center>
    );
  }

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
          Enter PIN Code
        </Heading>
        <Text textAlign="center" mb={4} color="gray.600">
          A 6-digit PIN has been sent to:{' '}
          <Text as="span" fontWeight="bold">
            {userEmail}
          </Text>
        </Text>

        <Stack as="form" onSubmit={handleSubmit(onPinSubmit)} spacing={6}>
          <PinInput
            control={control}
            name="pin"
            handleSubmit={handleSubmit}
            onPinCompleteSubmit={onPinSubmit}
          />
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isLoginLoading}
            isDisabled={isLoginLoading}
          >
            Verify PIN
          </Button>

          <Button
            onClick={handleResendPin}
            isDisabled={isResendDisabled}
            colorScheme="teal"
            variant="outline"
            width="full"
          >
            {isResendDisabled ? `Resend PIN in ${resendTimer}s` : 'Resend PIN'}
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default EnterPinPage;

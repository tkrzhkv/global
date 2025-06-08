import { CodeForm } from '@/pages/Auth/Registration/components/CodeForm';
import { EmailForm } from '@/pages/Auth/Registration/components/EmailForm';
import { Box, Center, Text } from '@chakra-ui/react';
import type { FC } from 'react';

const RegistrationPage: FC = () => {
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
        <EmailForm />
        <Text textAlign="center" my={6} color="gray.500">
          — OR —
        </Text>
        <CodeForm />
      </Box>
    </Center>
  );
};

export default RegistrationPage;

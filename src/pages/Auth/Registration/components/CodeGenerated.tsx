import { useRegisterCodeForm } from '@/hooks/useRegisterCodeForm';
import {
  Box,
  Button,
  Center,
  Stack,
  Text,
  useClipboard,
} from '@chakra-ui/react';

const CodeGenerated = () => {
  const { anonymousLoginCode, handleNavigateLogin } = useRegisterCodeForm();

  const { onCopy, hasCopied } = useClipboard(anonymousLoginCode || '');

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
        {anonymousLoginCode && (
          <Stack>
            <Text fontSize="md" fontWeight="medium">
              Your Anonymous Login Code:
            </Text>
            <Box
              p={3}
              bg="white"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
              fontFamily="monospace"
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
            >
              {anonymousLoginCode}
            </Box>
            <Button onClick={onCopy} colorScheme="teal" size="sm">
              {hasCopied ? 'Copied!' : 'Copy Code'}
            </Button>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Please copy this code and keep it safe.
            </Text>
            <Button onClick={handleNavigateLogin} colorScheme="purple" mt={4}>
              Go to Login
            </Button>
          </Stack>
        )}
      </Box>
    </Center>
  );
};

export default CodeGenerated;

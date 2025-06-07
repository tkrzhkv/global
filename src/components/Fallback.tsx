import { Box, Button, Text } from '@chakra-ui/react';
import type { FC } from 'react';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const Fallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <Box p={6} textAlign="center">
    <Text fontSize="xl" fontWeight="bold" mb={4}>
      Something went wrong.
    </Text>
    <Text color="red.500" mb={4}>
      {error.message}
    </Text>
    <Button colorScheme="teal" onClick={resetErrorBoundary}>
      Try Again
    </Button>
  </Box>
);

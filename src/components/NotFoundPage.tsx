import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mb={2}>
        404 - Page Not Found
      </Heading>
      <Text color="gray.500" mb={6}>
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <Button as={Link} to="/" colorScheme="teal">
        Go Home
      </Button>
    </Box>
  );
};

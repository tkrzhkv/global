import { RouteNames } from '@/router/routes';
import { useAuthStore } from '@/store/authStore';
import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router';

const links = [
  { to: RouteNames.REGISTRATION, text: 'Registration' },
  { to: RouteNames.AUTH, text: 'Login' },
];

const HomePage = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const authStatusText = isAuthenticated ? 'Authorized' : 'Unauthorized';

  return (
    <VStack h="100vh" alignItems="center" justifyContent="center">
      <Stack
        flexDir={{ base: 'column', sm: 'row' }}
        justify="center"
        align="center"
        mb={8}
      >
        <Heading size="xl">Welcome to auth app</Heading>
        <HStack ml={4}>
          <Box
            h={4}
            w={4}
            rounded="full"
            background={isAuthenticated ? 'green.500' : 'red.500'}
          />
          <Text fontSize="lg">{authStatusText}</Text>
        </HStack>
      </Stack>

      <VStack spacing={4}>
        {isAuthenticated ? (
          <Button
            colorScheme="red"
            variant="solid"
            width="200px"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <>
            {links.map((button) => (
              <Button
                key={button.to}
                as={Link}
                to={button.to}
                colorScheme="blue"
                variant="outline"
                width="200px"
              >
                {button.text}
              </Button>
            ))}
          </>
        )}
      </VStack>
    </VStack>
  );
};
export default HomePage;

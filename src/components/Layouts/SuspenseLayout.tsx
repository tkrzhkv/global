import { Center, Spinner } from '@chakra-ui/react';
import { type FC, type ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

export const SuspenseLayout: FC<Props> = ({ children }) => (
  <Suspense
    fallback={
      <Center h="100vh">
        <Spinner size="xl" thickness="4px" color="teal.500" />
      </Center>
    }
  >
    {children}
  </Suspense>
);

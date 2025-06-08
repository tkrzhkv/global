import type { CreateToastFnReturn } from '@chakra-ui/react';
import axios from 'axios';

export const handleMutationError = (
  error: Error,
  toast: CreateToastFnReturn,
) => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      'An unknown error occurred';
    toast({
      status: 'error',
      title: message,
    });
  } else {
    toast({
      status: 'error',
      title: 'An unknown error occurred',
    });
  }
};

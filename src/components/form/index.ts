import {
  ControlledPinInput,
  type PinInputFormProps,
} from '@/components/form/PinInput';
import type { FC } from 'react';
import type { FieldValues } from 'react-hook-form';
import { Input, type InputFormProps } from './Input';
import FormSubmitButton, { type FormSubmitButtonProps } from './SubmitButton';

export const createInputList = <FV extends FieldValues>() => ({
  FormInput: Input as FC<InputFormProps<FV>>,
  PinInput: ControlledPinInput as FC<PinInputFormProps<FV>>,
  FormSubmitButton: FormSubmitButton as FC<FormSubmitButtonProps<FV>>,
});

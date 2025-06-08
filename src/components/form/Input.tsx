import {
  Input as ControlledInput,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import type { ReactElement } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
} from 'react-hook-form';

export type InputFormProps<
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
> = {
  name: TNameType;
  control: Control<TFieldValuesType>;
  type?: string;
  placeholder?: string;
  label?: string;
  testID?: string;
};

export const Input = <
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
>(
  props: InputFormProps<TFieldValuesType, TNameType>,
): ReactElement => {
  const { control, name, type, placeholder, label, testID } = props;

  const { field, fieldState } = useController({ name, control });

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <ControlledInput
        {...field}
        {...props}
        value={field.value || ''}
        type={type ?? 'text'}
        placeholder={placeholder}
        data-testid={testID}
      />

      <Text data-testid="formElementError" color="red.600" fontSize="12px">
        {fieldState?.error?.message}
      </Text>
    </FormControl>
  );
};

import {
  Center,
  FormControl,
  FormLabel,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import { type ReactElement, useRef } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormHandleSubmit,
  useController,
} from 'react-hook-form';

export type PinInputFormProps<
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
> = {
  name: TNameType;
  control: Control<TFieldValuesType>;
  type?: string;
  placeholder?: string;
  label?: string;
  handleSubmit: UseFormHandleSubmit<TFieldValuesType>;
  onPinCompleteSubmit: (data: TFieldValuesType) => void;
  pinLength?: number;
};

export const ControlledPinInput = <
  TFieldValuesType extends FieldValues = FieldValues,
  TNameType extends FieldPath<TFieldValuesType> = FieldPath<TFieldValuesType>,
>(
  props: PinInputFormProps<TFieldValuesType, TNameType>,
): ReactElement => {
  const {
    control,
    name,
    label,
    handleSubmit,
    onPinCompleteSubmit,
    pinLength = 6,
  } = props;

  const { field, fieldState } = useController({
    name,
    control,
  });

  const stablePinFieldKeys = useRef<string[] | null>(null);

  if (stablePinFieldKeys.current === null) {
    stablePinFieldKeys.current = Array.from({ length: pinLength }).map(() =>
      faker.string.uuid(),
    );
  }

  return (
    <FormControl isInvalid={!!fieldState.error}>
      {label && <FormLabel>{label}</FormLabel>}
      <Center>
        <PinInput
          size="lg"
          {...field}
          onComplete={async (value) => {
            field.onChange(value);
            await handleSubmit(onPinCompleteSubmit)();
          }}
        >
          {stablePinFieldKeys.current.map((uuid) => (
            <PinInputField key={uuid} type="number" />
          ))}
        </PinInput>
      </Center>

      {fieldState.error && (
        <Text color="red.600" fontSize="sm" mt={1} textAlign="center">
          {fieldState.error.message}
        </Text>
      )}
    </FormControl>
  );
};

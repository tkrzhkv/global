import { createInputList } from '@/components/form';
import { act, cleanup, render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  type Control,
  type ErrorOption,
  type FieldPath,
  type FieldValues,
  useForm,
} from 'react-hook-form';
import { beforeEach, vi } from 'vitest';

type Mock = ReturnType<typeof vi.fn>;

const { FormInput } = createInputList();

type InputTestWrapperType = {
  placeholder?: string;
  label?: string;
  error?: string;
  onFocus?: Mock;
  onBlur?: Mock;
  onChange?: Mock;
  disabled?: boolean;
};

let control: Control;
let setError: (
  name: FieldPath<FieldValues> | `root.${string}` | 'root',
  error: ErrorOption,
  options?: { shouldFocus?: boolean },
) => void;

beforeEach(() => {
  const { result } = renderHook(() => useForm());
  control = result.current.control;
  setError = result.current.setError as (
    name: string,
    error: ErrorOption,
    options?:
      | {
          shouldFocus?: boolean | undefined;
        }
      | undefined,
  ) => void;
  cleanup();
});

afterEach(cleanup);

const InputTestWrapper = ({ ...props }: InputTestWrapperType) => (
  <FormInput control={control} name="mockName" testID="textInput" {...props} />
);

describe('ControlledInput component', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeAll(() => {
    user = userEvent.setup();
  });

  it('renders correctly', () => {
    render(<InputTestWrapper />);
    expect(screen.getByTestId('textInput')).toBeInTheDocument();
  });

  it('should render the placeholder correctly', () => {
    render(<InputTestWrapper placeholder="Enter your username" />);
    expect(screen.getByTestId('textInput')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username'),
    ).toBeInTheDocument();
  });

  it('should render the label correctly', () => {
    render(<InputTestWrapper label="Username" />);
    expect(screen.getByTestId('textInput')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('should render the error message correctly', async () => {
    render(<InputTestWrapper />);

    act(() => {
      setError('testField', {
        type: 'manual',
        message: 'This is an error message',
      });
    });

    expect(screen.getByTestId('textInput')).toBeInTheDocument();
  });

  it('should trigger onFocus event correctly', async () => {
    const onFocus = vi.fn();
    render(<InputTestWrapper onFocus={onFocus} />);

    const input = screen.getByTestId('textInput');
    await user.click(input);

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should trigger onBlur event correctly', async () => {
    const onBlur = vi.fn();
    render(<InputTestWrapper onBlur={onBlur} />);

    const input = screen.getByTestId('textInput');
    await user.click(input);
    await user.tab();

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should trigger onChange event correctly', async () => {
    const onChange = vi.fn();

    render(<InputTestWrapper onChange={onChange} />);

    const input = screen.getByTestId('textInput');
    await user.type(input, '123456789');

    expect(onChange).toHaveBeenCalledTimes(9);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<InputTestWrapper disabled={true} />);

    const input = screen.getByTestId('textInput');
    expect(input).toBeDisabled();
  });
});

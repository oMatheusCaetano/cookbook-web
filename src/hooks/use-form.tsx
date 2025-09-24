import { useState } from "react";

export type UseFormProps<T> = {
  initialData?: Partial<T>;
  onSubmit?: (data: T, event: React.FormEvent<HTMLFormElement>) => any;
}

export type UseFormReturn<T> = {
  form: Partial<T>
  isEmpty: boolean
  isNotEmpty?: boolean
  isLoading?: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setForm: React.Dispatch<React.SetStateAction<Partial<T>>>
  error?: string | null
  setError: React.Dispatch<React.SetStateAction<string | null | undefined>>
  errors: { [key: string]: string }
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
  setErrorsFromApi: (response: any) => boolean,
  clearErrors: () => void,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>,
  handleChange: (value: string | number | boolean, name: keyof T) => void,
  register: (name: keyof T, options?: {
    except?: ("value" | "setValue" | "error")[]
    getValue?: () => any
    setValue?: (value: any) => void
  }) => {
    error?: string
    value?: any
    setValue?: (value: any) => void
  }
}

export function useForm<T = { [key: string]: any }>(props?: UseFormProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<Partial<T>>((props?.initialData ?? {}));
  const [error, setError] = useState<string | undefined | null>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const isEmpty = Object.values(form).every((x: any) => {
    if ([null, undefined].includes(x)) return true;
    if (typeof x === 'string' && x.trim() === '') return true;
    return !x
  });
  const isNotEmpty = !isEmpty;


  function handleChange(value: string | number | boolean, name: keyof typeof form) {
    let d: any = { ...form, [name]: value };
    setForm(d);
  }

  function register(
    name: keyof typeof form,
    options?: {
      except?: ('value' | 'setValue' | 'error')[],
      getValue?: () => any,
      setValue?: (value: any) => void
    }
  ) {
    let item = {};

    if (! options?.except?.includes('value')) {
      item = {
        value: options?.getValue ? options.getValue() : (form[name] as any ?? ''),
      }
    }

    if (! options?.except?.includes('setValue')) {
      item = {
        ...item,
        setValue: options?.setValue ? options.setValue : (value: string) => handleChange(value, name)
      }
    }

    if (! options?.except?.includes('error')) {
      item = {
        ...item,
        error: errors[name as string] ?? ''
      }
    }

    return item;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    clearErrors();
    await props?.onSubmit?.(form as T, event);
    setIsLoading(false);
  }

  function clearErrors() {
    setError(null);
    setErrors({});
  }

  function setErrorsFromApi(response: any) {
    if (!response?.isError) return false;
    const errs = response?.data?.errors ?? undefined;
    console.log(errs);

    if (errs) {
      const newErrors: { [key: string]: string } = {};
      Object.keys(errs).forEach((key: any) => {
          console.log(error)
        newErrors[key] = errs[key][0];
      });
      setErrors(newErrors);
    } else {
      setError(response.message);
    }
    return true;
  }

  return {
    form,
    isEmpty,
    isNotEmpty,
    isLoading,
    setIsLoading,
    setForm,
    errors,
    error,
    setErrors,
    setError,
    handleChange,
    register,
    onSubmit,
    setErrorsFromApi,
    clearErrors
  } as UseFormReturn<T>
}

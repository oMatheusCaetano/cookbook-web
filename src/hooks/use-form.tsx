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
  register: (name: keyof T | `${string}.${number}.${string}`, options?: {
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
    name: keyof typeof form | `${string}.${number}.${string}`,
    options?: {
      except?: ('value' | 'setValue' | 'error')[],
      getValue?: () => any,
      setValue?: (value: any) => void
    }
  ) {
    function getNestedValue(obj: any, path: string) {
      return path.split('.').reduce((acc, part) => {
        if (acc === undefined || acc === null) return undefined;
        return acc[part];
      }, obj);
    }

    function setNestedValue(obj: any, path: string, value: any) {
      const parts = path.split('.');
      const newObj = Array.isArray(obj) ? [...obj] : { ...obj };
      let current = newObj;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
          current[part] = value;
        } else {
          if (current[part] === undefined || current[part] === null) {
            const nextPart = parts[i + 1];
            current[part] = /^\d+$/.test(nextPart) ? [] : {};
          }
          current[part] = Array.isArray(current[part]) ? [...current[part]] : { ...current[part] };
          current = current[part];
        }
      }
      return newObj;
    }

    let item: any = {};

    if (!options?.except?.includes('value')) {
      const value = options?.getValue ? options.getValue() : (typeof name === 'string' && name.includes('.') ? getNestedValue(form, name) : form[name as keyof typeof form]) ?? '';
      item.value = value;
    }

    if (!options?.except?.includes('setValue')) {
      item.setValue = options?.setValue ? options.setValue : (value: any) => {
        if (typeof name === 'string' && name.includes('.')) {
          setForm(prevForm => setNestedValue(prevForm, name, value));
        } else {
          handleChange(value, name as keyof typeof form);
        }
      }
    }

    if (!options?.except?.includes('error')) {
      const errorValue = typeof name === 'string' && name.includes('.') ? errors[name] ?? '' : errors[name as string] ?? '';
      item.error = errorValue;
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

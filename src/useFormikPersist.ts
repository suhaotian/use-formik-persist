/**
 * useFormikPersist.ts
 * @author suhaotian
 * @description formik state persist hooks
 * @created 2021-06-19 18:48:27
 * @copyright None
 * @last-modified 2021-06-19 18:48:27
 */

import { useFormik } from 'formik';
import useMount from 'react-use/lib/useMount';
import useDebounce from 'react-use/lib/useDebounce';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useRef } from 'react';

export type FormikReturnType = ReturnType<typeof useFormik>;

export interface UseFormikPersistOptions {
  /** namespace for storage, different form should have different namespace */
  namespace: string;
  /**
   * debounce ms, default values is 200
   */
  debounce?: number;
  /**
   * storage namespace prefix 
   */
  prefix?: string;
}

export function useFormikPersist<T>(
  _formik: T,
  { namespace, debounce = 200, prefix = '@ufp' }: UseFormikPersistOptions
) {
  const formik = (_formik as any) as FormikReturnType;

  const initedRef = useRef(false);
  const { getItem, setItem, removeItem } = useAsyncStorage(
    `${prefix}${namespace}`
  );
  useMount(async () => {
    const result = await getItem();
    if (result) {
      formik.setValues(JSON.parse(result));
    }
  });
  const [, cancel] = useDebounce(
    async () => {
      if (formik.values !== formik.initialValues || initedRef.current) {
        if (!initedRef.current) {
          initedRef.current = true;
        }

        await setItem(JSON.stringify(formik.values));
      }
    },
    debounce,
    [formik.values]
  );
  return () => {
    cancel();
    removeItem();
  };
}

import { DependencyList, useEffect, useState } from 'react';

interface Result<T> {
  loading: boolean;
  data: T | null;
  error: unknown;
}

interface AsyncParams<T> {
  query: () => Promise<T>;
  deps: DependencyList;
}

export default function useAsync<T>(params: AsyncParams<T>): Result<T> {
  const [result, setResult] = useState<Result<T>>({
    loading: true,
    data: null,
    error: null,
  });

  const query = params.query;

  useEffect(() => {
    setResult((previous) => ({
      loading: true,
      data: previous.data,
      error: previous.error,
    }));
    query().then(
      (data) => {
        setResult({
          loading: false,
          data: data,
          error: null,
        });
      },
      (error) => {
        setResult({
          loading: false,
          data: null,
          error: error,
        });
      }
    );
  }, params.deps);

  return result;
}

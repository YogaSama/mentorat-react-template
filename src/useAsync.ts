import { DependencyList, useEffect, useState } from 'react';

interface Result<T> {
  loading: boolean;
  data: T | null;
}

interface AsyncParams<T> {
  query: () => Promise<T>;
  deps: DependencyList;
  defaultData?: T;
}

export default function useAsync<T>(params: AsyncParams<T>): Result<T> {
  const [result, setResult] = useState<Result<T>>({
    loading: true,
    data: params.defaultData ?? null,
  });

  const query = params.query;

  useEffect(() => {
    setResult((previous) => ({
      loading: true,
      data: previous.data,
    }));
    query().then((data) => {
      setResult({
        loading: false,
        data: data,
      });
    });
  }, params.deps);

  return result;
}

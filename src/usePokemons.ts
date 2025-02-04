import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import useAsync from './useAsync';
import { useCallback } from 'react';

function usePokemons(limit: number, offset: number) {
  const callback = useCallback(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const result: NamedAPIResourceList = await response.json();
    return result.results;
  }, [limit, offset]);

  return useAsync<NamedAPIResource[]>(callback);
}

export default usePokemons;

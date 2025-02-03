import { Pokemon } from 'pokenode-ts';
import useAsync from './useAsync';
import { useCallback } from 'react';

function usePokemon(name: string) {
  const callback = useCallback(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.json();
  }, [name]);

  return useAsync<Pokemon>(callback, { resetOnLoad: true });
}

export default usePokemon;

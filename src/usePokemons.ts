import { getPokemons } from './pokemonApi';
import useAsync from './useAsync';

function usePokemons(limit: number) {
  return useAsync({
    query: () => getPokemons(limit, 0),
    defaultData: [],
    deps: [limit],
  });
}

export default usePokemons;

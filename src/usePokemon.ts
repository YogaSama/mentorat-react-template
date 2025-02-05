import { getPokemon } from './pokemonApi';
import useAsync from './useAsync';

function usePokemon(name: string) {
  return useAsync({
    query: () => getPokemon(name),
    deps: [name],
  });
}

export default usePokemon;

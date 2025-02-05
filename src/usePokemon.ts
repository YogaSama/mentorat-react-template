import { getPokemon } from './pokemonApi';
import useSync from './useSync';

function usePokemon(name: string) {
  return useSync({
    query: () => getPokemon(name),
    key: ['getPokemon', name],
  });
}

export default usePokemon;

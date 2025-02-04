import { Pokemon } from 'pokenode-ts';
import { useSync } from './SyncContext';

function usePokemon(name: string) {
  return useSync<Pokemon>({
    key: name,
    query: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((v) => v.json()),
  });
}

export default usePokemon;

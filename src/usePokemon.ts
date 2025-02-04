import { Pokemon } from 'pokenode-ts';
import { useSync } from './SyncContext';

function usePokemon(name: string) {
  return useSync<Pokemon>(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.json();
  }, [name]);
}

export default usePokemon;

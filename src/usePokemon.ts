import { Pokemon } from 'pokenode-ts';
import useAsync from './useAsync';

function usePokemon(name: string) {
  return useAsync<Pokemon>(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.json();
  }, [name]);
}

export default usePokemon;

import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import useAsync from './useAsync';

function usePokemons(limit: number, offset: number) {
  return useAsync<NamedAPIResource[]>(async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    const result: NamedAPIResourceList = await response.json();
    return result.results;
  }, []);
}

export default usePokemons;

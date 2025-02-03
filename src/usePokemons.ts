import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import { useEffect, useState } from 'react';

function usePokemons(
  limit: number,
  offset: number
): [NamedAPIResource[] | null, unknown, boolean] {
  const [pokemons, setPokemons] = useState<NamedAPIResource[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then((response) => {
        return response.json();
      })
      .then((list: NamedAPIResourceList) => {
        setLoading(false);
        setPokemons(list.results);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setPokemons(null);
        setError(err);
      });
  }, [limit, offset]);

  return [pokemons, error, loading];
}

export default usePokemons;

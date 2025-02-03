import { Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

function usePokemon(name: string): [Pokemon | null, unknown, boolean] {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        setLoading(false);
        setPokemon(pokemon);
        setError(null);
      })
      .catch((err) => {
        setLoading(false);
        setPokemon(null);
        setError(err);
      });
  }, [name]);

  return [pokemon, error, loading];
}

export default usePokemon;

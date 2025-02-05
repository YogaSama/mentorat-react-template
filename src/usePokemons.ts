import { NamedAPIResource } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { getPokemons } from './pokemonApi';

function usePokemons(limit: number) {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    getPokemons(limit, 0).then((result) => {
      setPokemons(result);
    });
  }, [limit]);

  return pokemons;
}

export default usePokemons;

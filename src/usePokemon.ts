import { useEffect, useState } from 'react';
import { getPokemon } from './pokemonApi';
import { Pokemon } from 'pokenode-ts';

function usePokemon(name: string) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getPokemon(name).then((v) => {
      setPokemon(v);
    });
  }, [name]);

  return pokemon;
}

export default usePokemon;

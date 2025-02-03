import { Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

function usePokemon(name: string): Pokemon | null {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        return response.json();
      })
      .then((pokemon) => {
        setPokemon(pokemon);
      });
  }, [name]);

  return pokemon;
}

export default usePokemon;

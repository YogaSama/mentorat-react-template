import { Pokemon } from 'pokenode-ts';
import { useEffect, useState } from 'react';

interface PokemonCardProps {
  name: string;
}

function PokemonCard(props: PokemonCardProps) {
  const name = props.name;

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

  return (
    <>
      {name} #{pokemon?.id ?? '-'}
    </>
  );
}

export default PokemonCard;

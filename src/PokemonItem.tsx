import { useEffect, useState } from 'react';
import { getPokemon } from './pokemonApi';
import { Pokemon } from 'pokenode-ts';

interface PokemonItemProps {
  name: string;
}

function PokemonItem(props: PokemonItemProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    getPokemon(props.name).then((v) => {
      setPokemon(v);
    });
  }, [props.name]);

  return (
    <div className="item">
      #{pokemon?.id ?? '-'} {props.name}
      {pokemon?.sprites.front_default ? (
        <img className="icon" src={pokemon.sprites.front_default} />
      ) : (
        <div className="icon" />
      )}
    </div>
  );
}

export default PokemonItem;

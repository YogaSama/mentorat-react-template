import usePokemon from './usePokemon';

interface PokemonItemProps {
  name: string;
}

function PokemonItem(props: PokemonItemProps) {
  const pokemon = usePokemon(props.name);

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

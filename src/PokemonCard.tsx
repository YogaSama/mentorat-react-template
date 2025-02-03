import usePokemon from './usePokemon';

interface PokemonCardProps {
  name: string;
}

function PokemonCard(props: PokemonCardProps) {
  const name = props.name;
  const [pokemon, error, loading] = usePokemon(name);

  if (loading) {
    return `${name} ...`;
  }

  if (error != null) {
    return `Impossible de charger '${name}'`;
  }

  return (
    <>
      <img alt={name} src={pokemon!.sprites.front_default!} />
      {name}#{pokemon!.id}
    </>
  );
}

export default PokemonCard;

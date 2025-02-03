import usePokemon from './usePokemon';

interface PokemonCardProps {
  name: string;
}

function PokemonCard(props: PokemonCardProps) {
  const name = props.name;
  const pokemon = usePokemon(name);

  return (
    <>
      {name} #{pokemon?.id ?? '-'}
    </>
  );
}

export default PokemonCard;

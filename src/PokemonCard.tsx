interface PokemonCardProps {
  name: string;
}

function PokemonCard(props: PokemonCardProps) {
  const name = props.name;
  return name;
}

export default PokemonCard;

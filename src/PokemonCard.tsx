import './PokemonCard.css';
import usePokemon from './usePokemon';

interface PokemonCardProps {
  name: string;
}

function PokemonCard(props: PokemonCardProps) {
  const name = props.name;
  const [pokemon, error, loading] = usePokemon(name);

  if (loading) {
    return `Loading ${name}`;
  }

  if (error != null) {
    return `Impossible de charger '${name}'`;
  }

  return (
    <div className="pokemon-card">
      <img alt={name} src={pokemon!.sprites.front_default!} />
      <span className="pokemon-name">{name}</span> #{pokemon!.id ?? '-'}
    </div>
  );
}

export default PokemonCard;

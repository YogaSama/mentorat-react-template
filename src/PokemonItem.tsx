import { useShiny } from './ShinyProvider';
import usePokemon from './usePokemon';

interface PokemonItemProps {
  name: string;
}

function PokemonItem(props: PokemonItemProps) {
  const pokemonQuery = usePokemon(props.name);
  const { shiny } = useShiny();

  if (pokemonQuery.loading) {
    return <div className="item">Loading ...</div>;
  }

  const pokemon = pokemonQuery.data!;
  return (
    <div className="item">
      #{pokemon.id} {props.name}
      <img
        className="icon"
        src={pokemon.sprites[shiny ? 'front_shiny' : 'front_default']!}
      />
    </div>
  );
}

export default PokemonItem;

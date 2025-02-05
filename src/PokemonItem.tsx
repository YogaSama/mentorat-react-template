import { useEffect, useState } from 'react';
import { useShiny } from './ShinyProvider';
import usePokemon from './usePokemon';

function getSprite(back: boolean, shiny: boolean) {
  if (back) {
    return shiny ? 'back_shiny' : 'back_default';
  }
  return shiny ? 'front_shiny' : 'front_default';
}

interface PokemonItemProps {
  name: string;
}

function PokemonItem(props: PokemonItemProps) {
  const pokemon = usePokemon(props.name);
  const { shiny } = useShiny();
  const [back, setBack] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBack((previous) => !previous);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div className="item">
      #{pokemon.id} {props.name}
      <img className="icon" src={pokemon.sprites[getSprite(back, shiny)]!} />
    </div>
  );
}

export default PokemonItem;

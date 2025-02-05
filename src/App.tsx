import { useEffect, useRef, useState } from 'react';
import PokemonItem from './PokemonItem';
import usePokemons from './usePokemons';
import { useShiny } from './ShinyProvider';

function App() {
  const [limit, setLimit] = useState(3);
  const { shiny, setShiny } = useShiny();
  const pokemonQuery = usePokemons(limit);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [pokemonQuery]);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button
            disabled={pokemonQuery.loading}
            className="show"
            onClick={() => {
              setLimit((previous) => previous + 3);
            }}
          >
            {pokemonQuery.loading ? 'Loading...' : 'Voir plus'}
          </button>
          <div className="shiny">
            <label htmlFor="shiny-checkbox">shiny</label>
            <input
              id="shiny-checkbox"
              type="checkbox"
              checked={shiny}
              onChange={() => {
                setShiny(!shiny);
              }}
            />
          </div>
        </div>
        <div className="list" ref={listRef}>
          {pokemonQuery.data!.map((pokemon) => (
            <PokemonItem key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

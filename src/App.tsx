import { useEffect, useRef, useState } from 'react';
import PokemonItem from './PokemonItem';
import usePokemons from './usePokemons';

function App() {
  const [limit, setLimit] = useState(3);
  const [shiny, setShiny] = useState(false);
  const pokemons = usePokemons(limit);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [pokemons]);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button
            className="show-more"
            onClick={() => {
              setLimit((previous) => previous + 3);
            }}
          >
            Voir plus
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
          {pokemons.map((pokemon) => (
            <PokemonItem key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

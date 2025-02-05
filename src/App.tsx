import { useEffect, useRef, useState } from 'react';
import PokemonItem from './PokemonItem';
import { getPokemons } from './pokemonApi';
import { NamedAPIResource } from 'pokenode-ts';

function App() {
  const [limit, setLimit] = useState(3);
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [pokemons]);

  useEffect(() => {
    getPokemons(limit, 0).then((result) => {
      setPokemons(result);
    });
  }, [limit]);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button
            className="show"
            onClick={() => {
              setLimit((previous) => previous + 3);
            }}
          >
            Voir plus
          </button>
          <div className="shiny">
            <label htmlFor="shiny-checkbox">shiny</label>
            <input id="shiny-checkbox" type="checkbox" />
          </div>
        </div>
        <div className="list" ref={listRef}>
          {pokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.name}
              id={0}
              name={pokemon.name}
              url={pokemon.name}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

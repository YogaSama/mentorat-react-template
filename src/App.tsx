import { Suspense, useEffect, useRef, useState } from 'react';
import PokemonItem from './PokemonItem';
import usePokemons from './usePokemons';
import { useShiny } from './ShinyProvider';
import ErrorBoundary from './ErrorBoundary';

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
          <button
            disabled={pokemonQuery.loading}
            className="show"
            onClick={() => {
              setLimit((previous) => Math.max(3, previous - 3));
            }}
          >
            {pokemonQuery.loading ? 'Loading...' : 'Voir moins'}
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
          {pokemonQuery.error != null && (
            <div className="error">Chargement impossible du pokedex</div>
          )}
          {pokemonQuery.data?.map((pokemon) => (
            <ErrorBoundary
              key={pokemon.name}
              fallback={<div className="item error">{pokemon.name}</div>}
            >
              <Suspense fallback={<div className="item">Loading ...</div>}>
                <PokemonItem name={pokemon.name} />
              </Suspense>
            </ErrorBoundary>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

import './App.css';
import { useEffect, useRef, useState } from 'react';
import PokemonCard from './PokemonCard';
import usePokemons from './usePokemons';
import { useShiny } from './ShinyContext';

const DEFAULT_LIMIT = 9;

function App() {
  const { shiny, setShiny } = useShiny();

  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [pokemons, error, loading] = usePokemons(limit, 0);
  const showMoreRef = useRef<HTMLButtonElement | null>(null);

  const handleShowMoreClick = () => {
    setLimit((limit) => limit + DEFAULT_LIMIT);
  };

  const handleShinyChange = () => {
    setShiny(!shiny);
  };

  useEffect(() => {
    showMoreRef.current?.focus();
  }, []);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        {error != null && 'Une erreur est survenue !'}
        <div>
          <label htmlFor="shiny-checkbox">Shiny</label>
          <input
            id="shiny-checkbox"
            type="checkbox"
            checked={shiny}
            onChange={handleShinyChange}
          />
        </div>
        <ul className="grid">
          {pokemons?.map((pokemon) => (
            <li key={pokemon.name}>
              <PokemonCard name={pokemon.name} />
            </li>
          ))}
        </ul>
        <button
          className="show-more"
          onClick={handleShowMoreClick}
          disabled={loading}
          ref={showMoreRef}
        >
          {loading ? 'Loading ...' : 'Afficher plus'}
        </button>
      </main>
    </>
  );
}

export default App;

import './App.css';
import { useState } from 'react';
import PokemonCard from './PokemonCard';
import usePokemons from './usePokemons';

const DEFAULT_LIMIT = 9;

function App() {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [pokemons, error, loading] = usePokemons(limit, 0);

  const handleShowMoreClick = () => {
    setLimit((limit) => limit + DEFAULT_LIMIT);
  };

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        {error != null && 'Une erreur est survenue !'}
        {pokemons != null && (
          <ul className="grid">
            {pokemons.map((pokemon) => (
              <li key={pokemon.name}>
                <PokemonCard name={pokemon.name} />
              </li>
            ))}
          </ul>
        )}
        <button
          className="show-more"
          onClick={handleShowMoreClick}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Afficher plus'}
        </button>
      </main>
    </>
  );
}

export default App;

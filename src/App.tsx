import './App.css';
import { useEffect, useRef, useState } from 'react';
import PokemonCard from './PokemonCard';
import usePokemons from './usePokemons';

const DEFAULT_LIMIT = 9;

function App() {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [pokemons, error, loading] = usePokemons(limit, 0);
  const [filter, setFilter] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleShowMoreClick = () => {
    setLimit((limit) => limit + DEFAULT_LIMIT);
  };

  const handleFilterInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFilter(event.target.value.toLowerCase());
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        {error != null && 'Une erreur est survenue !'}
        <div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher un pokemon ..."
            value={filter}
            onChange={handleFilterInputChange}
          />
        </div>
        <ul className="grid">
          {pokemons?.map((pokemon) => (
            <li
              key={pokemon.name}
              style={{
                display:
                  filter === '' || pokemon.name.includes(filter)
                    ? 'block'
                    : 'none',
              }}
            >
              <PokemonCard name={pokemon.name} />
            </li>
          ))}
        </ul>
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

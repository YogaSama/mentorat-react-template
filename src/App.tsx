import './App.css';
import { useState } from 'react';
import PokemonCard from './PokemonCard';
import usePokemons from './usePokemons';

const DEFAULT_LIMIT = 9;

function App() {
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);
  const [pokemons, error, loading] = usePokemons(limit, 0);
  const [filter, setFilter] = useState<string>('');

  const handleShowMoreClick = () => {
    setLimit((limit) => limit + DEFAULT_LIMIT);
  };

  const handleFilterInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        {error != null && 'Une erreur est survenue !'}
        <form className="filters">
          <label htmlFor="filter-input">Filter</label>
          <input
            id="filter-input"
            type="text"
            placeholder="pikachu"
            value={filter}
            onChange={handleFilterInputChange}
          />
        </form>
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

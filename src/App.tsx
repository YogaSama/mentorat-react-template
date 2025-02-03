import { useEffect, useState } from 'react';
import './App.css';
import { NamedAPIResource, NamedAPIResourceList } from 'pokemon';

const DEFAULT_LIMIT = 9;

function App() {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
  const [limit, setLimit] = useState<number>(DEFAULT_LIMIT);

  const handleShowMoreClick = () => {
    setLimit((limit) => limit + DEFAULT_LIMIT);
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`)
      .then((response) => response.json())
      .then((response: NamedAPIResourceList) => {
        setPokemons(response.results);
      });
  }, [limit]);

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <ul className="grid">
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
        <button className="show-more" onClick={handleShowMoreClick}>
          Afficher plus
        </button>
      </main>
    </>
  );
}

export default App;

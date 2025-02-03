import { useEffect, useState } from 'react';
import './App.css';
import { NamedAPIResource, NamedAPIResourceList } from 'pokemon';

function App() {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);

  const handleShowMoreClick = () => {
    // setPokemons((prev) => [
    //   ...prev,
    //   prev.length + 1,
    //   prev.length + 2,
    //   prev.length + 3,
    // ]);
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0')
      .then((response) => response.json())
      .then((response: NamedAPIResourceList) => {
        setPokemons(response.results);
      });
  }, []);

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

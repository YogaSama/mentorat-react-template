import { useState } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const handleShowMoreClick = () => {
    setPokemons((prev) => [
      ...prev,
      prev.length + 1,
      prev.length + 2,
      prev.length + 3,
    ]);
  };

  fetch('https://pokeapi.co/api/v2/pokemon/?limit=9&offset=0')
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });

  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <ul className="grid">
          {pokemons.map((pokemon) => (
            <li key={pokemon}>Pokemon {pokemon}</li>
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

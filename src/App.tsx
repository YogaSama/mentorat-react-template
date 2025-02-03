import './App.css';

function App() {
  const pokemons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <ul className="grid">
          {pokemons.map((pokemon) => (
            <li key={pokemon}>Pokemon {pokemon}</li>
          ))}
        </ul>
        <button className="show-more">Afficher plus</button>
      </main>
    </>
  );
}

export default App;

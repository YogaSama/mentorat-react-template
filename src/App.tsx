import PokemonItem from './PokemonItem';

function App() {
  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button className="show-more">Voir plus</button>
          <div className="shiny">
            <label htmlFor="shiny-checkbox">shiny</label>
            <input id="shiny-checkbox" type="checkbox" />
          </div>
        </div>
        <div className="list">
          <PokemonItem
            id={1}
            name="pokemon"
            url="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          />
          <PokemonItem
            id={2}
            name="pokemon"
            url="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          />
          <PokemonItem
            id={3}
            name="pokemon"
            url="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          />
        </div>
      </main>
    </>
  );
}

export default App;

import PokemonItem from './PokemonItem';

function createPokemon(id: number) {
  return {
    id: id,
    name: 'pokemon',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  };
}

function createPokemons(count: number) {
  return [...new Array(count)].map((v, i) => createPokemon(i + 1));
}

function App() {
  const pokemons = createPokemons(3);
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
          {pokemons.map((pokemon) => (
            <PokemonItem
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

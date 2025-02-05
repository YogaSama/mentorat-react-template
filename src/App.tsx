import { useState } from 'react';
import PokemonItem from './PokemonItem';

function createPokemon(id: number) {
  return {
    id: id,
    name: 'pokemon',
    url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  };
}

function createPokemons(offset: number, count: number) {
  return [...new Array(count)].map((v, i) => createPokemon(offset + i));
}

function App() {
  const [pokemons, setPokemons] = useState(createPokemons(1, 3));
  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button
            className="show"
            onClick={() => {
              setPokemons((previous) => [
                ...previous,
                ...createPokemons(previous.length + 1, 3),
              ]);
            }}
          >
            Voir plus
          </button>
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

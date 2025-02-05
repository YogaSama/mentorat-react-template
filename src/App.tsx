function App() {
  return (
    <>
      <header className="header">Pokedex</header>
      <main className="main">
        <div className="tools">
          <button className="show">Voir plus</button>
          <div className="shiny">
            <label htmlFor="shiny-checkbox">shiny</label>
            <input id="shiny-checkbox" type="checkbox" />
          </div>
        </div>
        <div className="list">
          <div className="item">
            #1 pokemon
            <img
              className="icon"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            />
          </div>
          <div className="item">
            #2 pokemon
            <img
              className="icon"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            />
          </div>
          <div className="item">
            #3 pokemon
            <img
              className="icon"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

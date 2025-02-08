import { Pokemon } from 'pokenode-ts';
import { useEffect, useRef, useState } from 'react';
import { getPokemonById } from './pokemonApi';
import { randomPokemonId } from './utils';

function App() {
  const [id, setId] = useState<number>(() => randomPokemonId());
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [state, setState] = useState<'run' | 'loose' | 'win'>('run');
  const [score, setScore] = useState<number>(0);
  const [input, setInput] = useState<string>('');

  const nextRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Met la partie en état "run" quand l'ID du pokemon change.
  useEffect(() => {
    if (state === 'run') {
      setInput('');
      setId(randomPokemonId());
    }
  }, [state]);

  //
  useEffect(() => {
    setPokemon(null);
    getPokemonById(id).then((data) => {
      console.log(id, data.name); // <-- pour tricher.
      setPokemon(data);
    });
  }, [id]);

  useEffect(() => {
    if (state !== 'run') {
      nextRef.current?.focus();
    }
  }, [state]);

  useEffect(() => {
    if (state === 'run' && pokemon !== null) {
      inputRef.current?.focus();
    }
  }, [pokemon, state]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const answer = input.toString().toLowerCase();
    const name = pokemon?.name.toLowerCase();

    if (answer === name) {
      setState('win');
      setScore((previous) => previous + 1);
    } else {
      setState('loose');
    }
  };

  const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setState('run');
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInput(event.target.value);
  };

  const icon = state === 'win' ? '✅' : '❌';

  return (
    <>
      <header>Pokeguess</header>
      <main>
        <div className="score">Score: {score}</div>
        <div className="icon">
          <img
            hidden={!pokemon}
            src={
              pokemon?.sprites.versions['generation-iv'].platinum
                .front_default ?? undefined
            }
            style={{ filter: `brightness(${state === 'run' ? 0 : 1})` }}
          />
        </div>
        {state === 'run' && (
          <form onSubmit={handleSubmit}>
            <input
              disabled={pokemon === null}
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
            />
          </form>
        )}
        {state !== 'run' && (
          <div className="button-group">
            <div className="bold">
              {icon} {pokemon?.name}
            </div>
            <button className="bold" ref={nextRef} onClick={handleNextClick}>
              Rejouer
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

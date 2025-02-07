import { Pokemon } from 'pokenode-ts';
import { useEffect, useRef, useState } from 'react';
import { getPokemonById } from './pokemonApi';
import { randomPokemonId } from './utils';

function App() {
  const [id, setId] = useState<number>(() => randomPokemonId());
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [state, setState] = useState<'run' | 'loose' | 'win'>('run');
  const [score, setScore] = useState<number>(0);

  const nextRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPokemon(null);
    setLoading(true);
    getPokemonById(id).then((data) => {
      console.log(data.name); // <-- pour tricher.
      setPokemon(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (state !== 'run') {
      nextRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [state]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData(event.target as HTMLFormElement);
    const input = formData.get('input')!.toString().toLowerCase();
    const name = pokemon!.name.toLowerCase();
    setState(input === name ? 'win' : 'loose');
  };

  const handleNextClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (state === 'loose') {
      setScore(0);
    } else if (state === 'win') {
      setScore((previous) => previous + 1);
    }
    setState('run');
    setId(randomPokemonId());
  };

  return (
    <main className="main">
      <div className="score">Score: {score}</div>
      <div className="icon">
        <img
          hidden={!pokemon}
          src={pokemon?.sprites.front_default ?? undefined}
          style={{ filter: `brightness(${state === 'run' ? 0 : 1})` }}
        />
      </div>
      {state === 'run' && (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="input"
            placeholder={loading ? 'Loading...' : 'Pikachu'}
          />
        </form>
      )}
      {state === 'win' && <div>✅ {pokemon?.name}</div>}
      {state === 'loose' && <div>❌ {pokemon?.name}</div>}
      {state !== 'run' && (
        <button ref={nextRef} disabled={loading} onClick={handleNextClick}>
          Next
        </button>
      )}
    </main>
  );
}

export default App;

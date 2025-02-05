import { useEffect, useState } from 'react';
import { getPokemon } from './pokemonApi';
import { Pokemon } from 'pokenode-ts';

function usePokemon(name: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Pokemon | null>(null);

  useEffect(() => {
    setLoading(true);
    getPokemon(name).then((v) => {
      setData(v);
      setLoading(false);
    });
  }, [name]);

  return { data, loading };
}

export default usePokemon;

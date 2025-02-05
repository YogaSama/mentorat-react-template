import { NamedAPIResource } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import { getPokemons } from './pokemonApi';

function usePokemons(limit: number) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    setLoading(true);
    getPokemons(limit, 0).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [limit]);

  return { loading, data };
}

export default usePokemons;

import type { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';

export async function getPokemons(
  limit: number,
  offset: number
): Promise<NamedAPIResource[]> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  const json: NamedAPIResourceList = await response.json();
  return json.results;
}

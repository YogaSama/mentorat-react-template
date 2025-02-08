export function randomPokemonId() {
  return Math.floor(random(1, 494));
}

export function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

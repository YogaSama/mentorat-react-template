export function randomPokemonId() {
  return Math.round(random(0, 150));
}

export function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

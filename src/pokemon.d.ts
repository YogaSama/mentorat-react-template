declare module 'pokemon' {
  interface NamedAPIResourceList {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResource[];
  }
  interface NamedAPIResource {
    name: string;
    url: string;
  }
}

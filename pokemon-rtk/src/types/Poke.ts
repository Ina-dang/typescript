export interface Poke {
  id: number;
  name: string;
  species: {
    name: string;
  };
  sprites: {
    front_shiny: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

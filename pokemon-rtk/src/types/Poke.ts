type Poke = {
  id: number;
  name: string;
  types: { type: { name: string } }[]; // types 속성을 객체 배열로 정의
  species: {
    name: string;
    // species와 관련된 다른 속성들을 여기에 추가할 수 있습니다.
  };
  sprites: {
    front_shiny: string;
    // 다른 스프라이트 이미지와 관련된 속성들을 여기에 추가할 수 있습니다.
  };
  results: PokemonListResponse;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

type PokemonListItem = {
  name: string;
  url: string;
};

export type { Poke, PokemonListResponse, PokemonListItem };

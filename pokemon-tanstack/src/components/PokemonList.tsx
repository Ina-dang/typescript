import { useQuery } from "@tanstack/react-query";
import { Poke } from "../types/Poke";
import { Pokemon } from "./Pokemon";
import { getPokemonList } from "../store/query";

export const PokemonList = () => {
  const { data: pokemonList, isLoading } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemonList,
  });

  if (isLoading) {
    return <div>로딩중입니다..</div>;
  }

  return (
    <div className="PokemonList">
      {pokemonList ? (
        pokemonList.results.map((pokemon: Poke) => (
          <Pokemon key={pokemon.name} name={pokemon.name} />
        ))
      ) : (
        <div>포켓몬 목록이 없습니다.</div>
      )}
    </div>
  );
};

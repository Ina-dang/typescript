import { useGetPokemonListQuery } from "../store/pokemonApi";
import { PokemonListItem } from "../types/Poke";
import { Pokemon } from "./Pokemon";

export const PokemonList = () => {
  const { data: pokemonList, isLoading } = useGetPokemonListQuery();

  if (isLoading) {
    return <div>..</div>;
  }

  return (
    <div className="PokemonList">
      {pokemonList ? (
        pokemonList.results.map((pokemon: PokemonListItem) => (
          <Pokemon key={pokemon.name} name={pokemon.name} />
        ))
      ) : (
        <div>포켓몬 목록이 없습니다.</div>
      )}
    </div>
  );
};

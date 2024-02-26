import { useSelector } from "react-redux";
import { useGetPokemonByNameQuery } from "../store/pokemonApi";
import { RootState } from "../store/store";

type Props = {
  name: string;
};

export const Pokemon = ({ name }: Props) => {
  const pollingInterval = useSelector(
    (state: RootState) => state.pokemon.value
  );
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    { pollingInterval }
  );

  return (
    <div className="Pokemon">
      {error ? (
        <>에러가 발생했습니다</>
      ) : isLoading ? (
        <>로딩중...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isFetching ? "..." : ""}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};

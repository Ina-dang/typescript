import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../store/query";
import { usePokemonStore } from "../store/store";

type Props = {
  name: string;
};

export const Pokemon = ({ name }: Props) => {
  const pollingIntervalValue = usePokemonStore((state) => state.value);
  const {
    data: pokeByName,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["pokemonByName", name],
    queryFn: () => getPokemonByName(name),
    refetchInterval: pollingIntervalValue,
    staleTime: 5000, //devTools에서 확인
  });

  return (
    <div className="Pokemon">
      {isError ? (
        <>에러가 발생했습니다</>
      ) : isLoading ? (
        <>로딩중...</>
      ) : pokeByName ? (
        <>
          <h3>
            {pokeByName.species.name} {isSuccess ? "..." : ""}
          </h3>
          <img
            src={pokeByName.sprites.front_shiny}
            alt={pokeByName.species.name}
          />
        </>
      ) : null}
    </div>
  );
};

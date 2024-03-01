import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../store/query";
import { usePokemonStore } from "../store/store";

type Props = {
  name: string;
};

export const Pokemon = ({ name }: Props) => {
  const pollingIntervalValue = usePokemonStore((state) => state.value);
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["pokemonByName", name],
    queryFn: () => getPokemonByName(name),
    refetchInterval: pollingIntervalValue,
  });

  return (
    <div className="Pokemon">
      {isError ? (
        <>에러가 발생했습니다</>
      ) : isLoading ? (
        <>로딩중...</>
      ) : data ? (
        <>
          <h3>
            {data.species.name} {isSuccess ? "..." : ""}
          </h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};

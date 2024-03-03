import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../store/query";
import { usePokemonStore } from "../store/store";
import { useState } from "react";

type Props = {
  name: string;
};

export const Pokemon = ({ name }: Props) => {
  const pollingIntervalValue = usePokemonStore((state) => state.value);
  const {
    data: pokeByName,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["pokemonByName", name],
    queryFn: () => getPokemonByName(name),
    refetchInterval: pollingIntervalValue,
    staleTime: 5000, //devTools에서 확인
  });
  const [isImageClicked, setIsImageClicked] = useState(false);
  console.log();
  const handleImageClick = () => {
    setIsImageClicked((prev) => !prev);
  };
  return (
    <div className="Pokemon">
      {isError ? (
        <>에러가 발생했습니다</>
      ) : isLoading ? (
        <>로딩중...</>
      ) : pokeByName ? (
        <div className="clicked-box" onClick={handleImageClick}>
          {isImageClicked ? (
            <>
              <h3>
                {pokeByName.species.name} {isFetching ? "..." : ""}
              </h3>
              <img
                src={pokeByName.sprites.front_shiny}
                alt={pokeByName.species.name}
              />
              <h4>type: {pokeByName.types && pokeByName.types[0].type.name}</h4>
            </>
          ) : (
            <h3>
              {pokeByName.species.name} {isFetching ? "..." : ""}
            </h3>
          )}
        </div>
      ) : null}
    </div>
  );
};

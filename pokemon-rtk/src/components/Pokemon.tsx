import { useState } from "react";
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
  console.log(data);
  // 이미지가 클릭되었는지 여부를 추적하는 상태
  const [isImageClicked, setIsImageClicked] = useState(false);

  // 이미지 클릭 이벤트 핸들러
  const handleImageClick = () => {
    setIsImageClicked((prev) => !prev);
  };

  return (
    <div className="Pokemon">
      {error ? (
        <>에러가 발생했습니다</>
      ) : isLoading ? (
        <div className="clicked-box">로딩중...</div>
      ) : data ? (
        <div className="clicked-box" onClick={handleImageClick}>
          {isImageClicked && (
            <>
              <h3>
                {data.species.name} {isFetching ? "..." : ""}
              </h3>
              <img src={data.sprites.front_shiny} alt={data.species.name} />
              <h4>type: {data.types && data.types[0].type.name}</h4>
            </>
          )}
          {!isImageClicked && (
            <h3>
              {data.species.name} {isFetching ? "..." : ""}
            </h3>
          )}
        </div>
      ) : null}
    </div>
  );
};

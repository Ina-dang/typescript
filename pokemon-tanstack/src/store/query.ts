import axios from "axios";

const getPokemonList = async () => {
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=10"
  );
  return data;
};

const getPokemonByName = async (name: string) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

export { getPokemonList, getPokemonByName };

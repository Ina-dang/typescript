import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Poke, PokemonListResponse } from "../types/Poke";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Poke, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => `pokemon?limit=10`,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;

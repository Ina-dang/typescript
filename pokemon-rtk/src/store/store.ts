import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemonApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonSlice } from "./pokemonSlice";

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon: pokemonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

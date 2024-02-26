import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PollingIntervalState {
  value: number;
}

const initialState: PollingIntervalState = {
  value: 0,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPollingInterval: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setPollingInterval } = pokemonSlice.actions;

export { pokemonSlice };

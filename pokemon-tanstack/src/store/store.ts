import { create } from "zustand";

type State = {
  value: number;
  updateValue: (newValue: number) => void;
};

const usePokemonStore = create<State>((set) => ({
  value: 0,
  updateValue: (newValue) => set(() => ({ value: newValue })),
}));

export { usePokemonStore };

import "./App.css";
import { PokemonList } from "./components/PokemonList";
import { usePokemonStore } from "./store/store";

/**
 * isLoading
 * isFetching
 * isSuccess
 * isError
 * @returns
 */

function App() {
  const updateValue = usePokemonStore((state) => state.updateValue);

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const interval = Number(e.target.value);
    updateValue(interval);
  };

  return (
    <div className="App">
      <select onChange={handleIntervalChange}>
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>
      <div>
        <PokemonList />
      </div>
    </div>
  );
}

export default App;

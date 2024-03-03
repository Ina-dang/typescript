import { useDispatch } from "react-redux";
import "./App.css";
import { PokemonList } from "./components/PokemonList";
import { setPollingInterval } from "./store/pokemonSlice";

/**
 * isLoading
 * isFetching
 * isSuccess
 * isError
 * @returns
 */

function App() {
  const dispatch = useDispatch();

  const handleInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const interval = Number(e.target.value);
    dispatch(setPollingInterval(interval));
  };

  return (
    <div className="App">
      <select onChange={handleInterval}>
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

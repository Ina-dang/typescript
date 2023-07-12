import './App.css';
import Todos from './components/Todos';
import { Todo } from './models/todo';

// const items = ['learn React', 'learn TypeScript'];

function App() {
  const todos = [new Todo('Lear React'), new Todo('Lear Typescript')];
  return (
    <div>
      <Todos items={todos} />
    </div>
  );
}

export default App;

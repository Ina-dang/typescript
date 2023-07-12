import './App.css';
import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import { Todo } from './models/todo';

// const items = ['learn React', 'learn TypeScript'];

function App() {
  const todos = [new Todo('Lear React'), new Todo('Lear Typescript')];

  return (
    <div>
      <NewTodo />
      <Todos items={todos} />
    </div>
  );
}

export default App;

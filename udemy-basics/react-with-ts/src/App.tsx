import React, { useState } from 'react';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import Todo from './todo.model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddhandler = (text: string) => {
    setTodos([{ id: Math.random().toString(), text }]);
  };
  return (
    <div className='App'>
      <NewTodo onAddTodo={todoAddhandler} />
      <TodoList items={todos} />
    </div>
  );
};

export default App;

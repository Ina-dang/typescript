import React, { useState } from 'react';

import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import Todo from './todo.model';

/**
 * 투두리스트 페이지
 * @returns React.component
 */
const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const todoAddhandler = (text: string) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text },
    ]);
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };
  return (
    <div className='App'>
      <NewTodo onAddTodo={todoAddhandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;

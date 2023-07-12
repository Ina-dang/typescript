import React, { useContext } from 'react';
import { FC } from 'react';

import TodoItem from './TodoItem';
import classes from './Todos.module.css';
import { TodosContext } from '../store/todos-context';

// react에서 프롭스는 언제나 객체형태
// const Todos = (props: { items: string[], children }) => {
// FunctionComponent 타입을 정의함으로써 이 함수가 함수형 컴포넌트로 동작한다는걸 명확히 함
const Todos: FC = (props) => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;

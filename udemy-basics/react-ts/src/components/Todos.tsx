import React from 'react';
import { FC } from 'react';
import { Todo } from '../models/todo';
import TodoItem from './TodoItem';

// react에서 프롭스는 언제나 객체형태
// const Todos = (props: { items: string[], children }) => {
// FunctionComponent 타입을 정의함으로써 이 함수가 함수형 컴포넌트로 동작한다는걸 명확히 함
const Todos: FC<{ items: Todo[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TodoItem key={item.id} text={item.text} />
      ))}
    </ul>
  );
};

export default Todos;
